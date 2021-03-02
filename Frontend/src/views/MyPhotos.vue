<template>
  <!--vuetify div-->
  <v-container>
    <h2>MY PHOTOS AND FRIENDS PHOTOS</h2>
    <PhotosUserGrid walk="1"></PhotosUserGrid>
    <PhotosUserGrid walk="2"></PhotosUserGrid>
    <PhotosUserGrid walk="3"></PhotosUserGrid>
    <PhotosFriendsGrid/>
  </v-container>
</template>

<script>
import PhotosUserGrid from "../components/photos/PhotosUserGrid";
import PhotosFriendsGrid from "../components/photos/PhotosFriendsGrid";
import {SET_PHOTOS_USER} from "../store/mutations";

export default {
  name: 'MyPhotos',
  components: {PhotosUserGrid, PhotosFriendsGrid},
  beforeMount() {
    this.axios.get(`photos/user`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOS_USER,response.data);
    })
  },
}
</script>