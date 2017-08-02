const axios = require('axios');
const localConfig = require('../localconfig')

const fetch = axios.create({
  baseURL: 'http://localhost:12345',
  auth: {
    username: localConfig.nuguId,
    password: localConfig.nuguPassword,
  },
})

module.exports = app => {
  app.get('/api/nugu/users', (req, res) => {
    fetch.get(`/users`)
      .then(result => {
        res.status(200).send(result.data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  })

  app.get('/api/nugu/users/:user_id', (req, res) => {
    const { user_id } = req.params
    const { authenticated, isSPARCS } = req.session
    if (!authenticated) {
      res.status(401).send('Please Sign in');
    }
    else if (!isSPARCS) {
      res.status(404).send('It is allowed to SPARCS members only');
    }
    else {
      fetch.get(`/users/${user_id}`)
        .then(result => {
          res.status(200).send(result.data)
        })
        .catch(err => {
          res.status(500).send(err)
        })
    }
  })
}
