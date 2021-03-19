<template>
  <v-container v-if="walkPhotos.length > 0">
    <v-row align="center" class="ma-5">
      <v-divider/><h4 class="font-weight-regular text-h4 mx-3" >{{ $t('photos.walk' + walk) }}</h4><v-divider/>
    </v-row>
    <div v-masonry item-selector=".item" class="masonry-container">
      <div v-masonry-tile
           class="item pa-2"
           :key="index"
           v-for="(photo, index) in walkPhotos">
        <v-card max-width="400px">
          <v-dialog @click:outside="onDialogClose">
            <template v-slot:activator="{ on, attrs }" >
              <v-img
                  max-height="500px"
                  class="align-end flex-md-wrap"
                  @load="imageLoaded"
                  :src="picture(photo.photo_link)"
                  @click="dialog = true"
                  v-bind="attrs" v-on="on">
              </v-img>
            </template>
            <v-card>
              <PhotosUserCarousel
                  v-if="dialog"
                  :start-index="index"
                  :walk="walk"/>
            </v-card>
          </v-dialog>
          <v-card-actions style="max-height: 90px">
            <v-card-text>{{photo.challenge.description}}</v-card-text>
            <v-spacer/>
            <v-card-text>{{photo.likeCount}}
              <v-btn icon>
                <v-icon
                    :color="photo.liked ? 'secondary' : 'grey'"
                    @click=like(index,1)>
                  mdi-heart
                </v-icon>
              </v-btn>
            </v-card-text>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import {SET_PHOTOS_USER} from "../../store/mutations";
import PhotosUserCarousel from "./PhotosUserCarousel";

export default {
  name: 'PhotosUserGrid',
  components: {PhotosUserCarousel},
  props: ['walk'],
  data () {
    return {
      dialog: false,
      imagesloaded: 0,
    }
  },
  computed: {
    walkPhotos(){
      let walkPhotos = [];
      for (let i = 0; i< this.$store.state.user.photosUser.length; i++) {
        if (this.$store.state.user.photosUser[i].challenge.photowalkId == this.walk) {
          walkPhotos.push(this.$store.state.user.photosUser[i]);
        }
      }
      this.$redrawVueMasonry();
      return walkPhotos;
    },
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
          this.axios.get(`photos/user`,{
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then(response => {
            this.$store.commit(SET_PHOTOS_USER,response.data);
          })
        })
      } else {
        this.axios.delete(`likes/${this.walkPhotos[index].id}`,{
          headers: {
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then(() => {
          this.axios.get(`photos/user`,{
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then(response => {
            this.$store.commit(SET_PHOTOS_USER,response.data);
          })
        })
      }
    },
  },
}
</script>



<style scoped>
</style>