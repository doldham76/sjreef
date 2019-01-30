<template>
<v-card class="dod">
  <v-card-title>
    <v-card-title class="headline">
        Flowers
    </v-card-title>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
  </v-card-title>
  <v-data-table
    :headers="headers"
    :items="posts"
    :search="search"
    :pagination.sync="pagination"
    item-key="text.productName"
  >

    <template slot="items" slot-scope="props">
      <template :active="props.posts" @click="props.posts = !props.posts">
    <tr>
      <v-flex style="padding:5px"><v-img :src="(props.item.image != '') ? props.item.image : 'https://screenshotlayer.com/images/assets/placeholder.png'" height="75px" width="75px"></v-img></v-flex>
      <td>{{ props.item.productName }}</td>
      <td class="text-xs-right">{{ props.item.shop }}</td>
      <td class="text-xs-right">{{ parseFloat(props.item.price).toFixed(2) }}</td>
      <td class="text-xs-right">{{ props.item.thc }}</td>
      <td class="text-xs-right">{{ props.item.brand }}</td>
      <td class="text-xs-right">{{ props.item.amount }}</td>
      <td class="text-xs-right">{{ props.item.categories[0] }}</td>
      <td class="text-xs-right">{{ props.item.costper }}</td>
      <td class="text-xs-right">{{ props.item.costthc }}</td>
    </tr>
      </template>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'productlist',
  data () {
    return {
      pagination: {
        descending: true,
        sortBy: 'costthc',
        rowsPerPage: 10
      },
      search: '',
      headers: [
        { text: '', sortable: false },
        {
          text: 'Product',
          align: 'left',
          value: 'productName'
        },
        { text: 'Shop', value: 'shop', align: 'right' },
        { text: 'Price', value: 'price', align: 'right' },
        { text: 'THC (%)', value: 'thc', align: 'right' },
        { text: 'Brand', value: 'brand', align: 'right' },
        { text: 'Amount (g)', value: 'amount', align: 'right' },
        { text: 'Category', value: 'categories', align: 'right' },
        { text: 'Price Per Gram', value: 'costper', align: 'right' },
        { text: 'THC/Price ratio', value: 'costthc', align: 'right' }
      ],
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
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
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
