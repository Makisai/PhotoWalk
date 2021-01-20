<template>
  <v-main>
    <v-row>
      <v-col cols="12" md="6">
        <PhotowalkMap/>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import PhotowalkMap from "@/components/PhotowalkMap";
export default {
  name: 'WalksDetail',
  components: {PhotowalkMap},
}
</script>