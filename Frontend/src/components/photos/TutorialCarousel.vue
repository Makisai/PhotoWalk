<template>
  <v-container fluid >
    <v-carousel hide-delimiters height="90%" v-model="currentIndex">
      <v-carousel-item
          v-for="(item,i) in 8"
          :key="i">
					<v-card-text>{{descriptionArray[i]}}<!---Description Text here---></v-card-text>
        <v-img :src="'/images/Tutorial'+(i+1)+'.png'"></v-img>
      </v-carousel-item>
    </v-carousel>
    <v-card-actions style="max-height: 50px">
      
    </v-card-actions>
  </v-container>
</template>

<script>


export default {
  name: 'TutorialCarousel',
  props: ['startIndex'],
  data() {
    return {
      photosRearranged: [],
      currentIndex: 0,
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

  methods: {
   
  },
}
</script>