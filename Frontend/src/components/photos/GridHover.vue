<template>
  <v-img
      :src="imageSrc"
      @mouseenter="imageSrc = imageHover"
      @mouseleave="imageSrc = imageNormal"
      :lazy-src="`images/gradient.png`"
      class="rounded-lg elevation-1 grid-image"
      aspect-ratio="1">
  </v-img>
</template>

<script>
export default {
  name: "GridHover",
  props:{
    image:{
      type: String,
      required: true,
    },
    imageHover:{
      type: String,
      required: true,
    },
    imageNormal:{
      type: String,
      required: true,
    }
  },
  data(){
    return{
      imageSrc: this.imageNormal
    }
}
}
</script>

<style scoped>

</style>