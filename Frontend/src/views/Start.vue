<template>
<!--vuetify div-->
  <v-container>
    <p>WILLKOMMEN NACH LOGIN/REGISTRIERUNG</p>
    <NavigationButton v-bind:title="'Back'" v-bind:target="'LandingPage'"/>
    <PhotoUpload/>
  </v-container>
</template>

<script>
import NavigationButton from "../components/navigation/NavigationButton";
import PhotoUpload from "../components/PhotoUpload";
export default {
  name: 'Start',
  components: {PhotoUpload, NavigationButton},
}
</script>