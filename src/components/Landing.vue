<template>
  <div class="hello">
    <div>
      <h1>BudFinder</h1>
      <p>A decentralized app built on <a href="https://blockstack.org" target="_blank">Blockstack</a></p>
      <v-btn @click.prevent="signIn" dark >Sign In With Blockstack</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
      blockstack: window.blockstack
    }
  },

  methods: {
    signIn () {
      const blockstack = this.blockstack
      blockstack.redirectToSignIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
