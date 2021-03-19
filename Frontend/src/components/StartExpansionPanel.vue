<template>
  <v-row justify="center">
    <v-expansion-panels v-model="panel" focusable>
      <v-expansion-panel>
        <v-expansion-panel-header v-text="$t('welcome.tutorial')" append-icon="mdi-chevron-down">  </v-expansion-panel-header>
        <v-expansion-panel-content> 
            <v-card>
              <TutorialCarousel></TutorialCarousel>
            </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>


<script>
import TutorialCarousel from "../components/photos/TutorialCarousel"
export default {
  name: 'StartExpansionPanel',
  components:{TutorialCarousel},
  props: ['extended'],
  data(){
    return{
      panel: [],
    }
  },
  beforeMount(){
      if(this.extended == true){
        this.panel = [...Array(this.items).keys()].map((k, i) => i);
      }
  },
}
</script>