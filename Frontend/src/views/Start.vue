<template>
<!--vuetify div-->
  <v-container>
    <WelcomeToPhotowalk/>
  </v-container>
</template>

<script>
import WelcomeToPhotowalk from "../components/WelcomeToPhotowalk"
export default {
  name: 'Start',
  components: {WelcomeToPhotowalk},
}
</script>