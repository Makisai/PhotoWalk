 <template>
   <div>
      <v-file-input
          label="File input"
          filled
          prepend-icon="mdi-camera"
          v-model="upload"
      ></v-file-input>
     <v-btn @click="submitUpload">{{ $t('labels.submit') }}</v-btn>
   </div>
 </template>

<script>
export default {
  name: 'PhotoUpload',
  data() {
    return {
      upload: null,
    }
  },
  methods: {
    submitUpload(){
      let formData = new FormData();
      formData.append('photo_link',this.upload);
      formData.append('challengeId',this.$store.state.detail.selectedChallenge.id);
      // eslint-disable-next-line no-debugger
      debugger
      this.axios.post('photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
      })
    }

  }
}
</script>

<style scoped>

</style>