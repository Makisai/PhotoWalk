<template>
  <v-container v-if="walkPhotos.length > 0">
    <v-row align="center" class="ma-5">
      <v-divider/><h4 class="font-weight-regular text-h4 mx-3" >{{ $t('photos.walk' + walk) }}</h4><v-divider/>
    </v-row>
    <div v-masonry item-selector=".item" class="masonry-container">
      <div v-masonry-tile class="item pa-2" :key="index" v-for="(photo, index) in walkPhotos">
        <v-card max-width="300px">
          <v-dialog @click:outside="onDialogClose">
            <template v-slot:activator="{ on, attrs }" >
              <v-img
                  max-height="400px"
                  class="align-end flex-md-wrap"
                  @load="imageLoaded"
                  :src="picture(photo.photo_link)"
                  @click="dialog = true"
                  v-bind="attrs"
                  v-on="on">
              </v-img>
            </template>
            <v-card>
              <PhotosFriendsCarousel
                  v-if="dialog"
                  :start-index="index"
                  :walk="walk"/>
            </v-card>
          </v-dialog>
          <v-card-actions style="max-height: 90px">
            <v-card-text>{{photo.challenge.description}}</v-card-text>
            <v-spacer/>
            <v-card-text> {{photo.user.username}}</v-card-text>
            <v-spacer/>
            <v-card-text>{{photo.likeCount}}
              <v-btn icon>
                <v-icon :color="photo.liked ? 'secondary' : 'grey'" @click=like(index,1)>mdi-heart</v-icon>
              </v-btn>
            </v-card-text>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import {SET_PHOTOS_FRIENDS} from "../../store/mutations";
import PhotosFriendsCarousel from "./PhotosFriendsCarousel";

export default {
  name: 'PhotosFriendsGrid',
  components: {PhotosFriendsCarousel},
  props: ['walk'],
  beforeMount() {
    this.walkPhotos = this.getWalk();
  },
  data () {
    return {
      walkPhotos: [],
      dialog: false,
      imagesloaded: 0,
    }
  },
  methods: {
    imageLoaded() {
      this.imagesloaded += 1
      if (this.imagesloaded === this.walkPhotos.length) {
        this.$redrawVueMasonry();
      }
    },
    picture(picture){
      return process.env.VUE_APP_PUBLIC_URL + picture;
    },
    onDialogClose(){
      this.walkPhotos = this.getWalk();
      this.dialog = false
    },
    like(index){
      if (!this.walkPhotos[index].liked) {
        this.axios.post(`likes/${this.walkPhotos[index].id}`,{}, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then(() => {
          this.axios.get(`photos/friends`,{
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then(response => {
            this.$store.commit(SET_PHOTOS_FRIENDS,response.data);
            this.walkPhotos = this.getWalk();
          })
        })
      } else {
        this.axios.delete(`likes/${this.walkPhotos[index].id}`,{
          headers: {
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then(() => {
          this.axios.get(`photos/friends`,{
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then(response => {
            this.$store.commit(SET_PHOTOS_FRIENDS,response.data);
            this.walkPhotos = this.getWalk();
          })
        })
      }
    },
    getWalk(){
      this.walkPhotos = [];
      for (let i = 0; i< this.$store.state.user.photosFriends.length; i++) {
        if (this.$store.state.user.photosFriends[i].challenge.photowalkId == this.walk) {
          this.walkPhotos.push(this.$store.state.user.photosFriends[i]);
        }
      }
      return this.walkPhotos;
    },
  },
}
</script>

<style>

</style>