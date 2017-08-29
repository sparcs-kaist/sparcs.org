module.exports = controller => (req, res) => {
  require('./sparcsmiddleware')(req, res, () => {
    controller(req, res)
  })
}
