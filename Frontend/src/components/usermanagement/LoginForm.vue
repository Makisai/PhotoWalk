<template>
  <v-row>
    <v-col cols = "12" v-if="error">
      <p class="error">{{$t(error)}}</p>
    </v-col>
    <v-col class="py-2" cols = "12">
      <v-text-field
          filled
          label="Email"
          prepend-inner-icon="mdi-email"
          color="primary"
          v-model="email"
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
          value=""
          class="input-group--focused"
          @click:append="showeye = !showeye"
          v-model="password"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn block class="mainGradient" @click="signin">LOGIN</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "LoginForm",
  data () {
    return{
      dialog: false,
      showeye: false,
      email: '',
      password: '',
      error: '',
      registerForm: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  methods: {
    signin() {
      this.axios.post('users/login', {email: this.email, password: this.password})
          .then((response) => {
            const token = response.data.token;
            this.$store.commit('setToken', token);
            this.$router.push({name: 'Start'});
          })
          .catch((error) => {
            this.error = 'error.login';
            console.log("FEHLER", error);
          })
    },
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