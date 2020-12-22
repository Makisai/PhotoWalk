<template>
  <v-app>
    <v-app-bar class="gradient" app>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <Logout/>
    </v-app-bar>

    <v-main>
      <router-view/>
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
import Logout from "../components/Logout";
export default {
  name: 'Layout',
  components: {Logout},
}
</script>

<style lang="scss" scoped>
.gradient{
  background: linear-gradient(90deg, #00BCD4 0%, #E91E63 100%);
  color: white;
}
</style>