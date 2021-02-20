<template>
  <div>
  <v-col  cols = "4">
    <p>{{$t(changeusername)}} </p>
    <p>{{$store.state.user.username}} </p>
  </v-col>
  <v-col cols="4">
    <v-text-field
    :rules="[rules.required, rules.min]"
    filled
    label="Username"
    prepend-inner-icon="mdi-account"
    color="primary"
    v-model="newUsername"
    ></v-text-field>
  </v-col> 
  <v-col cols=4>
  <p class="ma-0" v-if="updatedUsername">Changed your Username succesfully!</p>
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
import {SET_USERNAME} from "../../store/mutations";

export default {
    name:"SettingsUsername",
    data(){ 
        return{
            updatedUsername: false,
            newUsername: '',
            changeusername: 'settings.changeusername',
            submit: 'labels.submit',
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 1 || 'Min 1 characters',
          },
        }
    },
    methods: {
    changeUsername(){
      this.axios.patch(`users/updateUsername`,{newUsername: this.newUsername}, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
      }).then(() => {
        this.$store.commit(SET_USERNAME, this.newUsername);
        this.updatedUsername = true;
      }).catch((error) => {
        this.error = 'error.username';
        console.log("FEHLER", error);
      })
    }
  }
}
</script>
