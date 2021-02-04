<template>
	<div>
  <v-row class="row1">
    <v-col cols="4">
      <p>{{$t(changeprofilepic)}} <br> {{$t(advice)}}</p>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="5">
      <v-file-input
        label="profile_picture"
        filled
        name="profile_picture"
        prepend-icon="mdi-camera"
        v-model="profile_picture"
      ></v-file-input>
    </v-col>  
    <v-col>
       
      <v-btn
      @click="validate"
      >{{$t(validate)}}
      </v-btn>
    </v-col>   
  </v-row>
  </div>
</template>

<script>
export default {
    name: "SettingsProfilePic",
    data () {
        return{
           
         changeprofilepic: 'settings.changeprofilepic',
          clear: 'settings.clear',
          advice: 'settings.advice',
        }
    }
}
</script>
<style scoped>
  .row1 {
    margin-bottom:2em;
	}
</style>