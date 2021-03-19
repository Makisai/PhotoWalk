<template>
  <v-row justify="center">
    <v-expansion-panels v-model="panel" multiple focusable>
      <v-expansion-panel>
        <v-expansion-panel-header>{{$t('welcome.tutorial')}}</v-expansion-panel-header>
        <v-expansion-panel-content> 
          <TutorialCarousel/>
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
    if(this.extended){
      this.panel = [0];
    }
  },
}
</script>