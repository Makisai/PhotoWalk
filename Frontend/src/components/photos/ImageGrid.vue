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
          :image="`/images/hamburg2.png`"
          :image-hover="`images/hamburg2_hover.png`"
      ></grid-hover>
    </v-col>
    <v-col class="d-flex child-flex" cols="2">
      <grid-hover
          :image="`/images/hamburg3.png`"
          :image-hover="`images/hamburg3_hover.png`"
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
          :image="`/images/hamburg5.png`"
          :image-hover="`images/hamburg5_hover.png`"
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
  name: "ImageGrid",
  components: {GridHover},
}
</script>

<style scoped>

</style>