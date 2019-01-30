<template>
  <v-layout v-if="posts && posts.length" justify-center fill-height >
    <v-flex xs12 sm6 class="dod">
      <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="post in filteredPosts" :key="post.id" >
            <v-card width="auto">
              <img :src="post.image" style="width:215px;margin-right:auto;margin-left:auto">
              <v-card-text primary-title>
                <div>
                  <span wrap>
                    <a :href="post.url" target="blank">{{ post.productName }}</a>
                  </span><br/>
                  <span class="grey--text">
                    {{ post.brand }}
                  </span><br>
                  <span class="grey--text">
                    THC: {{ post.thc }}%
                  </span><br>
                  <span class="grey--text">
                    Size: {{ post.amount }}
                  </span><br>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-card-text>{{ post.shop }}</v-card-text>
                <v-spacer></v-spacer>
                <p class="text-xs-right" >${{ post.price }}</p>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'productlist',
  data () {
    return {
      errors: [],
      nfilters: this.filters,
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
    }
  },
  created () {
    this.fetchPosts()
  },
  mounted () {
    this.scroll()
    this.$getLocation({
      enableHighAccuracy: true
    })
      .then((coordinates) => {
        console.log(coordinates)
      })
  },
  computed: {
    ...mapState(['posts', 'filteredPosts'])
  },
  methods: {
    toggle: function (event) {
      alert(event.target.dataset.url)
      this.active = !this.active
    },
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = window.scrollY + window.innerHeight >= document.body.scrollHeight
        if (bottomOfWindow) {
          console.log('bottom of screen')
        }
      }
    },
    ...mapActions(['fetchPosts'])
  }
}
</script>

<style lang="scss" scoped>
.dod {
  margin-top: 50px
}
</style>
