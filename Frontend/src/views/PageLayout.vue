<template>
  <v-app>
    <v-app-bar class="gradient" app>
      <v-app-bar-nav-icon class="mr-0" @click.stop="drawer = !drawer" color="white"/>
      <v-toolbar-title class="title mr-auto">Photowalk</v-toolbar-title>
      <v-img
          class="huhu"
          max-height="50px"
          max-width="50px"
          :src="'/photowalk_logo_white.png'"
          @click="navigateToStart"
      />
      <LocaleChange class="mr-0"/>
    </v-app-bar>
    <Navigation-drawer/>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer class="gradient">
      <v-row justify="center" no-gutters>
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
import {SET_DRAWER} from "@/store/mutations";
export default {
  name: 'Layout',
  components: {DGSVO, Impressum, LocaleChange, NavigationDrawer},
  computed:{
    drawer:{
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit(SET_DRAWER,value);
      }
    }
  },
  methods:{
    navigateToStart(){
      this.$router.push({name:'Start'})
    }
  }
}
</script>

<style lang="scss" scoped>

.gradient{
  background: linear-gradient(90deg, #00BCD4 0%, #E91E63 100%);
  color: white;
}
.huhu{
  display: block;
}
</style>