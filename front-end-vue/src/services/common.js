import Api from './Api'

export default {

  login(user) {
    return Api().post('login', user)
  },
  signup(user) {
    return Api().post('signup', user)
  },
  logout() {
    return Api().get('logout')
  },
  getUsers() {

      return Api().get('protected/getUsers', {
        headers: { Authorization: localStorage.getItem("token") }
      }).catch(()=>{
        const res = {
          status : 401,

        }
        return res;
      })
    
  },
  purge() {
    return Api().post('protected/purge')
  }
}