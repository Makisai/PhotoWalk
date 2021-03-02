<template>
  <v-container>
    <p>Chose a walk</p>
    <v-row>
      <v-col cols="4">
        <v-card @click="goToDetail(1)">
          walk1
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
  methods:{
    goToDetail(walkNumber){
      this.$store.commit(SET_CURRENT_ID,walkNumber)
      this.$router.push( {name: 'WalksDetail'})
    }
  }
}
</script>