<template>
  <v-container>
    <div v-if="!isLoading">
      <h3 class="text-h3 pa-4">{{ $t('photos.myPhotos') }}</h3>
      <p v-html="$t('photos.descriptionMyPhotos')"></p>
      <PhotosUserGrid walk="1"></PhotosUserGrid>
      <PhotosUserGrid walk="2"></PhotosUserGrid>
      <PhotosUserGrid walk="3"></PhotosUserGrid>
    </div>
    <div v-if="!isLoadingFriends">
      <h3 class="text-h3 pa-4">{{ $t('photos.friendsPhotos') }}</h3>
      <p v-html="$t('photos.descriptionFriendsPhotos')"></p>
      <PhotosFriendsGrid walk="1"></PhotosFriendsGrid>
      <PhotosFriendsGrid walk="2"></PhotosFriendsGrid>
      <PhotosFriendsGrid walk="3"></PhotosFriendsGrid>
    </div>
    <v-progress-circular indeterminate v-else/>
  </v-container>
</template>

<script>
import PhotosUserGrid from "../components/photos/PhotosUserGrid";
import PhotosFriendsGrid from "../components/photos/PhotosFriendsGrid";
import {SET_PHOTOS_FRIENDS, SET_PHOTOS_USER} from "@/store/mutations";

export default {
  name: 'MyPhotos',
  components: {PhotosUserGrid, PhotosFriendsGrid},
  data(){
    return{
      isLoading: true,
      isLoadingFriends: true
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.axios.get(`photos/user`,{
      headers: {
      'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
    this.$store.commit(SET_PHOTOS_USER,response.data);
    this.isLoading = false;
    })
    this.isLoadingFriends = true;
    this.axios.get(`photos/friends`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOS_FRIENDS,response.data);
      this.isLoadingFriends = false;
    })
  },
}
</script>