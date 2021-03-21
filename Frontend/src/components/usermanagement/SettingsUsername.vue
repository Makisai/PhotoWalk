<template>
  <div>
    <v-divider class="my-10"/>
    <v-col v-if="usernameAssignedError" cols="12">
      <p class ="errorMessage">{{$t('error.usernameAssigned')}}</p>
    </v-col>
    <v-col v-if="internalError" cols="12">
      <p class ="errorMessage">{{$t('error.internalError')}}</p>
    </v-col>
    <v-col v-if="sameUsernameError" cols="12">
      <p class ="errorMessage">{{$t('error.sameUsername')}}</p>
    </v-col>
    <v-col v-if="incompleteError" cols="12">
      <p class ="errorMessage">{{$t('error.incompleteError')}}</p>
    </v-col>
    <v-col v-if="updated" cols="12">
      <p class="successMessage">{{$t('success.usernameUpdated')}}</p>
    </v-col>
    <v-col cols = "12" md="6">
      <h6 class="text-h6"> {{$t('settings.changeUsername')}} </h6>
      <p class="currentUsername"> {{$t('settings.currentUsername') + $store.state.user.username}} </p>
    </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :rules="[rules.required,rules.max]"
          filled
          :label="$t('labels.username')"
          prepend-inner-icon="mdi-account"
          color="primary"
          v-model="newUsername"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-btn
          @click="changeUsername"
          class="submitButton"
          color="primary"
          >{{$t('labels.submit')}}
        </v-btn>
      </v-col>
  </div>
</template>

<script>
import {SET_USERNAME} from "../../store/mutations";
export default {
    name:"SettingsUsername",
    data(){ 
      return{
        updatedUsername: false,
        newUsername: '',
        usernameAssignedError: false,
        incompleteError: false,
        internalError: false,
        updated: false,
        sameUsernameError: false,
        rules: {
          required: value => !!value || 'Required.',
          max: value => value.length <=18 || 'Max 18 characters'
        },
      }
    },
    methods: {
    changeUsername(){
      this.axios.patch(`users/updateUsername`,{newUsername: this.newUsername}, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
      }).then((response) => {
          if(response.status == 200){
            this.updated = true;
            this.internalError = false;
            this.incompleteError = false;
            this.usernameAssignedError = false;
            this.sameUsernameError = false;
            this.$store.commit(SET_USERNAME, this.newUsername);
            }  
      }).catch((error) => {
          if(error.response && error.response.status == 404){
            this.incompleteError = true;
            this.usernameAssignedError = false;
            this.internalError = false;
            this.updated = false;
            this.sameUsernameError = false;
            }
          if(error.response && error.response.status == 500){
            this.internalError = true;
            this.usernameAssignedError = false;
            this.incompleteError = false;
            this.updated = false;
            this.sameUsernameError = false;
            }
          if(error.response && error.response.status == 409){
            this.usernameAssignedError = true;
            this.internalError = false;
            this.incompleteError = false;
            this.updated = false;
            this.sameUsernameError = false;
            }
           if(error.response && error.response.status == 430){
            this.sameUsernameError = true;
            this.usernameAssignedError = false;
            this.internalError = false;
            this.incompleteError = false;
            this.updated = false;
            }
      })
    }
  }
}
</script>

<style scoped>
.currentUsername{
  font-size: 18px;
  padding-top: 3%;
}
</style>