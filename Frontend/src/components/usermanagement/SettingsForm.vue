<template>
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
    <v-col class="py-3" cols = "4">
      <p >{{$t(changemail)}} </p>
    </v-col>
            
        <v-col cols="6">
            <v-text-field
            filled
            label="Email"
            prepend-inner-icon="mdi-email"
            color="primary"
            v-model="email"    
            ></v-text-field>
        </v-col>
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
       
            <v-btn
            color="error"
            class="mr-4"
            @click="clear"
            >{{$t(clear)}}
            </v-btn>
      
        </v-col>   
    </v-row>
</template>

<script>
export default {
    name: "SettingsForm",
    data () {
        return{
            changemail: 'settings.changemail',
            changeusername: 'settings.changeusername',
            changeprofilepic: 'settings.changeprofilepic',
            validate: 'settings.validate',
            clear: 'settings.clear',
            advice: 'settings.advice',

        }
    }
    /*methods: {
    submit(){
      this.axios.put('users/settings', {email: this.email,username: this.username, password: this.password,})
          .then(() => {
            
          })
          .catch((error) => {
            this.error = 'error.login';
            console.log("FEHLER", error);
          })
    }
  }*/
}
</script>

<style scoped>
	.row1 {
   	 margin-bottom:2em;
	}
</style>