import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    filteredPosts: [],
    filters: [],
    profile: {}
  },
  mutations: {
    addPost (state, text) {
      state.posts.push(text)
    },
    removePost (state, post) {
      state.posts.splice(state.posts.indexOf(post), 1)
    },
    addFilteredPost (state, ftext) {
      state.filteredPosts.push(ftext)
    },
    removeFilteredPost (state, fpost) {
      state.filteredPosts.splice(state.filteredPosts.indexOf(fpost), 1)
    },
    removeFilter (state, filter) {
      state.filters.splice(state.filters.indexOf(filter), 1)
    },
    addFilter (state, filter) {
      state.filters.push(filter)
    }
  },
  getters: {
    getFilteredPosts: (state) => (filter) => {
      return state.posts.find(post => post.shop === filter)
    },
    filterExists: (state) => (filter) => {
      if (state.filters.indexOf(filter) >= 0) {
        return true
      } else {
        return false
      }
    }
  },
  actions: {
    fetchPosts ({ commit, getters }) {
      this.state.posts = []
      const axios = window.axios
      axios.get('http://ec2-54-203-212-130.us-west-2.compute.amazonaws.com/api/v1/flower')
        .then(response => {
          const ttt = JSON.parse(response.data)
          ttt.forEach(element => {
            commit('addPost', element)
          })
          this.state.filteredPosts = this.state.posts
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    setFilteredPosts (state, filter) {
      console.log(filter)
      const rex = new RegExp(filter, 'i')
      this.state.filteredPosts = this.state.posts.filter(post => post.productName.search(rex) !== -1)
    },
    setFilteredPosts2 (state, filter) {
      console.log(filter)
      this.state.filteredPosts = this.state.posts.filter(post => filter.indexOf(post.shop) >= 0)
    },
    clearFilters () {
      this.state.filters = []
    }
  }
})
