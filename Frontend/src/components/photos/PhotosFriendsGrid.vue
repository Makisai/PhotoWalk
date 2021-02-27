<template>
  <!--vuetify div-->
  <v-container>
    <v-row align="center" class="ma-5">
      <v-divider></v-divider><h3 class="font-weight-regular">Photos deiner Freunde</h3><v-divider></v-divider>
    </v-row>
    <div v-masonry transition-duration="0.0s" item-selector=".item" class="masonry-container">
      <div v-masonry-tile class="item pa-2" :key="index" v-for="(item, index) in $store.state.user.photosFriends">
        <v-card max-width="400px">
          <v-img max-height="500px" class="align-end" :src="profilePicture(item.photo_link)" >
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
import {SET_PHOTOS_FRIENDS} from "../../store/mutations";

export default {
  name: 'PhotosUserGrid',
  beforeMount() {
    this.axios.get(`photos/friends`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOS_FRIENDS,response.data);
    })
  },
  methods: {
    profilePicture(picture){
      return process.env.VUE_APP_PUBLIC_URL + picture;
    },
    like(index){
      if (!this.$store.state.user.photosFriends[index].liked) {
        this.axios.post(`likes/${this.$store.state.user.photosFriends[index].id}`,{}, {
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
          })
        })
      } else {
        this.axios.delete(`likes/${this.$store.state.user.photosFriends[index].id}`,{
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
          })
        })
      }
    }
  },
}
</script>

<style>

</style>