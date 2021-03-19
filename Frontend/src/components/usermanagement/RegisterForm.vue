<template>
  <v-row>
     <v-col v-if="usernameError" cols="12">
      <p class="error">{{$t('error.usernameAssigned')}}</p>
    </v-col>
     <v-col v-if="emailError" cols="12">
      <p class ="error">{{$t('error.emailAssigned')}}</p>
    </v-col>
    <v-col v-if="incompleteError" cols="12">
      <p class ="error">{{$t('error.incompleteError')}}</p>
    </v-col>
    <v-col class="py-2" cols = "12">
      <v-text-field
          :rules="[rulesEmail.email,rulesEmail.required]"
          filled
          label="Email"
          prepend-inner-icon="mdi-email"
          color="primary"
          v-model="email"
      ></v-text-field>
    </v-col>
    <v-col class="py-2" cols = "12">
      <v-text-field
          :rules="[rulesUsername.max,rulesUsername.required]"
          filled
          :label="$t('labels.username')"
          prepend-inner-icon="mdi-account"
          color="primary"
          v-model="username"
      ></v-text-field>
    </v-col>
    <v-col class="py-2" cols="12">
      <v-text-field
          :append-icon="showeye ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rulesPassword.required, rulesPassword.min]"
          :type="showeye ? 'text' : 'password'"
          name="input-pw"
          filled
          :label="$t('labels.password')"
          hint="At least 8 characters"
          prepend-inner-icon="mdi-lock"
          class="input-group--focused"
          @click:append="showeye = !showeye"
          v-model="password"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn block class="mainGradient" @click="signup">{{$t('labels.register')}}</v-btn>
    </v-col>
    <v-col v-if="registered" cols="12">
      <p>{{$t('success.register')}}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RegisterForm",
  data () {
    return{
      dialog: false,
      showeye: false,
      username:'',
      email: '',
      password: '',
      registered: false,
      error: '',
      registerForm: false,
      usernameError: false,
      emailError: false,
      incompleteError: false,
      rulesPassword: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      rulesUsername: {
        required: value => !!value || 'Required.',
        max: v => v.length <=18 || 'Max 18 characters'
      },
      rulesEmail:{
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    };
  },
  methods: {
    signup(){
      this.axios.post('users/register', {email: this.email.toLowerCase(),username: this.username, password: this.password})
          .then((response) => {
            if(response.status == 201){
              this.registered = true;
              this.usernameError = false;
              this.emailError = false;
              this.incompleteError = false;
            } 
          })
          .catch((error) => {  
            if(error.response && error.response.status == 500){
              this.incompleteError = true;
              this.usernameError = false;
              this.emailError = false;
              this.registered = false;
            }
            if(error.response && error.response.status == 409){
              this.emailError = true;
              this.usernameError = false;
              this.incompleteError = false;
              this.registered = false;
            }
            if(error.response && error.response.status == 400){
                this.usernameError = true;
                this.emailError = false;
                this.incompleteError =false;
                this.registered = false;
            }
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.mainGradient{
  background: linear-gradient(90.29deg, #F06292 0.19%, #00BCD4 99.75%);
  border-radius: 4px;
  color: white;
}
</style>