import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { login, register } from 'src/server/services/Authenticate.js'
import { useQuasar } from 'quasar'
import router from 'src/router/index'

export const authStore = defineStore('lms_store', () => {
  let loginState = false;
  let $q = useQuasar();
  let userData = ref(null)

  function wait(msg) {
    $q.notify({
      position: msg ? 'bottom' : 'top',
      type: msg ? 'negative' : 'positive',
      message: msg ? 'Error! ' + msg + ', mail is already in use.': 'Success! Redirecting.'
    })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('recieved');
        console.log('redirecting')
      }, 2000)
    })
  }

  async function Register(data) {
    console.log(data)
    let err = false;
    let res;

    try {
      res = await register(data);
    } catch (e) {
      err = e;
    } finally {
      if (res.data.code == undefined) {
        console.log('in reg', err)
        Login({'email': data.email, 'password': data.password, 'role': data.role});
      } else {
        await wait(res.data.code);
      }
    }
  }

  async function Login(data) {
    console.log('in login')
    let res;

    try {
      res = await login(data)
    } catch (err) {
      await wait(err)
    } finally {
      if (res.data.length == 0){
        await wait("Incorrect Mail or Password")
      } else {
        loginState = true
        userData.value = res.data[0]

        await wait()
        router().push({ path: '/dashboard' }).then(() => { router().go() })
      }
    }
  }

  return {
    Register,
    Login,
  }
})
