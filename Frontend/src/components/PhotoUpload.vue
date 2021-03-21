 <template>
   <div>
      <v-col v-if="internalError">
        <p class="errorMessage"> {{$t('error.internalError')}} </p>
      </v-col>
        <v-col v-if="incompleteError">
        <p class="errorMessage"> {{$t('error.incompleteError')}} </p>
      </v-col>
     <v-row>
      <v-col class="pa-4" cols="12" sm="8">
        <v-file-input
          :rules="[rules.notEmpty,rules.size,rules.mimetype]"
          label="File input"
          filled
          prepend-icon="mdi-camera"
          v-model="upload"
          ref="fileInput"/>
      </v-col>
     <v-col cols="12" sm="3">
     <v-btn
       @click="submitUpload"
       :disabled="!challengeIsSelected()"
        class="submitButton ma-2"
        color="primary"
        height="50px"
        width="180px">
       {{ $t('labels.submit') }}</v-btn>
     </v-col>
     </v-row>
    <v-col v-if="uploaded">
      <p class="successMessage"> {{$t('success.photoUpload')}} </p>
    </v-col>
   </div>
 </template>

<script>
  import {SET_PHOTOS_USER} from "@/store/mutations";

  export default {
    name: 'PhotoUpload',
    data() {
      return {
        upload: undefined,
        uploaded: false,
        internalError: false,
        incompleteError: false,
        rules: {
          notEmpty: value => !!value || 'file is required',
          size: value => !value || value.size <= 1024*1024* 50 || 'filesize too big',
          mimetype: value => {
            const pattern = /.*(\.png|\.jpg|\.jpeg){1}$/mg
            return !value || pattern.test(value.name.toLowerCase())  || 'Invalid mimetype'
          },
        },
      }
    },
    methods: {
      challengeIsSelected() {
          const challengeIds = this.$store.state.detail.photowalk.challenges.map(challenge => challenge.id);
          return challengeIds.includes(this.$store.state.detail.selectedChallenge.id);
      },
      submitUpload(){ 
        let formData = new FormData();
        formData.append('photo_link',this.upload);
        formData.append('challengeId',this.$store.state.detail.selectedChallenge.id);
        this.axios.post('photos/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then((response) => {
            if(response.status == 201){
              this.axios.get(`photos/user`,{
                headers: {
                  'Authorization': `Bearer ${this.$store.state.user.token}`
                }
              }).then(response => {
                this.$refs.fileInput.reset();
                this.$store.commit(SET_PHOTOS_USER,response.data);
                this.uploaded = true;
                this.incompleteError = false;
                this.internalError = false;
              })
            } 
          })
          .catch((error) => {  
            if(error.response && error.response.status == 400){
              this.incompleteError = true;
              this.internalError = false;
              this.uploaded = false;
            }
            if(error.response && error.response.status == 500){
              this.internalError = true;
              this.incompleteError = false;
              this.uploaded = false;
            }
          })
      }

    }
  }
</script>

<style scoped>

</style>