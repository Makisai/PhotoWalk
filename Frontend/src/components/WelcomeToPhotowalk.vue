<template>
  <v-container>
    <div v-if="!lastPhotowalk">
    <p> {{$t('welcome.welcomePhrase')}} </p>
    </div>
    <div v-if="lastPhotowalk">
      <p>{{$t('welcome.lastPhotowalk')}} </p>
    </div>
  </v-container>
</template>

<script>
import {SET_PHOTOS_USER} from "../store/mutations";
export default {
  name: 'WelcomeToPhotowalk',
  beforeMount(){
       this.axios.get(`photowalks/last`,{
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then(response => {
            if(response.status == 204){
              this.lastPhotowalk = false;
            }
            if(response.status == 200){
              this.lastPhotowalk = true;
              this.$store.commit(SET_PHOTOS_USER,response.data);
            }
          })
  },
  data(){
    return{
      lastPhotowalk: false,
    }
  },
}
</script>