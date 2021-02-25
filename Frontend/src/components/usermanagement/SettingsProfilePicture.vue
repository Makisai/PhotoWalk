<template>
 
  <div> 
    <h1>{{($t('settings.profile'))}} </h1>
    <v-row class="row1">
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
            label="new_profile_picture"
            filled
            name="profile-picture"
            prepend-icon="mdi-camera"
            v-model="updateProfilePicture"
        ></v-file-input>
        <v-btn @click="updatePhoto">{{ $t('labels.submit') }}</v-btn>
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
        this.$store.commit(SET_PROFILEPICTURE, response.data.path);
      }).catch((error) => {
        this.error = 'error.profilePicture'
        console.log("FEHLER", error);
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