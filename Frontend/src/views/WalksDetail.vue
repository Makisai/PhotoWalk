<template>
  <v-main class="pa-0">
<!--    View on Desktop-->
    <v-container class="d-none d-sm-flex">
      <v-container v-if="!isLoading">
        <v-row>
          <v-col cols="12" md="6">
            <PhotowalkMap/>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="text-h3" >{{this.$store.state.detail.photowalk.name}}</h3>
            <h4 class="text-h4" >{{this.$store.state.detail.photowalk.region}}</h4>
            <span>{{this.$store.state.detail.photowalk.length}}</span>
            <v-row>
              <p>{{$t('photos.description'+ this.$store.state.detail.currentID)}}</p>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ChallengeDropdown/>
              </v-col>
              <v-col cols="12">
                <PhotoUpload/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center" class="ma-2">
          <v-container v-if="!isLoadingMyPhotos">
          <h3 class="text-h3">{{ $t('photos.myPhotos') }}</h3>
          <PhotosUserGrid :walk="this.$store.state.detail.currentID"></PhotosUserGrid>
          </v-container>
          <v-progress-circular indeterminate v-else/>
        </v-row>
        <v-row justify="center" class="ma-2">
          <v-container v-if="!isLoadingFriendsPhotos">
          <h3 class="text-h3">{{ $t('photos.friendsPhotos') }}</h3>
          <PhotosFriendsGrid :walk="this.$store.state.detail.currentID"></PhotosFriendsGrid>
          </v-container>
          <v-progress-circular indeterminate v-else/>
        </v-row>
      </v-container>
      <v-progress-circular indeterminate v-else></v-progress-circular>
    </v-container>
<!--    View on Smartphone-->
    <v-container class="d-flex d-sm-none">
      <v-tabs
          color="primary"
          show-arrows>
        <v-tab>{{$t('mobileView.mapTab')}}</v-tab>
        <v-tab>{{$t('mobileView.challengesTab')}}</v-tab>
        <v-tab>{{$t('mobileView.photosTab')}}</v-tab>
        <v-tab-item>
          <v-col cols="12">
          <PhotowalkMap/>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <h3 class="text-h3" >{{this.$store.state.detail.photowalk.name}}</h3>
          <h4 class="text-h4" >{{this.$store.state.detail.photowalk.region}}</h4>
          <span>{{this.$store.state.detail.photowalk.length}}</span>
          <v-row>
            <p>{{$t('photos.description'+ this.$store.state.detail.currentID)}}</p>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ChallengeDropdown/>
            </v-col>
            <v-col cols="12">
              <PhotoUpload/>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row justify="center" class="ma-2">
            <v-container v-if="!isLoadingMyPhotos">
              <h6 class="text-h6">{{ $t('photos.myPhotos') }}</h6>
              <PhotosUserGrid :walk="this.$store.state.detail.currentID"></PhotosUserGrid>
            </v-container>
            <v-progress-circular indeterminate v-else/>
          </v-row>
          <v-row justify="center" class="ma-2">
            <v-container v-if="!isLoadingFriendsPhotos">
              <h6 class="text-h6">{{ $t('photos.friendsPhotos') }}</h6>
              <PhotosFriendsGrid :walk="this.$store.state.detail.currentID"></PhotosFriendsGrid>
            </v-container>
            <v-progress-circular indeterminate v-else/>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-main>
</template>

<script>
import PhotowalkMap from "@/components/PhotowalkMap";
import {SET_PHOTOS_FRIENDS, SET_PHOTOS_USER, SET_PHOTOWALK} from "@/store/mutations";
import ChallengeDropdown from "@/components/ChallengeDropdown";
import PhotoUpload from "@/components/PhotoUpload";
import PhotosUserGrid from "@/components/photos/PhotosUserGrid";
import PhotosFriendsGrid from "@/components/photos/PhotosFriendsGrid";
export default {
  name: 'WalksDetail',
  data(){
    return{
      isLoading: true,
      isLoadingMyPhotos: true,
      isLoadingFriendsPhotos: true,
    }
  },
  components: {PhotoUpload, ChallengeDropdown, PhotowalkMap, PhotosUserGrid, PhotosFriendsGrid},
  beforeMount() {
    this.isLoading = true;
    this.axios.get(`photowalks/${this.$store.state.detail.currentID}`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOWALK,response.data);
      this.isLoading = false;
    })
    this.isLoadingMyPhotos = true;
    this.axios.get(`photos/user`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOS_USER,response.data);
      this.isLoadingMyPhotos = false;
    })
    this.isLoadingFriendsPhotos = true;
    this.axios.get(`photos/friends`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOS_FRIENDS,response.data);
      this.isLoadingFriendsPhotos = false;
    })
  },
}
</script>

<style scoped>
.commitButton{
background-color: #00BCD4;
color: white;
}
</style>