<template>
  <v-card @click="goToDetail(walkNumber)" class="mapCard" elevation="4">
    <v-img v-if="hasDonePhotowalk(walkNumber)"
           :src="doneSrc"
           @mouseenter="doneSrc = imageDoneHover"
           @mouseleave="doneSrc = imageDone"
           :lazy-src="`images/gradient.png`"
           class = "rounded-lg" contain>
    </v-img>
    <v-img v-else
           :src="notDoneSrc"
           @mouseenter="notDoneSrc = imageNotDoneHover"
           @mouseleave="notDoneSrc = imageNotDone"
           :lazy-src="`images/gradient.png`"
           class = "rounded-lg" contain>
    </v-img>
  </v-card>
</template>

<script>
import {SET_CURRENT_ID} from "@/store/mutations";

export default {
  name: "ImageHover",
  props:{
    walkNumber:{
      type: Number,
      required: true,
    },
    editedPhotowalks:{
      type: Array,
      required: true,
    },
    imageDone:{
      type: String,
      required: true,
    },
    imageDoneHover:{
      type: String,
      required: true,
    },
    imageNotDone:{
      type: String,
      required: true,
    },
    imageNotDoneHover:{
      type: String,
      required:true,
    },
  },
  data(){
    return{
      doneSrc: this.imageDone,
      notDoneSrc: this.imageNotDone,
    }
  },
  methods:{
    goToDetail(walkNumber){
      this.$store.commit(SET_CURRENT_ID,walkNumber);
      this.$router.push( {name: 'WalksDetail'});
    },
    hasDonePhotowalk(photowalkId){
      return this.editedPhotowalks !== undefined && this.editedPhotowalks.includes(photowalkId);
    }
  }
}
</script>

<style scoped>
.mapCard{
  max-width: 380px;
}
</style>