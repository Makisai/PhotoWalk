<template>
  <!--vuetify div-->
  <v-container>
    <h2>MY PHOTOS AND FRIENDS PHOTOS</h2>
    <PhotosUserGrid/>
    <PhotosFriendsGrid/>
  </v-container>
</template>

<script>
import PhotosUserGrid from "../components/photos/PhotosUserGrid";
import PhotosFriendsGrid from "../components/photos/PhotosFriendsGrid";
export default {
  name: 'MyPhotos',
  components: {PhotosUserGrid, PhotosFriendsGrid},
}
</script>