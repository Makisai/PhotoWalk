<template>
  <v-img
      :src="imageSrc"
      @mouseenter="imageSrc = imageHover"
      @mouseleave="imageSrc = image"
      :lazy-src="`images/gradient.png`"
      class="rounded-lg elevation-2 grid-image"
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
    }
  },
  data(){
    return{
      imageSrc: this.image
    }
}
}
</script>

<style scoped>

</style>