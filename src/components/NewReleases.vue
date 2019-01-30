<template>
<main role="main">
  <div class="jumbotron">
    <div class="container">
      <video id="video" controls width="100%" height="55%"></video>
    </div>
  </div>
  <div class="container">
    <b-card-group deck class="mb-">
      <b-card v-for="(release, index) in newreleases"
              :title="release.title"
              :key="index"
              :img-src="release.poster"
              img-top
              style="max-width: 20rem;"
              align="center"
              class="mb-2">
              <b-button v-on:click="loadPlayer" :vuehash="release.hash" :vuefile="release.filename" >Play</b-button>
      </b-card>
    </b-card-group>
  </div>
</main>
</template>
<script>
const Ipfs = require('ipfs')
const HlsjsIpfsLoader = require('hlsjs-ipfs-loader')
const Hls = require('hls.js')
const repoPath = 'ipfs-' + Math.random()
const node = new Ipfs({ repo: repoPath })
const VueScrollTo = require('vue-scrollto')
export default {
  name: 'Dash',
  data () {
    return {
      hash: 'QmPXZNJQYEhrx84piEjGDqnJFxu7u9bUK6rqZ5jH4rZ5tZ',
      filename: './img/last_samurai_ver3.jpg',
      newreleases: [{
        poster: 'https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/da/daea32adcae6abcb548134fa98f139f9_500x735.jpg',
        title: 'The Last Samurai',
        description: "Capt. Nathan Algren (Tom Cruise) is an American military officer hired by the Emperor of Japan to train the country's first army in the art of modern warfare. As the government attempts to eradicate the ancient Samurai warrior class in preparation for more Westernized and trade-friendly policies, Algren finds himself unexpectedly affected by his encounters with the Samurai, which places him at the center of a struggle between two eras and two worlds.",
        hash: 'QmPXZNJQYEhrx84piEjGDqnJFxu7u9bUK6rqZ5jH4rZ5tZ',
        filename: 'master.m3u8'
      }, {
        poster: 'https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/da/daea32adcae6abcb548134fa98f139f9_500x735.jpg',
        title: 'The Last Samurai',
        description: "Capt. Nathan Algren (Tom Cruise) is an American military officer hired by the Emperor of Japan to train the country's first army in the art of modern warfare. As the government attempts to eradicate the ancient Samurai warrior class in preparation for more Westernized and trade-friendly policies, Algren finds himself unexpectedly affected by his encounters with the Samurai, which places him at the center of a struggle between two eras and two worlds.",
        hash: 'QmPXZNJQYEhrx84piEjGDqnJFxu7u9bUK6rqZ5jH4rZ5tZ',
        filename: 'master.m3u8'
      }, {
        poster: 'https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/da/daea32adcae6abcb548134fa98f139f9_500x735.jpg',
        title: 'The Last Samurai',
        description: "Capt. Nathan Algren (Tom Cruise) is an American military officer hired by the Emperor of Japan to train the country's first army in the art of modern warfare. As the government attempts to eradicate the ancient Samurai warrior class in preparation for more Westernized and trade-friendly policies, Algren finds himself unexpectedly affected by his encounters with the Samurai, which places him at the center of a struggle between two eras and two worlds.",
        hash: 'QmPXZNJQYEhrx84piEjGDqnJFxu7u9bUK6rqZ5jH4rZ5tZ',
        filename: 'master.m3u8'
      }, {
        poster: 'https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/da/daea32adcae6abcb548134fa98f139f9_500x735.jpg',
        title: 'The Last Samurai',
        description: "Capt. Nathan Algren (Tom Cruise) is an American military officer hired by the Emperor of Japan to train the country's first army in the art of modern warfare. As the government attempts to eradicate the ancient Samurai warrior class in preparation for more Westernized and trade-friendly policies, Algren finds himself unexpectedly affected by his encounters with the Samurai, which places him at the center of a struggle between two eras and two worlds.",
        hash: 'QmPXZNJQYEhrx84piEjGDqnJFxu7u9bUK6rqZ5jH4rZ5tZ',
        filename: 'master.m3u8'
      }, {
        poster: 'https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/da/daea32adcae6abcb548134fa98f139f9_500x735.jpg',
        title: 'The Last Samurai',
        description: "Capt. Nathan Algren (Tom Cruise) is an American military officer hired by the Emperor of Japan to train the country's first army in the art of modern warfare. As the government attempts to eradicate the ancient Samurai warrior class in preparation for more Westernized and trade-friendly policies, Algren finds himself unexpectedly affected by his encounters with the Samurai, which places him at the center of a struggle between two eras and two worlds.",
        hash: 'QmPXZNJQYEhrx84piEjGDqnJFxu7u9bUK6rqZ5jH4rZ5tZ',
        filename: 'master.m3u8'
      }]
    }
  },
  methods: {
    loadPlayer: function (event) {
      Hls.DefaultConfig.loader = HlsjsIpfsLoader
      Hls.DefaultConfig.debug = true
      if (Hls.isSupported()) {
        const video = document.getElementById('video')
        const hls = new Hls()
        hls.config.ipfs = node
        hls.config.ipfsHash = event.currentTarget.getAttribute('vuehash')
        hls.loadSource(event.currentTarget.getAttribute('vuefile'))
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play())
        VueScrollTo.scrollTo(video.offsetTop)
      }
    }
  }

}
</script>
<style>
</style>
