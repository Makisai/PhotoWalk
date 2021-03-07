<template>
  <v-container>
    <p>Chose a walk</p>
    <v-row>
      <v-col cols="4">
        <v-card @click="goToDetail(1), walkDone=true">
          <v-img v-if="!walkDone"
            :src="`/images/map_stadtpark_notDone_small.png`"
            :lazy-src="`images/gradient.png`"
            class = "rounded-lg">
          </v-img>
          <v-img v-if="walkDone"
             :src="`/images/map_stadtpark_Done_small.png`"
             :lazy-src="`images/gradient.png`"
             class = "rounded-lg">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card @click="goToDetail(2)">
          walk 2
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card @click="goToDetail(3)">
          walk 3
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
      walkDone: false,
    }
  },
  beforeMount() {
    this.axios.get(`photowalks/`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response =>{
      console.log(response)
      // eslint-disable-next-line no-debugger
      debugger
    })
  },
  methods:{
    goToDetail(walkNumber){
      this.$store.commit(SET_CURRENT_ID,walkNumber)
      this.$router.push( {name: 'WalksDetail'})
    }
  }
}
</script>