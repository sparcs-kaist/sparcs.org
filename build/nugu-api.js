const axios = require('axios');
const localConfig = require('../localconfig')
const sparcsRequired = require('./sparcsrequired')

const fetch = axios.create({
  baseURL: localConfig.nuguEndpoint,
  auth: {
    username: localConfig.nuguId,
    password: localConfig.nuguPassword,
  },
})

const getUsers = (req, res) => {
  fetch.get(`/users`)
    .then(result => {
      res.status(200).send(result.data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const getUserDetail = sparcsRequired((req, res) => {
  const { user_id } = req.params
  fetch.get(`/users/${user_id}`)
    .then(result => {
      res.status(200).send(result.data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

module.exports = app => {
  app.get('/api/nugu/users', getUsers)
  app.get('/api/nugu/users/:user_id', getUserDetail)
}
