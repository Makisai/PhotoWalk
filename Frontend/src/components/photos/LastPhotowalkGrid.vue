<template>
  <!--vuetify div-->
  <v-container v-if="walkPhotos.length > 0">
    <v-row align="center" class="ma-5">
      <v-divider></v-divider><h3 class="font-weight-regular">WALK {{walk}}</h3><v-divider></v-divider>
    </v-row>
    <div v-masonry item-selector=".item" class="masonry-container">
      <div v-masonry-tile class="item pa-2" :key="index" v-for="(photo, index) in walkPhotos">
        <v-card max-width="400px">
          <v-dialog @click:outside="onDialogClose">
            <template v-slot:activator="{ on, attrs }" >
              <v-img max-height="500px" class="align-end flex-md-wrap" @load="imageLoaded"
                     :src="picture(photo.photo_link)" @click="dialog = true" v-bind="attrs" v-on="on">
              </v-img>
            </template>
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
//import {SET_PHOTOS_USER} from "../../store/mutations";

export default {
  name: 'LastPhotowalkGrid',
  props: ['walk'],
  data () {
    return {
      walkPhotos: [],
      dialog: false,
      imagesloaded: 0,
    }
  },
  methods: {
    
    },
  
}
</script>