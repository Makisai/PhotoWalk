<template>
<!--vuetify div-->
  <v-container>
    <p>WILLKOMMEN NACH LOGIN/REGISTRIERUNG</p>
    <MasterButton v-bind:title="'Back'" v-bind:target="'LandingPage'"/>
  </v-container>
</template>

<script>
import MasterButton from "../components/MasterButton";
export default {
  name: 'Start',
  components: {MasterButton},
}
</script>