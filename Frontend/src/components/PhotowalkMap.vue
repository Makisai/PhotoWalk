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
        <l-marker :lat-lng="markerLatLng1" :icon="iconChallenge" >
          <l-tooltip>Challenge 1</l-tooltip>
        </l-marker>
        <l-marker :lat-lng="markerLatLng2" :icon="iconChallenge" ></l-marker>
        <l-marker :lat-lng="markerLatLng3" :icon="iconChallenge" ></l-marker>
        <l-marker :lat-lng="markerLatLng4" :icon="iconChallenge" ></l-marker>
        <l-marker :lat-lng="markerLatLng5" :icon="iconChallenge" ></l-marker>
        <l-marker :lat-lng="markerLatLng6" :icon="iconChallenge" ></l-marker>
        <l-marker :lat-lng="markerLatLng7" :icon="iconChallenge" ></l-marker>
        <l-marker :lat-lng="markerLatLng8" :icon="iconChallenge" ></l-marker>
        <l-marker :lat-lng="markerLatLng9" :icon="iconChallenge" ></l-marker>
        <l-marker :lat-lng="markerLatLng10" :icon="iconChallenge" ></l-marker>
      </l-map>
    </div>
  </v-card>
</template>

<script>
import { latLng , icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPolyline, LTooltip } from 'vue2-leaflet';

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
    }
  },
  data() {
    return {
      mapObject: null,
      timeOut: null,
      zoom: 17,
      center: latLng(53.5916187,10.0318289),
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
      challenges:[],
      markerLatLng1: [53.59245625343382,10.029813216646298],
      markerLatLng2: [53.594068202315825,10.029813216646298],
      markerLatLng3: [53.5951262917524,10.028332736998664],
      markerLatLng4: [53.59474303973836,10.02496686695786],
      markerLatLng5: [53.59540843681146,10.0215525019421],
      markerLatLng6: [53.59579366190611,10.015180094278954],
      markerLatLng7: [53.596971601147516,10.009892123303255],
      markerLatLng8: [53.59424478100158,10.006305966336992],
      markerLatLng9: [53.59422090263981,10.011433705868695],
      markerLatLng10: [53.59265126872751,10.014252167556252],
    };
  },

  beforeDestroy() {
    clearTimeout(this.timeOut);
  },
  methods: {
    timeoutFunction(){
      this.mapObject.locate();
      this.timeOut = setTimeout(this.timeoutFunction, 3000);
    },
    onReady(mapObject) {
      this.mapObject = mapObject;
      this.timeoutFunction();
    },
    onLocationFound(location){
      this.center = location.latlng;
    },
  },
};
</script>

<style scoped>
.map {
  height: 700px;
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
}

</style>