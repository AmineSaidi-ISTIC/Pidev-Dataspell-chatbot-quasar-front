<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.token()
  },
  methods: {
    async token() {
      console.log('token')
      console.log(this.$store.state.token)
      if (this.$store.state.token != undefined) await this.getUser();
      return this.$store.state.token;
    },
    async getUser() {
      console.log('getUser');
      if (this.$store.getters["isLoggedIn"]) {
        console.log('isLoggedIn');
        this.initSocket()
      }
    },
    async initSocket() {
      console.log('init socket');
      this.$store.dispatch('connectSocket')
      this.socket = this.$store.state.socket;
      await new Promise((res, rej) => {
        let interval = setInterval(() => {
          if (!this.socket) this.socket = this.$store.state.socket;
          else {
            clearInterval(interval);
            res();
            console.log("socket init");
          }
        }, 500);
      });
    },
  },
}
</script>
