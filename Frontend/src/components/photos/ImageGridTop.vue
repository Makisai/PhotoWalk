<template>
  <v-row>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg1.png`"
          :image-hover="`images/hamburg1_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg4.png`"
          :image-hover="`images/hamburg4_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg9.png`"
          :image-hover="`images/hamburg9_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg2.png`"
          :image-hover="`images/hamburg2_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg10.png`"
          :image-hover="`images/hamburg10_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg6.png`"
          :image-hover="`images/hamburg6_hover.png`"
      ></grid-hover>
    </v-col>
  </v-row>
</template>

<script>
import GridHover from "@/components/photos/GridHover";
export default {
  name: "ImageGridTop",
  components: {GridHover},
}
</script>

<style scoped>

</style>