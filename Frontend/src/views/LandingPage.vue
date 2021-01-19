<template>
  <v-app id="inspire">
    <v-app-bar
        app class="gradient"
        shrink-on-scroll
        prominent
    >
      <v-spacer></v-spacer>
      <v-toolbar-title>PhotoWalk</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
<!--      <NavigationButton v-bind:title="'Start'" v-bind:target="'Start'"/>-->
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" md="6">
            <PhotowalkMap/>
        </v-col>
        <v-col cols="12" md="6">
          <div class="px-2">
          <ImageGrid/>
          </div>
          <LoginDialog/>
        </v-col>
      </v-row>
    </v-main>
    <v-footer class="gradient">
      <v-row justify="center" no-gutters>
        <v-col cols="12">
          <Impressum/>  — <DGSVO/>— Photowalk
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import LoginDialog from "../components/usermanagement/LoginDialog";
import PhotowalkMap from "@/components/PhotowalkMap";
import ImageGrid from "@/components/ImageGrid";
import Impressum from "@/components/legal/Impressum";
import DGSVO from "@/components/legal/DGSVO";
export default {
  name: 'LandingPage',
  components: {DGSVO, Impressum, ImageGrid, PhotowalkMap, LoginDialog},
  data () {
    return{
      impressum : false,
    };
},
}
</script>

<style lang="scss" scoped>
.gradient{
  background: linear-gradient(90deg, #00BCD4 0%, #E91E63 100%);
  color: white;
}

.headline{
  justify-content: center;
}
</style>