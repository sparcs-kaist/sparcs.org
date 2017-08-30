module.exports = (req, res, next) => {
  const { authenticated, isSPARCS } = req.session
  if (!authenticated) {
    res.status(401).send('Please Sign in');
  } else if (!isSPARCS) {
    res.status(404).send('It is allowed to SPARCS members only');
  } else {
    next()
  }
}
