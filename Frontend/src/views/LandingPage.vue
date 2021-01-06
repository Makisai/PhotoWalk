<template>
  <v-app id="inspire">
    <v-app-bar app class="gradient">
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <p>LANDING PAGE</p>
      <NavigationButton v-bind:title="'Start'" v-bind:target="'Start'"/>
      <v-spacer></v-spacer>
      <LoginDialog/>
    </v-main>
    <v-footer class="gradient">
      <v-row justify="center" no-gutters>
        <v-col cols="12">
          {{ new Date().getFullYear() }} — Photowalk
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import NavigationButton from "../components/NavigationButton";
import LoginDialog from "../components/usermanagement/LoginDialog";
export default {
  name: 'LandingPage',
  components: {LoginDialog, NavigationButton},
}
</script>

<style lang="scss" scoped>
.gradient{
  background: linear-gradient(90deg, #00BCD4 0%, #E91E63 100%);
  color: white;
}
</style>