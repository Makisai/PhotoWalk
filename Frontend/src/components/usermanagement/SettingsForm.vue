<template>
    <v-row class="row1">
        <v-col class="py-3" cols = "12">
            <p >{{$t(changemail)}} </p>
            <v-text-field
            filled
            label="Email"
            prepend-inner-icon="mdi-email"
            color="primary"
            v-model="email"    
            ></v-text-field>
        </v-col>
        <v-col  cols = "12">
            <p>{{$t(changeusername)}} </p>
            <v-text-field
                filled
            label="Username"
            prepend-inner-icon="mdi-account"
            color="primary"
            v-model="username"
         ></v-text-field>
    </v-col> 
        <v-col  cols = "12">
            <p>{{$t(changepassword)}} </p>
            <v-text-field
             :append-icon="showeye ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.min]"
                :type="showeye ? 'text' : 'password'"
                filled
            label="Password"
            prepend-inner-icon="mdi-account"
            color="primary"
             @click:append="showeye = !showeye"
            v-model="password"
         ></v-text-field>
    </v-col> 
        <v-col cols="12">
            <p>{{$t(changeprofilepic)}} </p>
            <v-file-input
            label="profile_picture"
            filled
            prepend-icon="mdi-camera"
            v-model="profile_picture"
        ></v-file-input>
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
            changepassword: 'settings.changepassword',
            changeprofilepic: 'settings.changeprofilepic',
            validate: 'settings.validate',
            clear: 'settings.clear',
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            },

        }
    }
    /*methods: {
    submit(){
      this.axios.patch('users/settings', {email: this.email,username: this.username, password: this.password,})
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