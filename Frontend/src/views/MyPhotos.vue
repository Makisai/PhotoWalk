<template>
  <!--vuetify div-->
  <v-container>
    <h2>{{ $t('photos.myPhotos') }}</h2>
    <PhotosUserGrid walk="1"></PhotosUserGrid>
    <PhotosUserGrid walk="2"></PhotosUserGrid>
    <PhotosUserGrid walk="3"></PhotosUserGrid>
    <h2>{{ $t('photos.friendsPhotos') }}</h2>
    <PhotosFriendsGrid walk="1"></PhotosFriendsGrid>
    <PhotosFriendsGrid walk="2"></PhotosFriendsGrid>
    <PhotosFriendsGrid walk="3"></PhotosFriendsGrid>
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