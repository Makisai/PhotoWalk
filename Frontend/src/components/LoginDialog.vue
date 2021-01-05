<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="400px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="button ma-8">
          START EXPLORING
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span>LOGIN</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols = "12" sm = "6">
                <v-btn block color="blue">
                  <v-icon color="white">mdi-facebook</v-icon>
                </v-btn>
              </v-col>
              <v-col cols = "12 " sm = "6" >
                <v-btn block>
                  <v-icon>mdi-google</v-icon>
                </v-btn>
              </v-col>
              <v-col cols = "12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols = "12" v-if="error">
                <p class="error">{{$t(error)}}</p>
              </v-col>
              <v-col cols = "12">
                <v-text-field
                    filled
                    label="Email"
                    prepend-inner-icon="mdi-email"
                    color="primary"
                    v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
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
                <v-btn block class="button" @click="signin">LOGIN</v-btn>
              </v-col>
              <v-col cols="12">
                <p>Forgot password?</p>
              </v-col>
              <v-col cols="12">
                <p>No account yet? <a @click="showRegisterForm">Register</a></p>
              </v-col>
              <v-col v-if="registerForm" cols="12">
                <RegisterForm/>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import RegisterForm from "./RegisterForm";
export default {
  name: 'LoginDialog',
  components: {RegisterForm},
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
    showRegisterForm(){
      this.registerForm = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.button{
  background: linear-gradient(90.29deg, #F06292 0.19%, #00BCD4 99.75%);
  border-radius: 4px;
  color: white;
}
</style>
