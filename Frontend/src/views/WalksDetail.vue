<template>
  <v-main>
    <v-row>
      <v-col cols="12" md="6">
        <PhotowalkMap_Walk1/>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import PhotowalkMap_Walk1 from "@/components/PhotowalkMap_Walk1";
export default {
  name: 'WalksDetail',
  components: {PhotowalkMap_Walk1},
}
</script>