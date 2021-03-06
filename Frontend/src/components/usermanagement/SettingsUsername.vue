<template>
  <div>
  <v-col  cols = "4">
    <p>{{$t('settings.changeUsername')}} </p>
    <p>{{$store.state.user.username}} </p>
  </v-col>
  <v-col cols="4">
    <v-text-field
    :rules="[rules.required]"
    filled
    label="[labels.username]"
    prepend-inner-icon="mdi-account"
    color="primary"
    v-model="newUsername"
    ></v-text-field>
  </v-col> 
  <v-col cols=4>
  <p class="ma-0" v-if="updatedUsername">{{$t('settings.usernameSuccess')}}</p>
  </v-col>
  <v-col>
    <v-btn
        @click="changeUsername"
        >{{$t('labels.submit')}}
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
            rules: {
            required: value => !!value || 'Required.',
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