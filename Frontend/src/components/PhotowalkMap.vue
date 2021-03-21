<template>
  <v-card class="card">
    <div class="container">
      <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          @ready="onReady"
          @locationfound="onLocationFound"
          class="map"
      >
        <l-tile-layer
            :url="url"
            :attribution="attribution"
        />
        <l-marker :lat-lng="center" :icon="iconCenter"></l-marker>
        <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
        <l-marker
            v-for="challengeMarker in $store.state.detail.photowalk.challenges"
            :key="challengeMarker.id"
            :lat-lng="[challengeMarker.lat, challengeMarker.lng]"
            :icon="iconChallenge"
            @click="setChallenge(challengeMarker)">
          <l-tooltip>{{ challengeMarker.description }}</l-tooltip>
        </l-marker>
      </l-map>
    </div>
    <v-btn
        v-if="!isTracking"
        @click="startTracking"
        class="gradient button">
      {{$t('photowalks.startWalk')}}
    </v-btn>
  </v-card>
</template>

<script>
import { latLng , icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPolyline, LTooltip } from 'vue2-leaflet';
import {SET_SELECTED_CHALLENGE} from "@/store/mutations";

export default {
  name: "PhotowalkMap",
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
    LTooltip
  },
  computed: {
    polyline:{
      get(){
        return {
          latlngs: this.$store.state.detail.photowalk.waypoints.map(waypoint => [waypoint.lat, waypoint.lng]) || [],
          color: 'cyan'
        }
      },
    },
  },
  data() {
    return {
      mapObject: null,
      isTracking: false,
      timeOut: null,
      center: latLng(this.$store.state.detail.photowalk.waypoints[0].lat, this.$store.state.detail.photowalk.waypoints[0].lng),
      zoom: 17,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      iconCenter: icon({
        iconUrl: "/marker/ort.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      iconChallenge: icon({
        iconUrl: "/marker/marker_icon.png",
        iconSize: [37, 37],
        iconAnchor: [37, 37]
      }),
    };
  },
  beforeDestroy() {
    this.isTracking = false;
    clearTimeout(this.timeOut);
  },
  methods: {
    startTracking(){
      if(this.mapObject && !this.isTracking) {
        this.isTracking = true;
        this.timeoutFunction();
      }
    },
    timeoutFunction(){
      this.mapObject.locate();
      this.timeOut = setTimeout(this.timeoutFunction, 3000);
    },
    onReady(mapObject) {
      this.mapObject = mapObject;
    },
    onLocationFound(location){
      this.center = location.latlng;
    },
    setChallenge(value){
      this.$store.commit(SET_SELECTED_CHALLENGE,value);
    }
  },
};
</script>

<style scoped>
.map {
  height: 500px;
  width: 95%;
  z-index: 0;
  margin: 15px;
}
.container {
  padding: 5px;
}
.card{
  margin: 15px;
  margin-top: 0;
  background-color: #00BCD4;
}
.gradient{
  background: linear-gradient(90deg, #00bcd4 0%, #e91e63 100%);
  color: white;
}
.button{
  margin-bottom: 20px;
}
</style>