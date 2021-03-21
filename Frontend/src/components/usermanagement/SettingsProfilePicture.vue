<template>
  <div> 
    <h3 class="text-h3 my-2">{{($t('settings.profile'))}} </h3>
    <v-divider class="mt-5 mb-10"/>
    <v-row>
      <v-col v-if="incompleteError" cols="12">
        <p class ="errorMessage">{{$t('error.incompleteError')}}</p>
      </v-col>
      <v-col v-if="internalError" cols="12">
        <p class ="errorMessage">{{$t('error.internalError')}}</p>
      </v-col>
      <v-col cols="12" md="5">
        <h5 class="text-h6">{{ $t('settings.changeProfilePicture') }}</h5>
        <p class="adviceText" v-html="$t('settings.advice')"/>
      </v-col>
      <v-col col="12" md="3" >
        <v-avatar size="130" justify-center>
          <v-img :src="profilePicture"/>
        </v-avatar>
      </v-col>
      <v-col cols="12" md="4">
        <v-file-input
            :rules="[rules.required,rules.mimetype,rules.size]"
            :label="$t('settings.profilePicture')"
            filled
            show-size
            name="profile-picture"
            prepend-icon="mdi-camera"
            v-model="updateProfilePicture"
        ></v-file-input>
        <v-btn
            @click="updatePhoto"
            class="submitButton ml-9"
            color="primary">
          {{$t('labels.submit')}}
        </v-btn>
      </v-col>
      <v-col v-if="updated">
      <p class="successMessage"> {{$t('success.profilePictureUpdated')}} </p>
    </v-col>
    </v-row>
  </div>
</template>

<script>
import {SET_PROFILEPICTURE} from "../../store/mutations";
export default {
  name: "SettingsProfilePicture",
  computed: {
    profilePicture() {
      return process.env.VUE_APP_PUBLIC_URL + this.$store.state.user.profilePicture;
    }
  },
  data() {
    return {
      updateProfilePicture: null,
      incompleteError: false,
      internalError: false,
      updated: false,
      rules: {
          notEmpty: v => !!v ||'file is required',
          size: v => v.size <= 1024*1024* 50 || 'filesize too big',
          mimetype: v => {
            const pattern = /.*(\.png|\.jpg|\.jpeg|\.JPG|\.JPEG|\.PNG){1}$/mg
            return pattern.test(v.name)  || 'Invalid mimetype'
          },
      },
    }
  },
  methods: {
    updatePhoto() {
      let formData = new FormData();
      formData.append('profile_picture', this.updateProfilePicture);
      this.axios.patch('users/updateProfilePicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
      }).then((response) => {
          if(response.status == 200){
            this.updated = true;
            this.internalError = false;
            this.incompleteError = false;
            this.$store.commit(SET_PROFILEPICTURE, response.data.path);
            this.updateProfilePicture = "";
          }  
      }).catch((error) => {
          if(error.response && error.response.status == 400){
            this.incompleteError = true;
            this.internalError = false;
            this.updated = false;
            }
          if(error.response && error.response.status == 500){
            this.internalError = true;
            this.incompleteError = false;
            this.updated = false;
            }
      })
    },
  }
}
</script>

<style scoped>
.adviceText{
  font-size: 12px;
  color: #555555;
}
</style>