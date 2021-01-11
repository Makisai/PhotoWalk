<template>
  <v-row>
    <v-col class="py-2" cols = "12">
      <v-text-field
          filled
          label="Email"
          prepend-inner-icon="mdi-email"
          color="primary"
          v-model="email"
      ></v-text-field>
    </v-col>
    <v-col class="py-2" cols = "12">
      <v-text-field
          filled
          label="Username"
          prepend-inner-icon="mdi-account"
          color="primary"
          v-model="username"
      ></v-text-field>
    </v-col>
    <v-col class="py-2" cols="12">
      <v-text-field
          :append-icon="showeye ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="showeye ? 'text' : 'password'"
          name="input-pw"
          filled
          label="Password"
          hint="At least 8 characters"
          prepend-inner-icon="mdi-lock"
          class="input-group--focused"
          @click:append="showeye = !showeye"
          v-model="password"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn block class="mainGradient" @click="signup">REGISTER</v-btn>
    </v-col>
    <v-col v-if="registered" cols="12">
      <p>You've sucessfully registerd. Check your E-mail for details!</p>
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
      password2:'',
      registered: false,
      error: '',
      registerForm: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  methods: {
    signup(){
      this.axios.post('users/register', {email: this.email,username: this.username, password: this.password, password2:this.password})
          .then(() => {
            this.registered = true;
          })
          .catch((error) => {
            this.error = 'error.login';
            console.log("FEHLER", error);
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