<template>
  <v-card @click="goToDetail(walkNumber)">
    <v-img v-if="hasDonePhotowalk(walkNumber)"
           :src="imageDone"
           :lazy-src="`images/gradient.png`"
           class = "rounded-lg">
    </v-img>
    <v-img v-else
           :src="imageNotDone"
           :lazy-src="`images/gradient.png`"
           class = "rounded-lg">
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
    imageNotDone:{
      type: String,
      required: true,
    },

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

</style>