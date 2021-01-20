<template>
  <v-app>
    <v-app-bar class="gradient" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white">
      </v-app-bar-nav-icon>
      <v-toolbar-title>Photowalk</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <Navigation-drawer :drawer="drawer"/>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer class="gradient">
      <v-row justify="center" no-gutters>
        <v-col cols="6">
          <LocaleChange/>
        </v-col>
        <v-col cols="6">
          <Impressum/> — <DGSVO/> — Photowalk
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import NavigationDrawer from "../components/navigation/NavigationDrawer";
import LocaleChange from "../components/LocaleChange";
import Impressum from "@/components/legal/Impressum";
import DGSVO from "@/components/legal/DGSVO";
export default {
  name: 'Layout',
  components: {DGSVO, Impressum, LocaleChange, NavigationDrawer},
  data(){
    return {
      drawer:false,
    }
}
}
</script>

<style lang="scss" scoped>
.gradient{
  background: linear-gradient(90deg, #00BCD4 0%, #E91E63 100%);
  color: white;
}
</style>