<template>
  <!--vuetify div-->
  <v-container v-if="this.$store.state.user.photosLast">
    <div v-masonry item-selector=".item" class="masonry-container">
      <div v-masonry-tile class="item pa-2" :key="index" v-for="(photo, index) in this.$store.state.user.photosLast">
        <v-card max-width="400px">
          <v-card-actions style="max-height: 45px">
            <v-card-text>{{photo.challenge.description}}</v-card-text>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import {SET_PHOTOS_LAST} from "../../store/mutations"
export default {
  name: 'LastPhotowalkGrid',
  props: ['walk'],
   beforeMount() {
    this.axios.get(`photos/lastPhotowalk`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      },
     
    }, {id: this.$store.state.detail.currentID}
    ).then(response => {
      this.$store.commit(SET_PHOTOS_LAST,response.data);
    })
  },
  data () {
    return {
     
    }
  },
  methods: {
      picture(picture){
        return process.env.VUE_APP_PUBLIC_URL + picture;
      },
    },
  
}
</script>