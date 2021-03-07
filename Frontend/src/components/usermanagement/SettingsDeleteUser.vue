<template>
  <div>
      <p>{{$t('settings.deleteQuestion')}} </p>
     <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
         {{$t('settings.deleteAccount')}}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
         {{$t('settings.deleteSure')}}
        </v-card-title>

        <v-card-text>
          {{$t('settings.deleteHint')}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="deleteUserComplete"
          >
            {{$t('settings.deleteYes')}}
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            {{$t('settings.deleteNo')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---TODO hier stattdessen ein Toast einpflegen -->
    <p v-if="deletedUser">{{$t('settings.deleteUserSuccess')}}</p>
  </div> 
</template>

<script>
import {CLEAR_USER_DATA} from "@/store/actions";
export default {
    name: "SettingsDeleteUser",
    data(){
      return{
         dialog: false,
         deletedUser: false
      }
    },
    methods: {
      deleteUserComplete(){
        this.axios.delete(`photos/deleteUserAllPhotos/`,{
          headers: {
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then(()=> {
          console.log("Alle Photos erfolgreich geloescht")
        })
          .catch((error) => { 
          this.dialog = false,
          this.error = 'error.deleteUserAllPhotos';
          console.log("FEHLER", error);

        }),
        this.axios.delete(`users/deleteUser`, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then(() => {
          this.deletedUser = true;
          this.$store.dispatch(CLEAR_USER_DATA);
          this.$router.push({name: 'LandingPage'})
        }).catch((error) => {
          this.error = 'error.deleteUser';
          console.log("FEHLER", error);
        })
      }
    }
}
</script>