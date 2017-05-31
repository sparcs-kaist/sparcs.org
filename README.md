# sparcs_home

## DB Setup

``` bash
# install mongodb (macOS)
brew install mongodb
mkdir -p /data/db
chown [username] /data/db

# execute mongodb
mongod

# execute mongodb CLI
mongo
```


## Build Setup

``` bash
# install dependencies
npm install

# set up semantic-ui
npm install -g gulp
cd semantic
gulp build

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
