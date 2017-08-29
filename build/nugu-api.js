const baseAxios = require('axios')
const localConfig = require('../localconfig')
const sparcsMiddleware = require('./sparcsmiddleware')

const axios = baseAxios.create({
  baseURL: localConfig.nuguEndpoint,
})

const authAxios = baseAxios.create({
  baseURL: localConfig.nuguEndpoint,
  auth: {
    username: localConfig.nuguId,
    password: localConfig.nuguPassword,
  },
})

const getPublicUsers = (req, res) => {
  axios.get(`/public_users`)
    .then(result => {
      res.status(200).send(result.data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const getUsers = (req, res) => {
  authAxios.get(`/users`)
    .then(result => {
      res.status(200).send(result.data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const getUser = (req, res) => {
  const { user_id } = req.params
  authAxios.get(`/users/${user_id}`)
    .then(result => {
      res.status(200).send(result.data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const updateUser = (req, res) => {
  const { user_id } = req.params
  if (user_id !== req.session.sparcsId) {
    res.status(403).send('어디서 밑장빼기냐')
  } else {
    const {
      name,
      is_private,
      is_developer,
      is_designer,
      is_undergraduate,
      ent_year,
      org,
      email,
      phone,
      birth,
      dorm,
      lab,
      home_add,
      github_id,
      linkedin_url,
      behance_url,
      facebook_id,
      twitter_id,
      battlenet_id,
      website,
      blog,
    } = req.body

    authAxios({
      method: 'put',
      url: `/users/${user_id}`,
      data: {
        name : name || null,
        is_private,
        is_developer,
        is_designer,
        is_undergraduate,
        ent_year : ent_year || null,
        org : org || null,
        email : email || null,
        phone : phone || null,
        birth : birth || null,
        dorm : dorm || null,
        lab : lab || null,
        home_add : home_add || null,
        github_id : github_id || null,
        linkedin_url : linkedin_url || null,
        behance_url : behance_url || null,
        facebook_id : facebook_id || null,
        twitter_id : twitter_id || null,
        battlenet_id : battlenet_id || null,
        website : website || null,
        blog : blog || null,
      },
    })
      .then(result => {
        res.status(200).send(result.data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
}

module.exports = app => {
  app.get('/api/nugu/public_users', getPublicUsers)
  app.get('/api/nugu/users', sparcsMiddleware, getUsers)
  app.get('/api/nugu/users/:user_id', sparcsMiddleware, getUser)
  app.put('/api/nugu/users/:user_id', sparcsMiddleware, updateUser)
}
