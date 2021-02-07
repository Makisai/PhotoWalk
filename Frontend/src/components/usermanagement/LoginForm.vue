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
      <v-btn v-if="!isLoading" block class="mainGradient" @click="signin">LOGIN</v-btn>
      <v-progress-circular indeterminate v-else></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
import {SET_EMAIL, SET_PROFILEPICTURE, SET_TOKEN, SET_USERNAME} from "@/store/mutations";

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
      isLoading: false,
    };
  },
  methods: {
    signin() {
      this.isLoading = true;
      this.axios.post('users/login', {email: this.email, password: this.password})
        .then((response) => {
          const token = response.data.token;
          const username = response.data.username;
          const email = response.data.email;
          const profilePicture = response.data.profilePicture;
          this.$store.commit(SET_TOKEN, token);
          this.$store.commit(SET_USERNAME, username);
          this.$store.commit(SET_EMAIL, email);
          this.$store.commit(SET_PROFILEPICTURE, profilePicture);
          this.isLoading = false;
          this.$router.push({name: 'Start'});
        })
        .catch((error) => {
          this.error = 'error.login';
          this.isLoading = false;
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