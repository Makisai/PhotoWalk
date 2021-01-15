<template>
<!--vuetify div-->
  <v-container>
    <p v-if="!lastPhotowalk">{{$t(welcome)}}</p>
    <p v-if="lastPhotowalk"> {{$t(welcomeback)}}</p>
    <NavigationButton v-bind:title="'Back'" v-bind:target="'LandingPage'"/> 
    <v-container>
       <div class="div1" v-if="!lastPhotowalk">
       </div>
       <div class="div1" v-if="lastPhotowalk">
       </div>    
    </v-container>
    <PhotoUpload/>
  </v-container>
</template>

<script>
import NavigationButton from "../components/NavigationButton";
import PhotoUpload from "../components/PhotoUpload";
export default {
  name: 'Start',
  components: {PhotoUpload, NavigationButton},
}
</script>

<style scoped>
.div1 { 
    margin: "10px";
    height: 400px;
    background-color: "blue";
}

</style>