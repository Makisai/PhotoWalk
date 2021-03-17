<template>
  <v-row justify="center">
    <v-expansion-panels popout>
      <v-expansion-panel
        v-for="(item,i) in 8"
        :key="i"
      >
        <v-expansion-panel-header v-text="$t('welcome.step')+' '+(i+1)"> </v-expansion-panel-header>
        <v-expansion-panel-content> 
          <v-card-text>{{descriptionArray[i]}}</v-card-text>
          <v-dialog @click:outside="onDialogClose">
            <template v-slot:activator="{ on, attrs }" >
              <v-img
                :src="'/images/Tutorial'+(i+1)+'.png'"
                @click="dialog = true" v-bind="attrs" v-on="on"
                >
              </v-img>
               </template>
            <v-card>
              <TutorialCarousel v-if="dialog" :start-index="index" ></TutorialCarousel>
            </v-card>
          </v-dialog>
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
  data(){
    return{
      dialog: false,
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