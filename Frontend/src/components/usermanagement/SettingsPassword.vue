<template>
  <div>
    <p>{{$t('settings.changePassword')}} </p>
    <v-col class="py-2" cols="8">
      <v-text-field
          :append-icon="showeye0 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="showeye0 ? 'text' : 'password'"
          name="input-old-pw"
          filled
          prepend-inner-icon="mdi-lock"
          value=""
          class="input-group--focused"
          @click:append="showeye0 = !showeye0"
          v-model="oldPassword"
      ></v-text-field>
    </v-col>
    <v-col class="py-2" cols="8">
      <v-text-field
          :append-icon="showeye1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="showeye1 ? 'text' : 'password'"
          name="input-new-pw"
          filled
          prepend-inner-icon="mdi-lock"
          value=""
          class="input-group--focused"
          @click:append="showeye1 = !showeye1"
          v-model="newPassword"
      ></v-text-field>
    </v-col>
    <v-col cols="8">
     <v-btn @click="updatePassword">{{$t('labels.submit')}}</v-btn>
    </v-col>
    <p v-if="updatedPassword">{{$t('settings.passwordSuccess')}} </p>
  </div>
</template>

<script>

export default {
  name: "SettingsPassword",
  data () {
    return{
      showeye0: false,
      showeye1: false,
      oldPassword: '',
      newPassword: '',
      updatedPassword: false,
      error: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  methods: {
    updatePassword(){
      this.axios.put(`users/updatePassword`,{oldPassword: this.oldPassword, newPassword: this.newPassword}, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
      }).then(() => {
        this.updatedPassword = true;
      }).catch((error) => {
        this.error = 'error.password';
        console.log("FEHLER", error);
      })
    }
  }
}
</script>