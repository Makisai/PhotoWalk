<template>
  <v-row>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg3.png`"
          :image-hover="`images/hamburg3_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg5.png`"
          :image-hover="`images/hamburg5_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg8.png`"
          :image-hover="`images/hamburg8_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg11.png`"
          :image-hover="`images/hamburg11_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg12.png`"
          :image-hover="`images/hamburg12_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg7.png`"
          :image-hover="`images/hamburg7_hover.png`"
      ></grid-hover>
    </v-col>
  </v-row>
</template>

<script>
import GridHover from "@/components/photos/GridHover";
export default {
  name: "ImageGridBottom",
  components: {GridHover},
}
</script>

<style scoped>

</style>