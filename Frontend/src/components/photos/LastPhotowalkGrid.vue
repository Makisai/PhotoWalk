<template>
  <v-container>
    <v-col
      v-for="(photo, index) in $store.state.user.photosLast"
      :key="index"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="picture(photo.photo_link)"
        aspect-ratio="1"
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'LastPhotowalkGrid',
  data () {
    return {
      
    }
  },
  methods: {
      picture(picture){
        return process.env.VUE_APP_PUBLIC_URL + picture;
      },
    },
  
}
</script>