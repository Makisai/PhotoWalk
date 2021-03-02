<template>
  <!--vuetify div-->
  <v-container v-if="walkPhotos.length > 0">
    <v-row align="center" class="ma-5">
      <v-divider></v-divider><h3 class="font-weight-regular">WALK {{walk}}</h3><v-divider></v-divider>
    </v-row>
      <div v-masonry transition-duration="0.0s" item-selector=".item" class="masonry-container">
        <div v-masonry-tile class="item pa-2" :key="index" v-for="(photo, index) in walkPhotos">
          <v-card max-width="400px">
            <v-dialog @click:outside="onDialogClose">
                <template v-slot:activator="{ on, attrs }" >
                  <v-img max-height="500px" class="align-end flex-md-wrap"
                         :src="picture(photo.photo_link)" @click="dialog = true" v-bind="attrs" v-on="on">
                  </v-img>
                </template>
                <v-card>
                  <PhotosUserCarousel v-if="dialog" :start-index="index" :walk="walk"></PhotosUserCarousel>
                </v-card>
            </v-dialog>
            <v-card-actions style="max-height: 45px">
              <v-card-text>{{photo.challenge.description}}</v-card-text>
              <v-spacer></v-spacer>
              <v-card-text>{{photo.likeCount}}
                <v-btn icon>
                  <v-icon :color="photo.liked ? 'red' : 'grey'" @click=like(index,1)>mdi-heart</v-icon>
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
  beforeMount() {
    this.axios.get(`photos/user`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOS_USER,response.data);
      this.walkPhotos = this.getWalk();
    })
  },
  data () {
    return {
      walkPhotos: [],
      dialog: false,
    }
  },
  methods: {
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
            this.walkPhotos = this.getWalk();
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
            this.walkPhotos = this.getWalk();
          })
        })
      }
    },
    getWalk(){
      this.walkPhotos = [];
      for (let i = 0; i< this.$store.state.user.photosUser.length; i++) {
        if (this.$store.state.user.photosUser[i].challenge.photowalkId == this.walk) {
          this.walkPhotos.push(this.$store.state.user.photosUser[i]);
        }
      }
      return this.walkPhotos;
    },
  },
}
</script>

<style>

</style>