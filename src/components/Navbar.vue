<template>
<v-layout>
<v-navigation-drawer v-model="drawer" fixed temporary light >
  <v-list>
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <img :src="user.avatarUrl()">
      </v-list-tile-avatar>
      <v-list-tile-content>      
        <v-list-tile-title>{{ user.name() }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile to="/" >
      <v-list-tile-title>Home</v-list-tile-title>
    </v-list-tile>
    <v-list-tile to="/products" >
      <v-list-tile-title>Products</v-list-tile-title>
    </v-list-tile>
    <v-list-tile to="/productstab" >
      <v-list-tile-title>Products T</v-list-tile-title>
    </v-list-tile>
    <v-list-tile to="/dispensary" >
      <v-list-tile-title>Dispensarys</v-list-tile-title>
    </v-list-tile>
    <v-list-tile to="/addlink" >
      <v-list-tile-title>Add Link</v-list-tile-title>
    </v-list-tile>
    <v-list-tile to="/upload" >
      <v-list-tile-title>Upload</v-list-tile-title>
    </v-list-tile>
    <v-list-tile to="/profile" >
      <v-list-tile-title>Profile</v-list-tile-title>
    </v-list-tile>
    <v-list-tile @click="signOut()">
      <v-list-tile-title>Sign Out</v-list-tile-title>
    </v-list-tile>
  </v-list>
</v-navigation-drawer>
<v-toolbar color="#795548" dark card fixed>
    <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title><img :src="img" height="32px"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-flex>
      <v-text-field label="Enter Search..." v-if="showSearch" @keyup="searchJS"></v-text-field>
    </v-flex>
    <v-btn icon>
        <v-icon @click="showSearch = !showSearch">mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
        <v-icon>mdi-select-compare</v-icon>
    </v-btn>
    <v-btn icon @click="dialog = true">
     <v-icon>mdi-filter-variant</v-icon>
    </v-btn>
</v-toolbar>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <v-card >
        <v-toolbar color="#228b22" dark>
          <v-btn icon dark @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Select Filters</v-toolbar-title>
        </v-toolbar>
        <v-card-text  style="opacity:0.7;filter:alpha(opacity=70)"  >
          <div>
            <v-btn>Hybrid</v-btn>
            <v-btn>Indica</v-btn>
          </div>
          <div>
            <v-btn>Vapes</v-btn>
            <v-btn>Flowers</v-btn>
          </div>
          <div>
            <v-btn v-on:click="setFilter('harborsidesanjose')">Harborside San Jose</v-btn>
            <v-btn v-on:click="setFilter('elementalwellness')">Elemental Wellness</v-btn>
            <v-btn v-on:click="setFilter('airfield')">Airfield</v-btn>
          </div>
          <div>
            <v-btn v-on:click="clearFilters()">Clear Filters</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
</v-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import img from '../assets/wf_logo.png'
export default {
  name: 'Navbar',
  props: ['user'],
  data () {
    return {
      blockstack: window.blockstack,
      dialog: false,
      drawer: false,
      showSearch: false,
      img: img
    }
  },
  computed: {
    ...mapGetters(['filterExists', 'getFilteredPosts']),
    ...mapState(['filters'])
  },
  watch: {
    filters: function (val) {
      if (this.filters.length > 0) {
        this.setFilteredPosts2(this.filters)
      } else {
        this.fetchPosts()
      }
    }
  },
  methods: {
    signOut () {
      this.blockstack.signUserOut('http://localhost:8080/#/')
      this.$emit('update:user', null)
    },
    clearFilters: function () {
      this.$store.dispatch('clearFilters')
    },
    searchJS (event) {
      this.setFilteredPosts(event.target.value)
    },
    setFilter: function (filter) {
      console.log(this.filters.indexOf(filter))
      console.log(this.filterExists(filter))
      if (!this.filterExists(filter)) this.$store.commit('addFilter', filter)
      console.log(this.filters)
    },
    ...mapActions(['setFilteredPosts', 'setFilteredPosts2', 'fetchPosts'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
