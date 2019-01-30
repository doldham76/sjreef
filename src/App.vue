<template>
  <div id="app" data-app>
    <navbar v-if="user" :user.sync="user"></navbar>
    <landing v-if="! blockstack.isUserSignedIn()"></landing>
    <router-view v-if="user" :user="user"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Landing from './components/Landing.vue'

export default {
  name: 'app',
  components: {Landing, Navbar},
  mounted () {
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      this.userData = blockstack.loadUserData()
      this.user = new blockstack.Person(this.userData.profile)
      this.user.username = this.userData.username
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
      .then((userData) => {
        window.location = window.location.origin
      })
    }
  },
  data () {
    return {
      blockstack: window.blockstack,
      user: null
    }
  }
}
</script>

<style src="./assets/sass/app.scss" lang="scss">
</style>
