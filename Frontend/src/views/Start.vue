<template>
<!--vuetify div-->
  <v-container>
    <p>WILLKOMMEN NACH LOGIN/REGISTRIERUNG</p>
    <NavigationButton v-bind:title="'Back'" v-bind:target="'LandingPage'"/>
  </v-container>
</template>

<script>
import NavigationButton from "../components/NavigationButton";
export default {
  name: 'Start',
  components: {NavigationButton},
}
</script>