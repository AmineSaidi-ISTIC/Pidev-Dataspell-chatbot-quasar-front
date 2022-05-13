<template>
  <q-page class="flex q-pa-md">
  	<q-list
  		class="full-width"
  		separator>
  	  <q-item
  	  	v-for="user in users"
  	  	:key="user.id"
  	  	to="/chat"
  	  	clickable
  	  	v-ripple>
  	    <q-item-section avatar>
  	      <q-avatar color="primary" text-color="white">
            <img
              alt="Quasar logo"
              src="~assets/logo.png"
              style="width: 100%; height:100%"
            >
  	      </q-avatar>
  	    </q-item-section>

  	    <q-item-section>
  	      <q-item-label>{{ user.name }}</q-item-label>
  	    </q-item-section>

  	    <q-item-section side>
  	      <q-badge
  	      	:color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? 'Online' : 'Offline' }}
          </q-badge>
  	    </q-item-section>
  	  </q-item>

  	</q-list>
  </q-page>
</template>

<script>
	export default {
	  data () {
	    return {
	      users: [{
      	  id: 1,
      	  name: 'Banking Chatbot',
      	  online: true
      	}, {
      	  id: 2,
      	  name: 'Entertainment Chatbot',
      	  online: false
      	}]
	    }
	  },
    mounted() {
      console.log('PageUsers.vue mounted.')
      console.log(this.$store.state)
    }
  }
</script>

<style>
</style>
