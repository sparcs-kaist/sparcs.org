import Cookies from 'js-cookie'

export default key => {
  const session = Cookies.get('session')
  if (!session) {
    return null
  }
  return JSON.parse(session)[key]
}
