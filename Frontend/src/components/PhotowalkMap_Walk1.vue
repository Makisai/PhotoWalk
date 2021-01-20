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
        <l-marker :lat-lng="currentCenter" :icon="iconCenter"></l-marker>
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
  name: "PhotowalkMap_Walk1",
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
    LTooltip
  },
  data() {
    return {
      zoom: 17,
      center: latLng(53.5916187,10.0318289),
      currentCenter: latLng(53.5916187,10.0318289),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      polyline: {
        latlngs: [
          [53.59161873616372,10.031828946628028],[53.59195644673768,10.030587621385033],
          [53.5922221104924,10.03074705765478],[53.59245625343382,10.029813216646298],
          [53.592748930286014,10.028909744451083],[53.59356391206893,10.029426014276932],
          [53.59358642515475,10.029243801397225],[53.5940997202564,10.029600634953288],
          [53.594068202315825,10.029813216646298],[53.59468054666672,10.03023078782893],
          [53.5950497500014,10.028697162758073],[53.59494169082276,10.028431435641842],
          [53.5951262917524,10.028332736998664],[53.595229848018334,10.028127747509],
          [53.59572061121803,10.026176551255471],[53.59513979910583,10.025789348886104],
          [53.59502320820432,10.025691614248961],[53.5948990428634,10.025723825239677],
          [53.594844919395506,10.0253372933511],[53.59474303973836,10.02496686695786],
          [53.59481308202902,10.024140118196208],[53.59540843681146,10.0215525019421],
          [53.595965579409835,10.019142046136903],[53.595672682502645,10.018900463706563],
          [53.596032436027926,10.017381178644486],[53.596048354254734,10.01713422771566],
          [53.59601015050031,10.016554429882795],[53.59579366190611,10.015180094278954],
          [53.59568541719301,10.015088829805254],[53.595965579409835,10.013972182127132],
          [53.596971601147516,10.009892123303255],[53.59690474601564,10.00984917531561],
          [53.597041639743615,10.009188850005977],[53.596993886167944,10.00909758553228],
          [53.59696205042087,10.0088935825911],[53.59634761580239,10.008453365717985],
          [53.59595284480392,10.008195677792267],[53.595774559918056,10.008233257281427],
          [53.59567586617559,10.00784672539285],[53.595513498549266,10.007438719510452],
          [53.595255619271924,10.006832079185317],[53.59502639192622,10.006617339247208],
          [53.594552014719135,10.006391862312205],[53.59424478100158,10.006305966336992],
          [53.59402828336137,10.007425298264337],[53.59378949791288,10.008117834564684],
          [53.59378949791288,10.008821107861962],[53.59400599677661,10.010163232475088],
          [53.594095143045124,10.010796715292491],[53.59422090263981,10.011433705868695],
          [53.59466026233607,10.012614775528249],[53.594185881018134,10.01255035354682],
          [53.594001221078365,10.012620144026695],[53.59378472219013,10.012561090543711],
          [53.59341539799697,10.013103308887414],[53.59335490493351,10.013344891317796],
          [53.59338992724397,10.013430787293009],[53.592753153428525,10.014450801998988],
          [53.59265126872751,10.014252167556252],[53.59206224298401,10.015202391782358]],
        color: 'cyan'
      },
      iconCenter: icon({
        iconUrl: "/marker/ort.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      iconChallenge: icon({
        iconUrl: "/marker/challenge_icon.png",
        iconSize: [37, 37],
        iconAnchor: [37, 37]
      }),
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
  methods: {
    centerUpdate(center) {
      this.currentCenter = center;
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