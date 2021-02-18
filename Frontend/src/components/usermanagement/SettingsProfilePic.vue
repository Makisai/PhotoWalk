<template>
	<div>
  <v-row class="row1">
    <v-col cols="4">
      <p>{{$t(changeprofilepic)}} <br> {{$t(advice)}}</p>
    </v-col>
    <v-col col="4" class="test">
       <v-list-item v-model="profilePic">
        <v-list-item-avatar>
          <v-img :src="profilePicture()"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-col>
    <v-col cols="5">
      <v-file-input
        label="profile_picture"
        filled
        name="profile_picture"
        prepend-icon="mdi-camera"
        v-model="updateProfilbild"
      ></v-file-input>
       <v-btn @click="updatePhoto">{{ $t('labels.submit') }}</v-btn>
    </v-col>  
 
  </v-row>
  </div>
</template>

<script>

export default {
    name: "SettingsProfilePic",
   
    data () {
        return{
          updateProfilbild: null,
          changeprofilepic: 'settings.changeprofilepic',
          clear: 'settings.clear',
          advice: 'settings.advice',
        }
    },
    methods: {
      updatePhoto(){
        let formData = new FormData();
        formData.append('profile_picture',this.updateProfilbild);
        this.axios.patch('users/updateProfilbild', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
        })
      },
        profilePicture(){
        return process.env.VUE_APP_PUBLIC_URL + this.$store.state.user.profile_picture;
      }

    }
    
}
</script>
<style scoped>
  .row1 {
    margin-bottom:2em;
	}

</style>