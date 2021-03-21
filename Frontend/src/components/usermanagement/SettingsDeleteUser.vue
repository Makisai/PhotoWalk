<template>
  <div>
    <p>{{$t('settings.deleteQuestion')}} </p>
    <v-col v-if="deleteUserError" cols="12">
      <p class ="errorMessage">{{$t('error.deleteUser')}}</p>
    </v-col>
    <v-col v-if="deletePicturesError" cols="12">
      <p class ="errorMessage">{{$t('error.deleteAllPictures')}}</p>
    </v-col>
    <v-dialog
      v-model="dialog"
      width="500"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="secondary"
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
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
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
  </div> 
</template>

<script>
import {CLEAR_USER_DATA} from "@/store/actions";
export default {
    name: "SettingsDeleteUser",
    data(){
      return{
         dialog: false,
         deleteUserError: false,
         deltedPicturesError: false,
         feedbackdeletedAllPictures: 'success.deleteAllPictures',
      }
    },
    methods: {
      deleteUserComplete(){
        this.axios.delete(`photos/deleteUserAllPhotos/`,{
          headers: {
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then((response)=> {
          if(response && response.status == 200){
            this.feedback = 'success.deleteAllPictures';
            this.$toast.success(this.feedback,{
              duration: 4000,
              position: 'top',
              color: 'green'
            });
            this.dialog= false;
            this.deletedPhotos = true;

          }
        })
          .catch((error) => { 
            if(error.response && error.response.status == 500){
              this.dialog = false;
              this.deletedPhotosError = true;
              this.deletedPhotos = false;
            } 
        }),
        this.axios.delete(`users/deleteUser`, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then((response) => {
            if(response){
              this.feedback = 'success.deleteUsers';
              this.$toast.success(this.feedback,{
                duration: 4000,
                position: 'top',
                color: 'green',
              });
              this.$store.dispatch(CLEAR_USER_DATA);
              this.$router.push({name: 'LandingPage'});
            }
            
        }).catch((error) => {
            if(error.response && error.response.status ==500){
              this.deleteUserError = true;
            }
        })
      }
    }
}
</script>

<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>