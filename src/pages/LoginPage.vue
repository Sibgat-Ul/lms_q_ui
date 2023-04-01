<template>
	<q-page class="">
		<div class="relative h-screen">

			<div
				style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; max-width: 840px;">
				<div class="title text-center">
					<h5>
						Welcome to the LMS
					</h5>
				</div>

				<div class="grid grid-cols-2 g-1em">
					<form class="" @submit.prevent="register()">
						<h5>
							Register
						</h5>

						<input dense rounded outlined placeholder="Name"
							:rules="[val => val.length <= 3 || 'Please use maximum 3 characters']" type="text" v-model="reg.name"
							required />

						<input placeholder="Email" type="email" v-model="reg.email" required />

						<input placeholder="Password" type="password" v-model="reg.password" required />

						<q-option-group inline :options="options" type="radio" required v-model="reg.role" />

						<q-btn type="submit" class="bg-primary text-#fefefe" flat> Register </q-btn>
					</form>

					<form class="" submit.prevent>
						<h5>
							Login
						</h5>

						<input placeholder="Email" required v-model="log.email" />
						<input placeholder="Password" required v-model="log.password" />

						<q-option-group inline :options="options" type="radio" v-model="log.role" />

						<q-btn @click="login()" class="bg-primary text-#fefefe" flat> Login </q-btn>
					</form>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { login, register } from 'src/server/services/Authenticate.js'
import { useQuasar } from 'quasar'
import { authStore } from 'src/stores/auth_store.js'
import { storeToRefs } from 'pinia'

export default {
	setup() {
		let $q = useQuasar();
		let loginState = 'pending';

		let reg = reactive({
			name: '',
			password: '',
			role: 'i',
			email: '',
		})

		let log = reactive({
			email: 'alice@example.com',
			password: 'password1',
			role: 'i'
		})

		let auth_store = authStore()
		let infos = storeToRefs(auth_store);
		let { Login, Register, hello } = auth_store;

		watch(log, (newL) => {
			console.log(newL.role)
		})


		let options = [
			{
				label: 'Instructor',
				value: 'i'
			},
			{
				label: 'Student',
				value: 's'
			}
		]

		async function register() {
			await Register(reg);
		}
		
		async function login() {
			await Login(log);
		}

		return {
			reg,
			log,
			options,
			register,
			login
		}
	}
}
</script>

<style scoped>
form {
	text-align: center;
	display: flex;
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

input {
	border: 1px #bdbdbd solid;
	height: 2.3em;
	border-radius: .3em;
	padding: .2em;
	width: auto;
}
</style>

