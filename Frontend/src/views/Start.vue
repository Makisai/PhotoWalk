<template>
<!--vuetify div-->
  <v-container>
    <div v-if="!lastPhotowalk">
      <p> {{$t('welcome.welcomePhrase')}} </p>
      <StartExpansionPanel :extended="true"></StartExpansionPanel>
      <ToWalksOverviewButton/>
    </div>
    <div v-if="lastPhotowalk">
      <p>{{$t('welcome.lastPhotowalk')}} </p>
        <div v-if="imagesLoaded">
          <p>{{this.$store.state.detail.photowalk.name}}</p>
          <p>{{this.$store.state.detail.photowalk.region}}</p>
          <LastPhotowalkGrid/>
          <StartExpansionPanel :extended="false"></StartExpansionPanel>
           <ToWalksOverviewButton/>
        </div>   
    </div>
  </v-container>
</template>

<script>
import {SET_PHOTOS_LAST,SET_PHOTOWALK} from "@/store/mutations"
import StartExpansionPanel from "../components/StartExpansionPanel"
import LastPhotowalkGrid from "../components/photos/LastPhotowalkGrid"
import ToWalksOverviewButton from "../components/navigation/ToWalksOverviewButton"

export default {
  name: 'Start',
  data(){
    return{
      imagesLoaded: false,
      lastPhotowalk: false,
    }
  },
  components: {StartExpansionPanel,LastPhotowalkGrid,ToWalksOverviewButton},
   beforeMount(){
    this.axios.get(`photowalks/last`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      if(response.status === 204){
        this.lastPhotowalk = false;
      }
      if(response.status === 200){
        this.$store.commit(SET_PHOTOWALK,response.data);
        this.lastPhotowalk = true;
      }
      if(this.lastPhotowalk === true) {
        this.axios.get(`photos/photowalk/${response.data.id}`,{
              headers: {
                'Authorization': `Bearer ${this.$store.state.user.token}`
              },
            },
        ).then(response => {
          this.$store.commit(SET_PHOTOS_LAST,response.data);
          this.imagesLoaded = true;
        }).catch((error) => {
          if(error.status === 500) {
            return response.status;
          }
        }).catch(() => { this.lastPhotowalk = false; });
      }
    });
  } ,
}
</script>