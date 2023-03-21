<template>
    <q-page class="">
        <div class="relative h-screen">
            
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; max-width: 840px;"> 
                <div class="title text-center">
                    <h5>
                        Welcome to the LMS
                    </h5>
                </div>

                <div class="grid grid-cols-2 g-1em">
                    <form class="" @submit.prevent="Register">
                        <h5>
                            Register
                        </h5>

                        <q-input 
                            dense 
                            rounded 
                            outlined 
                            placeholder="Name" 
                            :rules="[ val => val.length <= 3 || 'Please use maximum 3 characters' ]" 
                            type="text" 
                            v-model="reg.name"
                        />

                        <q-input 
                            dense 
                            rounded 
                            outlined 
                            placeholder="Email" :rules="[ (val, rules) => rules.email(val) || 'Please enter a valid email address' ]" 
                            type="email" 
                            v-model="reg.email"
                        />

                        <q-input 
                            dense 
                            rounded 
                            outlined 
                            placeholder="Password" :rules="[ val => val.length >= 8 || 'Please use minimum 8 characters' ]" 
                            type="password" 
                            v-model="reg.password"
                        />
                        
                        <q-option-group
                            inline
                            :options="options"
                            type="radio"
                            required v-model="reg.group"
                        />

                        <q-btn type="submit" class="bg-primary text-#fefefe" flat> Register </q-btn>
                    </form>

                    <form class="" submit.prevent>
                        <h5>
                            Login
                        </h5>

                        <q-input dense rounded outlined placeholder="Email" required v-model="log.email"/>
                        <q-input dense rounded outlined placeholder="Password" required v-model="log.password"/>

                        <q-option-group
                            inline
                            :options="options"
                            type="radio"
                            required v-model="log.group"
                        />

                        <q-btn @click="Login" class="bg-primary text-#fefefe" flat> Login </q-btn>
                    </form>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import router from 'src/router/index'
import { reactive } from 'vue'
import {login, register} from 'src/server/services/Authenticate.js'

export default {
  setup () {
    let reg = reactive({
        name: '',
        password: '',
        group: '',
        email: '',
    })

    let log = reactive({
        email: 'bo3b@prisma.io',
        password: '123123',
        group: ''
    })

    console.log(log.group)

    let options = [
        { 
            label: 'Instructor', 
            value: 'instructor' 
        },
        { 
            label: 'Student',
            value: 'student' 
        }
    ]

    async function Register() {
        try {
            let res = await register(reg);
            console.log(res);
            push({path:'/dashboard', replace: true})
        } catch (err) {
            console.log(err)
        }
    }

    async function Login() {
        try {
            let res = await login(log);
            console.log(router);
            router().push({path:'/dashboard'}).then(() => { router().go() })
        } catch(err) {
            console.log(err)
        }    
    }

    return {
      reg,
      log,
      options,
      Register,
      Login
    }
  }
}
</script>

<style scoped>
form {
    text-align: center;
    display:flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 600px;
    margin: auto;
    gap: 1em;
    font-size: larger;
}

h5 {
    margin: .5em 0em;
}
</style>

