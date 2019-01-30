<template>
    <v-container fluid >
       <v-layout align-center justify-center style="margin-top:50px">
           <v-flex xs12 sm10>
           <v-card>
              <v-img :src="banner" height="325px">
                  <div class="text-xs-right">
                    <v-btn @click="$refs.file.click()">Change Header Image</v-btn>
                    <input type="file" name="headerimage" accept="image/*" hidden ref="file" @change="uploadHeader($event.target.files)">
                  </div>
              </v-img>
              <v-card-title>
                <v-flex>
                    <div class="doavatar" align-center>
                    <v-avatar
                        color="grey lighten-4"
                        slot="offset"
                        class="mx-auto d-block"
                        size="100px"
                    >
                        <img :src="user.avatarUrl()" alt="avatar">
                    </v-avatar>
                    <v-card-text class="text-xs-center">
                        <h6 class="headline">{{ user.name() }}</h6>
                        <h4 class="grey--text">{{ user.username }}</h4>
                        <p class="grey--text">{{ user.identityaddr }}</p>
                    </v-card-text>
                    </div>
                </v-flex>
              </v-card-title>
           </v-card>
           </v-flex>
       </v-layout>
       <doipfsuploader></doipfsuploader> 
    </v-container>
</template>
<script>
import doipfsuploader from './DoIpfsUploader'
const repoPath = 'ipfs-' + Math.random()
const Ipfs = require('ipfs')
let node
export default {
  name: 'profile',
  components: { doipfsuploader },
  data () {
    return {
      blockstack: window.blockstack,
      banner: '',
      bhash: null,
      user: null
    }
  },
  created () {
    const blockstack = this.blockstack
    const userData = blockstack.loadUserData()
    this.user = new blockstack.Person(userData.profile)
    this.user.username = userData.username
    this.user.identityaddr = userData.identityAddress
    node = new Ipfs({ repo: repoPath })
    node.once('ready', () => {
      console.log('IPFS node is ready')
      this.getExtProfile()
    })
  },
  methods: {
    getExtProfile () {
      const blockstack = this.blockstack
      blockstack.getFile('extProfile.json')
        .then((data) => {
          if (data) {
            let extProfile = JSON.parse(data)
            console.log(extProfile)
            node.files.cat(extProfile.headerImg)
              .then((file) => {
                let newfl = blockstack.decryptContent(JSON.parse(file))
                this.banner = newfl
              })
          } else {
            console.log('profile is null')
          }
        })
    },
    saveExtProfile () {
      const blockstack = this.blockstack
      if (!this.bhash) return
      const extProfile = {
        headerImg: this.bhash
      }
      blockstack.putFile('extProfile.json', JSON.stringify(extProfile))
        .then((data) => {
          console.log(data)
        })
    },
    uploadHeader (fileList) {
      const blockstack = this.blockstack
      if (!fileList.length) return
      let fReader = new FileReader()
      fReader.addEventListener('load', function (event) {
        this.banner = fReader.result
        let efs = blockstack.encryptContent(fReader.result)
        const filennn = {
          path: fileList[0].name,
          content: node.types.Buffer.from(JSON.stringify(efs))
        }
        node.files.add(filennn)
          .then((response) => {
            this.bhash = response[0].hash
            this.saveExtProfile()
            // console.log('https://ipfs.io/ipfs/' + this.bhash)
          })
      }.bind(this), false)
      fReader.readAsDataURL(fileList[0])
    }
  }
}
</script>
<style lang="scss" scoped>
  .doavatar {
      margin-top: -70px;
  }
</style>
