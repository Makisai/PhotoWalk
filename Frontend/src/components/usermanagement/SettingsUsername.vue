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
            @click="validate"
            >{{$t(validate)}}
            </v-btn>
  </v-col>
  </div>
</template>

<script>
export default {
    name:"SettingsUsername",
    data(){ 
        return{
            changeusername: 'settings.changeusername',
             validate: 'settings.validate'
        }
    },
    methods: {
    changeUsername(){
      this.axios.patch('users/settings', {username: this.username})
          .then(() => {
            
          })
          .catch((error) => {
            this.error = 'error.username';
            console.log("FEHLER", error);
          })
    }
  }
}
</script>
