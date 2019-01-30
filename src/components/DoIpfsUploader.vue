<template>
    <v-container style="margin-top:60px">
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h3>Upload Id</h3>
        <div class="dropbox">
          <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="uploadId($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
      <v-img :src="imageId"></v-img>
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h3>Upload Rec</h3>
        <div class="dropbox">
          <input type="file" :name="uploadFieldName1" :disabled="isSaving" @change="uploadRec($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
      <v-img :src="imageRec"></v-img>
      <v-text-field label="Search User Profiles" placeholder="Search By Blockstack ID" @keyup.enter="showFile"></v-text-field>
      <v-btn @click="saveKYC">Save KYC</v-btn>
      <pdf src="https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf"></pdf>
      <pdf :src="strPdf"></pdf>
    </v-container>  
</template>

<script>
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
const Ipfs = require('ipfs')
import pdf from 'vue-pdf'
const repoPath = 'ipfs-' + Math.random()
const CID = require('cids')
let node
export default {
  name: 'doipfsuploader',
  components: {
    pdf
  },
  data () {
    return {
      blockstack: window.blockstack,
      uploadedFiles: [],
      currentStatus: null,
      uploadError: null,
      uploadFieldName: 'ipfsfiles',
      uploadFieldName1: 'ipfsfiles1',
      imageRec: '',
      recFileName: '',
      recHash: '',
      imageId: '',
      idFileName: '',
      idHash: '',
      strPdf: null
    }
  },
  watch: {
    recFileName: function () {
      const bstack = this.blockstack
      console.log('ttt' + this.recHash)
      node.files.cat(this.recHash)
        .then((file) => {
          // let newb = node.types.Buffer.from(file)
          // console.log(file)
          const newb = bstack.decryptContent(JSON.parse(file))
          // console.log(newb)
          // let nr = new FileReader()
          this.imageRec = newb
          // nr.addEventListener('load', function (event) {
            // const urll = nr.result
            // this.imagePreview1 = urll
            // console.log(event)
            // console.log(urll)
          // }, false)
          // let nb = new Blob([newb])
          // nb.type = 'image/jpg'
          // nr.readAsDataURL(nb)
          // console.log(fb)
        })
    },
    idFileName: function () {
      const bstack = this.blockstack
      const cd = new CID(this.idHash)
      node.files.cat(cd.toV1())
        .then((file) => {
          // let newb = node.types.Buffer.from(file)
          // console.log(file)
          const newb = bstack.decryptContent(JSON.parse(file))
          // console.log(newb)
          // let nr = new FileReader()
          this.imageId = newb
          // nr.addEventListener('load', function (event) {
            // const urll = nr.result
            // this.imagePreview1 = urll
            // console.log(event)
            // console.log(urll)
          // }, false)
          // let nb = new Blob([newb])
          // nb.type = 'image/jpg'
          // nr.readAsDataURL(nb)
          // console.log(fb)
        })
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      this.uploadedFiles = []
      this.currentStatus = STATUS_INITIAL
      this.uploadError = null
      this.imageRec = ''
      this.imageId = ''
      this.idFileName = ''
      this.recFileName = ''
      this.strPdf = null
    },
    save (formdata) {
      this.currentStatus = STATUS_SAVING
      console.log(formdata)
      this.uploadedFiles = [].concat(formdata)
    },
    showFile (event) {
      const bstack = this.blockstack
      console.log(event)
      bstack.lookupProfile(event.target.value)
        .then((data) => {
          console.log(data.image[0])
          this.imageRec = data.image[0].contentUrl
        })
    },
    getIpfsFile (strCid) {
       // const bstack = this.blockstack
      return node.files.cat(strCid)
    },
    listFiles () {
      const cv = new CID(this.recHash)
      node.ls(cv.toV1(), (err, files) => {
        if (err) {
          console.log(err)
        }
        console.log(files)
      })
    },
    uploadId (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()
      const bstack = this.blockstack
      if (!fileList.length) return
      let newfr = new FileReader()
      newfr.addEventListener('load', function (event) {
        let efs = bstack.encryptContent(newfr.result)
        const filennn = {
          path: fileList[0].name,
          content: node.types.Buffer.from(JSON.stringify(efs))
        }
        node.files.add(filennn)
          .then((response) => {
            // console.log(response)
            console.log(response[0].hash)
            this.idHash = response[0].hash
            this.idFileName = fileList[0].name
          })
        this.uploadedFiles.push(fileList[0])
      }.bind(this), false)
      newfr.readAsDataURL(fileList[0])
      // const filestream = fileReaderPullStream(fileList[0])
      // let efs = bstack.encryptContent(filestream)
      // console.log(efs)
      // const filename = fileList[0].name
      // bstack.putFile(filename, fileList[0], options)
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      // this.save(formData)
    },
    uploadRec (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()
      const bstack = this.blockstack
      if (!fileList.length) return
      let newfr = new FileReader()
      newfr.addEventListener('load', function (event) {
        let efs = bstack.encryptContent(newfr.result)
        const filennn = {
          path: fileList[0].name,
          content: node.types.Buffer.from(JSON.stringify(efs))
        }
        node.files.add(filennn)
          .then((response) => {
            // console.log(response[0].hash)
            this.recHash = response[0].hash
            this.recFileName = fileList[0].name
          })
        this.uploadedFiles.push(fileList[0])
      }.bind(this), false)
      newfr.readAsDataURL(fileList[0])
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })
    },
    saveKYC () {
      const bstack = this.blockstack
      const kyc = {
        idfilename: this.idFileName,
        idhash: this.idHash,
        recfilename: this.recFileName,
        rechash: this.recHash
      }
      bstack.putFile('kyc.json', JSON.stringify(kyc))
        .then((data) => {
          console.log(data)
        })
    },
    getKYC () {
      const bstack = this.blockstack
      bstack.getFile('kyc.json')
        .then((file) => {
          let kdata = JSON.parse(file)
          console.log(kdata)
          this.recHash = kdata.rechash
          this.idHash = kdata.idhash
          this.recFileName = kdata.recfilename
          this.idFileName = kdata.idfilename
        })
    }
  },
  created () {
    console.log('created')
    node = new Ipfs({ repo: repoPath })
    node.once('ready', () => {
      console.log('IPFS node is ready')
      this.getKYC()
      this.getIpfsFile('QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf')
        .then((data) => {
          console.log(data)
          let fr = new FileReader()
          fr.addEventListener('load', function (event) {
            console.log('ssss')
            console.log(fr.result)
            this.strPdf = fr.result
          }.bind(this), false)
          let bl = new Blob([data])
          fr.readAsDataURL(bl)
        })
    })
  },
  mounted () {
    console.log('mounted')
    console.log(node)
  }
}
</script>

<style scoped>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
