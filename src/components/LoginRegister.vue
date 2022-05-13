<template>
	<q-form @submit="submitForm">
		<q-input
			v-if="tab == 'register'"
			v-model="formData.name"
			class="q-mb-md"
			outlined
			label="Name" />
		<q-input
			v-model="formData.email"
			class="q-mb-md"
			outlined
			type="email"
			label="Email" />
		<q-input
			v-model="formData.password"
			class="q-mb-md"
			outlined
			type="password"
			label="Password" />
		<div class="row">
			<q-space />
			<q-btn
				color="primary"
				type="submit"
				:label="tab" />
		</div>
	</q-form>
</template>

<script>
	import { mapActions } from 'vuex'
  import { Notify } from 'quasar'
  import axios from "axios";

	export default {
		props: ['tab'],
		data() {
			return {
				formData: {
					name: '',
					email: 'amine.saidi1707@gmail.com',
					password: '123'
				}
			}
		},
		methods: {
			...mapActions('store', ['registerUser', 'loginUser']),
			submitForm() {
				if (this.tab == 'login') {
					// this.loginUser(this.formData)
				  this.login()
        }
				else {
					this.registerUser(this.formData)
          Notify.create({
            type: 'positive',
            message: 'Registered successfully'
          })
				}
			},
      login() {
        const login = new Promise((resolve, reject) => {
            axios
              .post(
                "http://192.168.1.20:8900/api/login",
                this.formData
              )
              .then(response => {
                console.log("login", response);
                this.$store.commit("SET_USER", response.data.user);
                this.$store.commit("SET_TOKEN", response.data.token);
                this.$socket.emit("joinConnectedUsers", response.data.user.data._id);
                // this.$store.dispatch('connectSocket')
                // this.socket = this.$store.state.socket;
                // new Promise((res, rej) => {
                //   let interval = setInterval(() => {
                //     if (!this.socket) this.socket = this.$store.state.socket;
                //     else {
                //       clearInterval(interval);
                //       res();
                //       console.log("socket init");
                //     }
                //   }, 500);
                // });
                this.$router.push('/home')
                Notify.create({
                  type: 'positive',
                  message: 'Welcome back!',
                })
              })
              .catch(error => {
                this.$loading(false);
                console.error("There was an error!", error);
                console.log(error.response);
                // if (error.response.data.message == "ModelNotFound") {
                //   this.$toast.open({
                //     message: this.$t('notifications.accountDoesntExist'),
                //     type: "error",
                //     duration: 7000
                //   });
                // } else {
                //   this.$toast.open({
                //     message: error.response.data.details,
                //     type: "error"
                //     // position: 'top-right'
                //     // all of other options may go here
                //   });
                // }
              });
          });

        },
		}
	}
</script>
