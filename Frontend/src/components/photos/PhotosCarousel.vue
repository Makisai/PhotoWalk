<template>
  <v-container>
    <v-carousel hide-delimiter-background>
      <v-carousel-item
          v-for="photo in photos"
          :key="(photo.id)">
        <card>
          <v-img class="align-end" :src="profilePicture(photo.photo_link)">
            <v-card-title style="background-color: #FFFFFF99; max-height: 45px">
              {{photo.challenge.description}}
            </v-card-title>
          </v-img>
        </card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: 'PhotosCarousel',
  props: ['photos','currentIndex'],
  methods: {
    profilePicture(picture){
      return process.env.VUE_APP_PUBLIC_URL + picture;
    },
    getIndex(){
      this.index = this.index + this.currentIndex;
      return this.index;
    },
  },
}
</script>