<template>
<!--vuetify div-->
  <v-container>
    <p>WILLKOMMEN NACH LOGIN/REGISTRIERUNG</p>
    <NavigationButton v-bind:title="'Back'" v-bind:target="'LandingPage'"/>
    <PhotoUpload/>
    <PhotowalkMap_debug></PhotowalkMap_debug>
  </v-container>
</template>

<script>
import NavigationButton from "../components/navigation/NavigationButton";
import PhotoUpload from "../components/PhotoUpload";
import PhotowalkMap_debug from "../components/PhotowalkMap_debug";
export default {
  name: 'Start',
  components: {PhotowalkMap_debug, PhotoUpload, NavigationButton},
}
</script>