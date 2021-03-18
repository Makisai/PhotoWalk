<template>
  <v-row justify="center">
    <v-expansion-panels v-model="panel" focusable>
      <v-expansion-panel
      >
        <v-expansion-panel-header v-text="$t('welcome.tutorial')"> </v-expansion-panel-header>
        <v-expansion-panel-content> 
            <v-card>
              <TutorialCarousel></TutorialCarousel>
               <v-card-text ><!---Description Text here---></v-card-text>
            </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>


<script>
import TutorialCarousel from "../components/photos/TutorialCarousel"
export default {
  name: 'WelcomeToPhotowalk',
  components:{TutorialCarousel},
  props: ['extended'],
  data(){
    return{
      panel: [],
    }
  },
  beforeMount(){
      if(this.extended){
        this.panel = [...Array(this.items).keys()].map((k, i) => i);
      }
    
   
  },
  computed:{
    descriptionArray(){
      let description = [];
      description.push("Entdecke Photowalk");
      description.push("Hier ist der zweite Schritt");
      description.push("Und der dritte");
      description.push("Die Hälfte ist geschafft");
      description.push("Noch ein kleines bisschen");
      description.push("Sind das nicht 3 wundervolle Walks?");
      description.push("Gleich geschafft");
      description.push("Tutorial bestanden :)");
      return description
    }
  },
}
</script>