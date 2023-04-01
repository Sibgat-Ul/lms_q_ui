import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { login, register } from 'src/server/services/Authenticate.js'
import { useQuasar } from 'quasar'
import router from 'src/router/index'

export const authStore = defineStore('lms_store', () => {
  let loginState = false;
  let $q = useQuasar();
  let userData = ref(null)
  let reg = reactive({});
  let log = reactive({});

  function wait(msg) {
    $q.notify({
      position: msg ? 'bottom' : 'top',
      type: msg ? 'negative' : 'positive',
      message: msg ? 'Error!' + msg : 'Success! Redirecting.'
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
    let err = null;

    try {
      let res = await register(data);
    } catch (e) {
      err = e;
      await wait(err);
    } finally {
      if (!err){
        Login({'email': data.email, 'password': data.password, 'role': data.role});
        return
      }
    }
    
    console.log(userData);
  }

  async function Login(data) {
    console.log(data)
    let res;

    try {
      res = await login(data)
    } catch (err) {
      loginState = false
      
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

    console.log(userData.value);
  }

  function hello() {
    console.log("someting")
  }
  return {
    Register,
    Login,
    hello,
    reg,
    log
  }
})
