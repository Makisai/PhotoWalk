<template>
  <v-card class="card">
    <div class="container">
      <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          @update:center="centerUpdate"
          class="map"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-marker :lat-lng="currentCenter" :icon="icon"></l-marker>
        <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
      </l-map>
      <v-btn v-if="walkcreation" @click="addPoint">add position</v-btn>
    </div>
  </v-card>
</template>

<script>
import { latLng , icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPolyline } from 'vue2-leaflet';

export default {
  name: 'PhotowalkMap_debug',
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
  },
  data() {
    return {
      zoom: 17,
      center: latLng(53.56923, 10.034911),
      currentCenter: latLng(53.56923, 10.034911),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      polyline: {
        latlngs: [],
        color: 'green'
      },
      icon: icon({
        iconUrl: "/marker/ort.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
    };
  },
  methods: {
    centerUpdate(center) {
      this.currentCenter = center;
    },
    // pure debugging method
    addPoint() {
      this.polyline.latlngs.push([this.currentCenter.lat, this.currentCenter.lng]);
      console.log('[',this.polyline.latlngs.join('],['),']');
    },
  },
  props: {
    walkcreation :{
      type: Boolean,
      default: true,
    } ,
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