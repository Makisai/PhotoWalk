<template>
  <v-row>
    <v-col class="py-2" cols="8">
      <p>{{$t(oldpassword)}} </p>
        <v-text-field
          :append-icon="showeye ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showeye ? 'text' : 'password'"
          name="oldPassword"
          filled
          label="Password"
          hint="At least 8 characters"
          prepend-inner-icon="mdi-lock"
          class="input-group--focused"
          @click:append="showeye = !showeye"
          v-model="password"
        ></v-text-field>
      </v-col>
      <v-col class="py-2" cols="8">
        <p>{{$t(newpassword)}} </p>
        <v-text-field
          :append-icon="showeye ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="showeye ? 'text' : 'password'"
          name="mewPassword"
          filled
          label="Password"
          hint="At least 8 characters"
          prepend-inner-icon="mdi-lock"
          class="input-group--focused"
          @click:append="showeye = !showeye"
          v-model="password"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn
          @click="validate"
         >{{$t(validate)}}
        </v-btn>
      </v-col>
  </v-row>
</template>

<script>
export default {
    name: "SettingsForm2",
    data () {
        return{
            newpassword: 'settings.newpassword',
            oldpassword: 'settings.oldpassword',
            validate: 'labels.submit',
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            },

        }
    }
    /*methods: {
    updatePassword() {
      this.axios.put('users/updatePassword', {oldPassword: this.oldPassword, newPassword: this.newPassword})
          .then((response) => {
            
          })
          .catch((error) => {
            this.error = 'error.password';
            console.log("FEHLER", error);
          })
    },
  } */

}
</script>