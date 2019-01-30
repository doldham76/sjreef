<template>
<v-layout justify-center fill-height >
  <v-data-iterator
    :items="clubs"
    :rows-per-page-items="rowsPerPageItems"
    :pagination.sync="pagination"
    content-tag="v-layout"
    row
    wrap
  >
    <v-flex
      slot="item"
      slot-scope="props"
      xs12 
      sm6
      md4
      lg3
      class="dod"
    >
      <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <v-card width="auto">
              <img :src="props.item.avatar_image.small_url" style="width:215px;margin-right:auto;margin-left:auto">
              <v-card-text primary-title>
                <div>
                  <span wrap>
                    {{ props.item.name }}
                  </span><br/>
                  <span class="grey--text">
                    {{ props.item.latitude }}
                  </span><br>
                  <span class="grey--text">
                    {{ props.item.longitude }}
                  </span><br>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </v-card>
    </v-flex>
  </v-data-iterator>
</v-layout>
</template>

<script>
export default {
  name: 'dispensarylist',
  data () {
    return {
      errors: [],
      clubs: [],
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
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
  },
  mounted () {
    this.fetchClubs()
  },
  computed: {
  },
  methods: {
    fetchClubs () {
      const axios = window.axios
      axios.get('http://ec2-54-203-212-130.us-west-2.compute.amazonaws.com/api/v1/dispensary')
        .then((response) => {
          const dd = JSON.parse(response.data)
          this.clubs = dd
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dod {
  margin-top: 50px
}
</style>
