<template>
  <div>
  <v-col  cols = "4">
    <p>{{$t(changeusername)}} </p>
  </v-col>
  <v-col cols="4">
    <v-text-field
    filled
    label="Username"
    prepend-inner-icon="mdi-account"
    color="primary"
    v-model="username"
    ></v-text-field>
  </v-col> 
  <v-col>
    <v-btn
            @click="changeUsername"
            >{{$t(submit)}}
            </v-btn>
  </v-col>
  </div>
</template>

<script>
import {SET_USERNAME} from "@/store/mutations";
export default {
    name:"SettingsUsername",
    data(){ 
        return{
            username: '',
            changeusername: 'settings.changeusername',
             submit: 'labels.submit'
        }
    },
    methods: {
    changeUsername(){
      this.axios.put('users/updateUsername', {username: this.username})
          .then((response) => {
            const username = response.data.username;
            this.$store.commit(SET_USERNAME, username);
          })
          .catch((error) => {
            this.error = 'error.username';
            console.log("FEHLER", error);
          })
    }
  }
}
</script>
