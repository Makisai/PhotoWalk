<template>
  <v-container>
    <h1>{{ $t('photowalks.chooseWalk') }}</h1>
    <v-row>
      <v-col cols="4">
        <v-card @click="goToDetail(1)">
          <v-img v-if="hasDonePhotowalk(1)"
            :src="`/images/map_stadtpark_Done.png`"
            :lazy-src="`images/gradient.png`"
            class = "rounded-lg">
          </v-img>
          <v-img v-else
             :src="`/images/map_stadtpark_notDone_small.png`"
             :lazy-src="`images/gradient.png`"
             class = "rounded-lg">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card @click="goToDetail(2)">
          <v-img v-if="hasDonePhotowalk(2)"
                 :src="`/images/hafencity_map_Done.png`"
                 :lazy-src="`images/gradient.png`"
                 class = "rounded-lg">
          </v-img>
          <v-img v-else
                 :src="`/images/hafencity_map_notDone.png`"
                 :lazy-src="`images/gradient.png`"
                 class = "rounded-lg">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card @click="goToDetail(3)">
          <v-img v-if="hasDonePhotowalk(3)"
                 :src="`/images/map_alster_Done.png`"
                 :lazy-src="`images/gradient.png`"
                 class = "rounded-lg">
          </v-img>
          <v-img v-else
                 :src="`/images/map_alster_notDone.png`"
                 :lazy-src="`images/gradient.png`"
                 class = "rounded-lg">
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {SET_CURRENT_ID} from "@/store/mutations";

export default {
  name: 'WalksOverview',
  data(){
    return{
      editedPhotowalks: [],
    }
  },
  beforeMount() {
    this.axios.get(`photowalks/`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response =>{
      this.editedPhotowalks = response.data.editedPhotowalks;
      console.log(response.data)
    })
  },
  methods:{
    goToDetail(walkNumber){
      this.$store.commit(SET_CURRENT_ID,walkNumber);
      this.$router.push( {name: 'WalksDetail'});
    },
    hasDonePhotowalk(photowalkId){
      return this.editedPhotowalks !== undefined && this.editedPhotowalks.includes(photowalkId);
    }
  }
}
</script>