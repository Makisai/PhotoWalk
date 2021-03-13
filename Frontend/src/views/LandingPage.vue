<template>
  <v-app id="photowalkapp">
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
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" md="6">
            <v-card class="container card ma-4">
              <v-img
                  :src="`/images/map_landingpage_placeholder.JPG`"
                  :lazy-src="`images/gradient.png`"
                  class="rounded-lg elevation-1 grid-image"></v-img>
            </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div class="mx-2 card">
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
import ImageGrid from "@/components/photos/ImageGrid";
import Impressum from "@/components/legal/Impressum";
import DGSVO from "@/components/legal/DGSVO";
export default {
  name: 'LandingPage',
  components: {DGSVO, Impressum, ImageGrid, LoginDialog}
}
</script>

<style lang="scss" scoped>
.gradient{
  background: linear-gradient(90deg, #00bcd4 0%, #E91E63 100%);
  color: white;
}
.headline{
  justify-content: center;
}
.container {
  padding: 10px;
}
.card{
  margin-top: 15px;
}
</style>