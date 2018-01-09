module.exports = (webpackConfig, config, compiler, devMiddleware, hotMiddleware) => {
  require('./check-versions')();

  const localConfig = require('../localconfig')

  const _ = require('lodash')
  const opn = require('opn')
  const path = require('path');
  const joinPath = require('path.join');
  const express = require('express');
  const webpack = require('webpack');
  const fs = require('fs');
  const proxyMiddleware = require('http-proxy-middleware');
  const bodyParser = require('body-parser');
  const schema = require('./schema.js');
  const session = require('express-session');
  const Client = require('./sparcsssov2');
  const registerNuguApi = require('./nugu-api');
  const sparcsRequired = require('./sparcsrequired')

  let mongoose = require('mongoose');  
  mongoose.Promise = global.Promise;

// default port where dev server listens for incoming traffic
  const port = process.env.PORT || config.port;
// automatically open browser, if not set will be false
  const autoOpenBrowser = !!config.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
  const proxyTable = config.proxyTable;

  const app = express();

// force page reload when html-webpack-plugin template changes
  if (process.env.NODE_ENV == 'development') {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({action: 'reload'});
        cb();
      });
    });
  }

  // app.use('*', (req, res, next) => {
  //   console.log('Got req!, ', req)
  //   next()
  // })

  app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send(
      "User-agent: *\n" +
      "Disallow: /album/\n" +
      "Disallow: /static/images/"
    )
  })

  const sessionArgs = {
    key: 'destroyKey',
    proxy: true,
    resave: false,
    saveUninitialized: true,
    secret: localConfig.expressSessionSecret,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hour
    },
  }

// Database
  const { dbUser, dbPassword, serverDomain, serverPort } = localConfig
  const dbAuth = dbUser ? `${dbUser}:${dbPassword}@` : ''
  const mongoUrl = `mongodb://${dbAuth}${localConfig.dbHost}/${localConfig.dbName}`

  new Promise(res => {
    mongoose.connect(mongoUrl, {
      useMongoClient: true,
    })
      .then(() => {
        console.log('Successed in connecting to mongod server')
        const mongoStore = require('connect-mongo')(session)
        sessionArgs.store = new mongoStore({ mongooseConnection: mongoose.connection })
        res()
      })
      .catch(err => {
        if (process.env.NODE_ENV == 'production') {
          console.error('Memory session is not allow in production because it causes memory leak!')
        }
        console.error(err)
        res()
      })
  })
    .then(() => {
      // Use express-session for save session
      app.set('trust proxy', 'loopback')

      app.use(session(sessionArgs))

      // set for SSO connecting
      const client = new Client(localConfig.ssoClientId, localConfig.ssoSecretKey, false);

      // Javascript have no function for set default value.
      function getKey(dict, key, replacement) {
        if (Object.prototype.hasOwnProperty.call(dict, key)) {
          return dict[key];
        }
        return replacement;
      }

      //  Redirect legacy static seminar urls to new ones
      //  ex) /seminar/attachment/x to /static/seminars/x
      app.get('/seminar/attachment/:file_name', (req, res) => {
        res.redirect(`/static/seminars/${req.params.file_name}`)
      })


      // serve pure static assets
      const staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory);
      const imgPath = `${staticPath}/images/`;
      const seminarPath = `${staticPath}/seminars/`;

      app.use(imgPath, sparcsRequired)
      app.use(staticPath, express.static('./static'));
      app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
      app.use(bodyParser.json({limit: '50mb'}));

      app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

      const uri = `${serverDomain}:${serverPort}`;
      if (process.env.NODE_ENV == 'development') {
        devMiddleware.waitUntilValid(() => {
          console.log(`> Listening at ${uri}\n`);
        });
      }

      app.post('/album/newYear', (req, res) => {
        const json = req.body;
        const year = new schema.Years({
          year: json.year,
          eventNumber: 1,
          photoNumber: 1,
          albums: [],
        });
        year.save((err) => {
          if (err) console.log(`some error occured.. ${err}`);
          else {
            console.log('successfully saved screenshot!');
            res.send({success: true});
          }
        });
      });

      function saveImageSync(base64Data, year, album) {
        const strImage = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
        const imageBuffer = new Buffer(strImage, 'base64');
        const semicolon = base64Data.indexOf(';');
        const extension = base64Data.substring(11, semicolon);
        const fileName = `img_${Date.now()}.${extension}`;
        const filePathDirYear = joinPath(__dirname, '/..', imgPath, year);
        console.log(filePathDirYear);
        if (!fs.existsSync(filePathDirYear)){
          fs.mkdirSync(filePathDirYear);
        }
        const filePathDirAlbum = joinPath(filePathDirYear, album);
        if (!fs.existsSync(filePathDirAlbum)){
          fs.mkdirSync(filePathDirAlbum);
        }
        const filePath = joinPath(filePathDirAlbum, fileName);
        const filePathDir = `${year}/${album}/`;
        fs.writeFileSync(filePath, imageBuffer);
        const url = localConfig.staticHost + imgPath + filePathDir + fileName;
        return url;
      }

      app.post('/album/upload', (req, res) => {
        const {year, album, albumDate, albumName, photoList} = req.body;
        const photoNumber = photoList.length;
        for (let i = 0; i < photoNumber; i += 1) {
          photoList[i] = saveImageSync(photoList[i], year, albumName);
        }
        schema.Years.findOneAndUpdate(
          {year},
          {
            $inc: {photoNumber},
            $setOnInsert: {year},
          },
          {
            new: true,
            upsert: true,
            returnOriginal: false,
            returnNewDocument: true,
          },
          (err1, res1) => {
            if (err1) {
              res.send({success: false});
              console.log(err1);
            } else {
              console.log(res1);
              schema.Albums.findOneAndUpdate(
                {
                  year: year,
                  title: album
                },
                {
                  $inc: {photoNumber},
                  $pushAll: {photos: photoList},
                  $setOnInsert: {year, title: album, date: albumDate},
                },
                {
                  new: true,
                  upsert: true,
                  returnOriginal: false,
                  returnNewDocument: true,
                },
                (err2, res2) => {
                  if (err2) {
                    res.send({success: false});
                    console.log(err2);
                  } else {
                    console.log('succeed in uploading photo');
                    console.log(res2);
                    res.send({success: true, result1: res1, result2: res2});
                  }
                });
            }
          });
      });

      app.get('/album/getAlbum', (req, res) => {
        schema.Years.find({}, (err1, years) => {
          if (err1) res.send({years: []});
          else {
            schema.Albums.find({}, (err2, albums) => {
              if (err2) res.send({years});
              res.send({years, albums});
            });
          }
        });
      });
      app.post('/album/newAlbum', (req, res) => {
        const {year, albumTitle, albumDate, albumDateRaw} = req.body;
        const album = new schema.Albums({
          year,
          title: albumTitle,
          date: albumDate,
          folderName: `${albumDateRaw} ${albumTitle}`,
          photoNumber: 0,
          photos: [],
        });
        console.log(album);
        album.save((err1, res1) => {
          if (err1) {
            res.send({success: false, err: err1});
            console.log(err1);
          } else {
            schema.Years.findOneAndUpdate(
              {year},
              {
                $inc: {eventNumber: 1},
                $setOnInsert: {year, photoNumber: 0},
              },
              {
                new: true,
                upsert: true,
                returnOriginal: false,
                returnNewDocument: true,
              },
              (err2, res2) => {
                if (err2) {
                  res.send({success: false, err: err2});
                  console.log(err2);
                } else {
                  res.send({success: true, resultAlbum: res1, resultYear: res2});
                }
              });
          }
        });
      });

      app.post('/album/removeAlbum', (req, res) => {
        const {year, albumTitle} = req.body;
        schema.Albums.find(
          {year: year, title: albumTitle},
          (err0, res0) => {
            if (err0) {
              res.send({success: false, err: err0});
              console.log(err0);
            } else {
              console.log(res0);
              const photoNumber = res0[0].photos.length;
              schema.Years.findOneAndUpdate(
                {year: year},
                {
                  $inc: {eventNumber: -1, photoNumber: -photoNumber},
                },
                {
                  new: true,
                  upsert: true,
                  returnNewDocument: true,
                },
                (err1, res1) => {
                  if (err1) {
                    res.send({success: false, err: err1});
                    console.log(err1);
                  } else {
                    schema.Albums.remove(
                      {year: year, title: albumTitle},
                      (err2, res2) => {
                        if (err2) {
                          res.send({success: false, err: err2});
                          console.log(err2);
                        } else {
                          if (res1.eventNumber == 0) {
                            schema.Years.remove(
                              {year},
                              (err3, res3) => {
                                if (err3) {
                                  res.send({success: false, err: err3});
                                  console.log(err3);
                                } else {
                                  res.send({success: true, result1: res1, result2: res2, result3: res3});
                                }
                              }
                            )
                          }
                        }
                      }
                    )
                  }
                }
              );
            }
          }
        )
      });
      app.post('/album/removePhoto', (req, res) => {
        const {year, albumTitle, photoURL} = req.body;
        schema.Years.findOneAndUpdate(
          {year: year},
          {
            $inc: {photoNumber: -1},
          },
          {
            new: true,
            upsert: true,
            returnNewDocument: true,
          },
          (err0, res0) => {
            if (err0) {
              res.send({success: false, err: err0});
              console.log(err0);
            } else {
              schema.Albums.findOneAndUpdate(
                {year: year, title: albumTitle},
                {
                  $pull: {photos: photoURL}
                },
                {
                  new: true,
                  upsert: true,
                  returnNewDocument: true,
                },
                (err1, res1) => {
                  if (err1) {
                    res.send({success: false, err: err1});
                    console.log(err1);
                  } else {
                    res.send({success: true, result0: res0, result1: res1});
                  }
                }
              )
            }
          }
        );
      });

      app.post('/db/seminars', (req, res) => {
        const {title, speaker, date, content} = req.body;

        const strContent = content.replace(/^data:application\/pdf;base64,/, '');
        const buffer = new Buffer(strContent, 'base64');
        const titleWithUnderscores = title.replace(' ', '_');
        // const fileName = `${speaker}_${titleWithUnderscores}.pdf`;
        const fileName = `${speaker}_${Date.now()}.pdf`;
        const filePath = joinPath(__dirname, '/..', seminarPath, fileName);
        const url = localConfig.staticHost + seminarPath + fileName;
        fs.writeFileSync(filePath, buffer);

        const sources = [url];
        const tuple = new schema.Seminars({ title, speaker, date, sources });
        tuple.save((err) => {
          if (err) {
            console.log(err);
            res.send({ success: false });
          } else res.send({ success: true });
        });
      });

      app.get('/db/seminars', (req, res) => {
        schema.Seminars.find({}, (err, seminars) => {
          if (err) res.send({ seminars: [] });
          else res.send({ seminars });
        });
      });

      // app.post('/db/seminars/delete', (req, res) => {
      //   const {title, speaker} = req.body;
      //   schema.Seminars.remove({title, speaker}, (err) => {
      //     if (err) {
      //       console.log(err);
      //       res.send({ success: false });
      //     } else res.send({ success: true })
      //   })
      // });

      registerNuguApi(app);

      app.get('/login', (req, res) => {
        const sess = req.session;
        if (Object.prototype.hasOwnProperty.call(sess, 'authenticated') && sess.authenticated === true) {
          return res.redirect(getKey(sess, 'next', '/aboutus'));
        }
        const [loginUrl, state] = client.getLoginParams();
        sess.ssoState = state;
        return res.redirect(loginUrl);
      });

      app.get('/login/callback', (req, res) => {
        const sess = req.session;
        const stateBefore = getKey(sess, 'ssoState', 'default');

        const state = getKey(req.query, 'state', 'queryState');

        if (stateBefore !== state) {
          throw new Error('TOKEN MISMATCH: session might be hijacked!');
        }

        const code = getKey(req.query, 'code', '');

        client.getUserInfo(code)
          .then((resp) => {
            sess.authenticated = true;
            sess.sid = resp.sid;
            if (resp.sparcs_id) {
              sess.sparcsId = resp.sparcs_id;
              sess.isSPARCS = true;
              schema.Admins.find({}, (err, admins) => {
                if (err) console.error(err);
                console.log(admins);
                // adminList == List of admin users
                if (!admins) {
                  if (admins[0].adminList.includes(resp.sparcs_id)) {
                    sess.isAdmin = true;
                  }
                } else {
                  console.log('adminList is empty.')
                }
              });
            } else {
              sess.isSPARCS = false;
            }

            let next;
            if (Object.prototype.hasOwnProperty.call(sess, 'next')) {
              next = sess.next;
              delete sess.next;
            } else {
              next = '/aboutus';
            }
            const sess2 = _.cloneDeep(sess)
            delete sess2.cookie
            res.cookie('session', JSON.stringify(sess2))
            console.log(sess)
            return res.redirect(next)
          });
      });

      app.get('/logout', (req, res) => {
        const sess = req.session;
        res.clearCookie('session');
        if (!sess.authenticated) {
          return res.redirect('/aboutus');
        }
        const sid = getKey(sess, 'sid', '');
        client.getLogoutUrl(sid, '/aboutus');
        req.session.destroy();
        res.clearCookie('destroyKey');
        console.log('You logged out from SPARCS')
        return res.redirect('/aboutus');
      });

      console.log(process.env.NODE_ENV)

      // handle fallback for HTML5 history API
      app.use(require('connect-history-api-fallback')());


      if (process.env.NODE_ENV == 'development') {
        // serve webpack bundle output
        app.use(devMiddleware);

        // enable hot-reload and state-preserving
        // compilation error display
        app.use(hotMiddleware);
      } else {
        app.use('/', express.static(path.join(__dirname, '../dist')))
        app.get('*', (req, res) => {
          res.redirect('/')
        })
      }

      // proxy api requests
      if (proxyTable) {
        Object.keys(proxyTable).forEach((context) => {
          let options = proxyTable[context];
          if (typeof options === 'string') {
            options = {target: options};
          }
          app.use(proxyMiddleware(options.filter || context, options));
        });
      }

      app.listen(port, (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(`Express server is ready on port ${port}!`)

        // when env is testing, don't need open it
        if (autoOpenBrowser && process.env.NODE_ENV === 'development') {
          opn(uri);
        }
      });
    })
}
