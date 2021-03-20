<template>
  <div> 
    <h1>{{($t('settings.profile'))}} </h1>
    <v-row class="row1">
      <v-col v-if="incompleteError" cols="12">
        <p class ="error">{{$t('error.incompleteError')}}</p>
      </v-col>
      <v-col v-if="internalError" cols="12">
        <p class ="error">{{$t('error.internalError')}}</p>
      </v-col>
      <v-col cols="4">
        <p>{{ $t('settings.changeProfilePicture') }} <br> {{ $t('settings.advice') }}</p>
      </v-col>
      <v-col col="4" >
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="profilePicture"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-col>
      <v-col cols="5">
        <v-file-input
            :rules="[rules.required,rules.mimetype,rules.size]"
            :label="$t('settings.profilePicture')"
            filled
            name="profile-picture"
            prepend-icon="mdi-camera"
            v-model="updateProfilePicture"
        ></v-file-input>
        <v-btn @click="updatePhoto">{{ $t('labels.submit') }}</v-btn>
      </v-col>
      <v-col v-if="updated">
      <p>{{$t('success.profilePictureUpdated')}} </p>
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
.row1 {
  margin-bottom: 2em;
}
</style>