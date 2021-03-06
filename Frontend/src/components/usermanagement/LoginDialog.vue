<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="400px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="mainGradient ma-8">
          {{$t('labels.exploring')}}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="mainGradient">
          <span class="centerspan" v-if="registerForm">{{$t('labels.register')}}</span>
          <span class="centerspan" v-else>{{$t('labels.login')}}</span>
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
              <v-col v-if="!registerForm" cols="12">
                <LoginForm/>
              </v-col>
              <v-col v-if="registerForm" cols="12">
                <RegisterForm/>
              </v-col>
              <v-col class="py-1" cols="12">
                <p class="ma-0" v-if="!registerForm">{{$t('loginDialog.forgotPassword')}}</p>
              </v-col>
              <v-col class="py-1" cols="12">
                <p class="ma-0" v-if="registerForm">{{$t('loginDialog.alreadyRegistered')}} <a @click="showLoginForm">{{$t('labels.login')}}</a> </p>
                <p class="ma-0" v-else>{{$t('loginDialog.notRegistered')}} <a @click="showRegisterForm">{{$t('labels.register')}}</a></p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            {{$t('labels.close')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
export default {
  name: 'LoginDialog',
  components: {LoginForm, RegisterForm},
  data () {
    return{
      dialog: false,
      registerForm: false,
    };
  },
  methods: {
    showRegisterForm(){
      this.registerForm = true;
    },
    showLoginForm(){
      this.registerForm = false;
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
.centerspan{
  width: 100%;
}
</style>
