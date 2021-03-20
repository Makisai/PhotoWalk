<template>
  <v-app id="photowalkapp">
    <v-app-bar
        app class="gradient">
      <v-spacer/>
      <v-img
          max-height="50px"
          max-width="50px"
          :src="'/photowalk_logo_white.png'"/>
      <v-toolbar-title class="title mx-1">PhotoWalk</v-toolbar-title>
      <v-spacer/>
      <LocaleChange/>
    </v-app-bar>
    <v-main>
      <v-row>
        <v-col cols="12" md="5">
            <v-card class="ma-4">
              <v-card-text>
                <v-img
                    :src="`/images/map_landingpage_placeholder.JPG`"
                    :lazy-src="`images/gradient.png`"
                    class="rounded-lg elevation-1 grid-image"/>
              </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div class="mx-2 card">
          <ImageGridTop/>
          </div>
          <h3 class="text-h3 my-10">{{$t('landing.headline')}}</h3>
          <p class="questionsText ma-10">{{$t('landing.pitchQuestions')}}</p>
          <p class="descriptionText ma-10">{{$t('landing.pitchText')}}</p>
          <p class="registerText">{{$t('landing.pitchCommand')}}</p>
          <LoginDialog/>
          <div class="mx-2 card">
            <ImageGridBottom/>
          </div>
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
import ImageGridTop from "@/components/photos/ImageGridTop";
import Impressum from "@/components/legal/Impressum";
import DGSVO from "@/components/legal/DGSVO";
import ImageGridBottom from "@/components/photos/ImageGridBottom";
import LocaleChange from "@/components/LocaleChange";
export default {
  name: 'LandingPage',
  components: {LocaleChange, ImageGridBottom, DGSVO, Impressum, ImageGridTop, LoginDialog}
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
.card{
  margin-top: 15px;
}
.descriptionText{
  font-size: 18px;
  text-align: justify;
}
.questionsText{
  font-size: 20px;
  text-align: justify;
  font-style: italic;
  color: #555555;
}
.registerText{
  font-size: 20px;
}
.cardcolor{
  background-color: #4db6ac;
}
</style>