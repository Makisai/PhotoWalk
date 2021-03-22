<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(photo, index) in lastPhotos"
        :key="index"
        class="d-flex child-flex my-5"
        cols="2">
        <v-img
          :src="picture(photo.photo_link)"
          aspect-ratio="1"
          class="rounded-lg grid-image elevation-2"
          >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center">
              <v-progress-circular indeterminate/>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LastPhotowalkGrid',
  computed: {
     lastPhotos(){
      let lastPhotos = [];
      for (let i = 0; i< 6; i++) {
          if(i < this.$store.state.user.photosLast.length){
             lastPhotos.push(this.$store.state.user.photosLast[i]);  
          }   
      }
      return lastPhotos;
    },
  },
  methods: {
      picture(picture){
        return process.env.VUE_APP_PUBLIC_URL + picture;
      },
    },
  
}
</script>