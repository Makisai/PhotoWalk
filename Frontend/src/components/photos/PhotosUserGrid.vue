<template>
  <!--vuetify div-->
  <v-container>
    <v-row align="center" class="ma-5">
      <v-divider></v-divider><h3 class="font-weight-regular">WALK 1</h3><v-divider></v-divider>
    </v-row>
      <div v-masonry transition-duration="0.0s" item-selector=".item" class="masonry-container">
        <div v-masonry-tile class="item pa-2" :key="index" v-for="(item, index) in walk1Photos">
          <v-card max-width="400px">
            <v-dialog
              v-model="dialog" width="800px">
                <template v-slot:activator="{ on, attr }">
                  <v-img max-height="500px" class="align-end" :src="profilePicture(item.photo_link)" v-bind="attr" v-on="on">
                    <v-card-actions style="background-color: #FFFFFF99; max-height: 45px">
                      <v-card-title>{{item.challenge.description}}</v-card-title>
                      <v-spacer></v-spacer>
                      <v-btn color=" #E91E63" icon>
                        <v-icon :color="item.liked ? 'red' : 'grey'" @click=like(index)>mdi-heart</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-img>
                </template>
                <PhotosCarousel :photos="walk1Photos" :current-index="index"></PhotosCarousel>
            </v-dialog>
          </v-card>
        </div>
      </div>
    <v-row align="center" class="ma-5">
      <v-divider></v-divider><h3 class="font-weight-regular">WALK 2</h3><v-divider></v-divider>
    </v-row>
    <div v-masonry transition-duration="0.0s" item-selector=".item" class="masonry-container">
      <div v-masonry-tile class="item pa-2" :key="index" v-for="(item, index) in walk2Photos" >
        <v-card max-width="400px">
          <v-img max-height="500px" class="align-end" :src="profilePicture(item.photo_link)">
            <v-card-actions style="background-color: #FFFFFF99; max-height: 45px">
              <v-card-title>{{item.challenge.description}}</v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon :color="item.liked ? 'red' : 'grey'" @click=like(index)>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import {SET_PHOTOS_USER} from "../../store/mutations";
import PhotosCarousel from "./PhotosCarousel";

export default {
  name: 'PhotosUserGrid',
  components: {PhotosCarousel},
  beforeMount() {
    this.axios.get(`photos/user`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOS_USER,response.data);
      this.walk1Photos = this.getWalk1();
      this.walk2Photos = this.getWalk2();
    })
  },
  data () {
    return {
      walk1Photos: [],
      walk2Photos: [],
    }
  },
  methods: {
    profilePicture(picture){
      return process.env.VUE_APP_PUBLIC_URL + picture;
    },
    like(index){
      if (!this.$store.state.user.photosUser[index].liked) {
        this.axios.post(`likes/${this.$store.state.user.photosUser[index].id}`,{}, {
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
        this.axios.delete(`likes/${this.$store.state.user.photosUser[index].id}`,{
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
    getWalk1(){
      for (let i = 0; i< this.$store.state.user.photosUser.length; i++) {
        if (this.$store.state.user.photosUser[i].challenge.photowalkId == 1) {
          this.walk1Photos.push(this.$store.state.user.photosUser[i]);
        }
      }
      return this.walk1Photos;
    },
    getWalk2(){
      for (let i = 0; i< this.$store.state.user.photosUser.length; i++) {
        if (this.$store.state.user.photosUser[i].challenge.photowalkId == 2) {
          this.walk2Photos.push(this.$store.state.user.photosUser[i]);
        }
      }
      return this.walk2Photos;
    },
  },
}
</script>

<style>

</style>