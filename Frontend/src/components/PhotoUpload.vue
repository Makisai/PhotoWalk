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
      formData.append('challengeId',1);
      formData.append('userId',1);
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