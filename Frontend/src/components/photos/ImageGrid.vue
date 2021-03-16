<template>
  <v-row>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg1.jpg`"
          :image-hover="`images/gradient.png`"
          :image-normal="`/images/hamburg1.jpg`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg2.jpg`"
          :image-hover="`images/gradient.png`"
          :image-normal="`/images/hamburg2.jpg`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg3.jpg`"
          :image-hover="`images/gradient.png`"
          :image-normal="`/images/hamburg3.jpg`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg4.jpg`"
          :image-hover="`images/gradient.png`"
          :image-normal="`/images/hamburg4.jpg`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg5.jpg`"
          :image-hover="`images/gradient.png`"
          :image-normal="`/images/hamburg5.jpg`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg6.jpg`"
          :image-hover="`images/gradient.png`"
          :image-normal="`/images/hamburg6.jpg`"
      ></grid-hover>
    </v-col>
  </v-row>
</template>

<script>
import GridHover from "@/components/photos/GridHover";
export default {
  name: "ImageGrid",
  components: {GridHover},
  data() {
  }
}
</script>

<style scoped>

</style>