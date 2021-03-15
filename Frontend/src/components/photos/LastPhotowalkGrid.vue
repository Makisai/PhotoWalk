
<template>
  <v-row v-if="setPictures">
    <v-col
      v-for="(photo, index) in this.$store.user.photosLast"
      :key="index"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="`${picture(photo.photo_link[index])}`"
        :lazy-src="`images/gradient.png`"
        aspect-ratio="1"
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
</template>

<script>
import {SET_PHOTOS_LAST} from "../../store/mutations"
export default {
  name: 'LastPhotowalkGrid',
  beforeMount(){
    this.axios.get(`photos/lastPhotowalk`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      },
    },{id: this.$store.state.detail.photowalk.id}
    ).then(response => {
      if(response.status == 500){
        console.log("Error something went wrong")
        return response.status;
      }
      this.$store.commit(SET_PHOTOS_LAST,response.data);
      this.setPictures = true;
    })
  } ,
  data () {
    return {
      setPictures: false,
    }
  },
  methods: {
      picture(picture){
        return process.env.VUE_APP_PUBLIC_URL + picture;
      },
    },
  
}
</script>