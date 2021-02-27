<template>
  <v-row>
    <v-col class="d-flex child-flex" cols="4">
      <v-img
          :src="`/images/hamburg1.jpg`"
          :lazy-src="`images/gradient.png`"
          aspect-ratio="1"
          class="rounded-lg elevation-1 grid-image"
          @mouseover="mouseOver = true"
          @mouseout="mouseOver = false"
      >
        <div v-if="mouseOver" justify-content="center">Test</div>
      </v-img>
    </v-col>
    <v-col class="d-flex child-flex" cols="4">
      <v-img
          :src="`/images/hamburg2.jpg`"
          :lazy-src="`images/gradient.png`"
          aspect-ratio="1"
          class="rounded-lg elevation-1"
      >
      </v-img>
    </v-col><v-col class="d-flex child-flex" cols="4">
    <v-img
        :src="`/images/hamburg3.jpg`"
        :lazy-src="`images/gradient.png`"
        aspect-ratio="1"
        class="rounded-lg elevation-1"
    >
    </v-img>
  </v-col><v-col class="d-flex child-flex" cols="4">
    <v-img
        :src="`/images/hamburg4.jpg`"
        :lazy-src="`images/gradient.png`"
        aspect-ratio="1"
        class="rounded-lg elevation-1"
    >
    </v-img>
  </v-col><v-col class="d-flex child-flex" cols="4">
    <v-img
        :src="`/images/hamburg5.jpg`"
        :lazy-src="`images/gradient.png`"
        aspect-ratio="1"
        class="rounded-lg elevation-1"
    >
    </v-img>
  </v-col><v-col class="d-flex child-flex" cols="4">
    <v-img
        :src="`/images/hamburg6.jpg`"
        :lazy-src="`images/gradient.png`"
        aspect-ratio="1"
        class="rounded-lg elevation-1"
    >
    </v-img>
  </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ImageGrid",
  data() {
    return {
      mouseOver: false,
    }
  }
}
</script>

<style scoped>
.grid-image:hover {
  filter: grayscale(100%);
}
</style>