<template>
  <v-container fluid >
    <v-carousel hide-delimiters height="90%" v-model="currentIndex">
      <v-carousel-item
          v-for="(photo) in photosRearranged"
          :key="(photo.id)">
        <v-img :src="picture(photo.photo_link)"></v-img>
        </v-carousel-item>
    </v-carousel>
    <v-card-actions style="max-height: 50px">
      <v-card-text>{{photosRearranged[this.currentIndex].challenge.description}}</v-card-text>
      <v-spacer></v-spacer>
      <v-card-text>User: {{photosRearranged[this.currentIndex].user.username}}</v-card-text>
      <v-spacer></v-spacer>
      <v-card-text>{{photosRearranged[this.currentIndex].likeCount}}
        <v-btn icon>
          <v-icon :color="this.photosRearranged[this.currentIndex].liked ? 'red' : 'grey'" @click="like">mdi-heart</v-icon>
        </v-btn>
      </v-card-text>
    </v-card-actions>
  </v-container>
</template>

<script>

import {SET_PHOTOS_FRIENDS} from "../../store/mutations";

export default {
  name: 'PhotosFriendsCarousel',
  props: ['startIndex','walk'],
  data() {
    return {
      photosRearranged: [],
      currentIndex: 0,
    }
  },
  beforeMount() {
    this.photosRearranged = this.getWalkAndRearrange();
  },
  methods: {
    picture(picture){
      const smallPicture = picture.slice(0,9) + 'small' + picture.slice(18);
      return process.env.VUE_APP_PUBLIC_URL + smallPicture;
    },
    getWalkAndRearrange(){
      let walkPhotos = [],part1 = [], part2 = [];

      for (let i = 0; i< this.$store.state.user.photosFriends.length; i++) {
        if (this.$store.state.user.photosFriends[i].challenge.photowalkId == this.walk) {
          walkPhotos.push(this.$store.state.user.photosFriends[i]);
        }
      }
      part1 = walkPhotos.slice(this.startIndex);
      part2 = walkPhotos.slice(0,this.startIndex);
      return part1.concat(part2);
    },
    like(){
      if (!this.photosRearranged[this.currentIndex].liked) {
        this.axios.post(`likes/${this.photosRearranged[this.currentIndex].id}`,{}, {
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
            this.photosRearranged = this.getWalkAndRearrange();
          })
        })
      } else {
        this.axios.delete(`likes/${this.photosRearranged[this.currentIndex].id}`,{
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
            this.photosRearranged = this.getWalkAndRearrange();
          })
        })
      }
    },
  },
}
</script>