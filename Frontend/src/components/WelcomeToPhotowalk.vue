<template>
  <v-container>
    <div v-if="!lastPhotowalk">
    <p> {{$t('welcome.welcomePhrase')}} </p>
    </div>
    <div v-if="lastPhotowalk">
      <p>{{$t('welcome.lastPhotowalk')}} </p>
      <LastPhotowalkGrid/>
    </div>
  </v-container>
</template>

<script>
import {SET_PHOTOWALK} from "../store/mutations";
import LastPhotowalkGrid from "../components/photos/LastPhotowalkGrid"
export default {
  name: 'WelcomeToPhotowalk',
  components: {LastPhotowalkGrid},
  beforeMount(){
       this.axios.get(`photowalks/last`,{
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then(response => {
            if(response.status == 204){
              this.lastPhotowalk = false;
              console.log("error");
            }
            if(response.status == 200){
              this.lastPhotowalk = true;
              this.$store.commit(SET_PHOTOWALK,response.data);
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