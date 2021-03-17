<template>
<!--vuetify div-->
  <v-container>
    <div v-if="!lastPhotowalk">
      <p> {{$t('welcome.welcomePhrase')}} </p>
      <WelcomeToPhotowalk/>
    </div>
    <div v-if="lastPhotowalk">
      <p>{{$t('welcome.lastPhotowalk')}} </p>
        <div v-if="imagesLoaded">
          <LastPhotowalkGrid/>
        </div>
    </div>
  </v-container>
</template>

<script>
import {SET_PHOTOS_LAST,SET_PHOTOWALK} from "@/store/mutations"
import WelcomeToPhotowalk from "../components/WelcomeToPhotowalk"
import LastPhotowalkGrid from "../components/photos/LastPhotowalkGrid"

export default {
  name: 'Start',
  components: {WelcomeToPhotowalk,LastPhotowalkGrid},
   beforeMount(){
    this.axios.get(`photowalks/last`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      if(response.status === 204){
        this.lastPhotowalk = false;
        console.log("error");
      }
      if(response.status === 200){
        this.$store.commit(SET_PHOTOWALK,response.data);
        this.lastPhotowalk = true;
      }
      if(this.lastPhotowalk === true) {
        this.axios.get(`photos/lastPhotowalk`,{
              headers: {
                'Authorization': `Bearer ${this.$store.state.user.token}`
              },
            },{id: this.$store.state.detail.photowalk.id}
        ).then(response => {
          this.$store.commit(SET_PHOTOS_LAST,response.data);
          this.imagesLoaded = true;
        }).catch((error) => {
          if(error.status === 500) {
            console.log("Error something went wrong")
            return response.status;
          }
        })
      }
    });
  } ,
    data(){
    return{
      imagesLoaded: false,
      lastPhotowalk: false,
    }
  },
}
</script>