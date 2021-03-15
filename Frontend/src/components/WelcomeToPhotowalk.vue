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
import {SET_CURRENT_ID} from "../store/mutations";
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
            }
            if(response.status == 200){
              this.lastPhotowalk = true;
              this.$store.commit(SET_CURRENT_ID,response.data.id);
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