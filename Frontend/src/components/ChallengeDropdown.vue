<template>
  <v-container fluid>
        <v-select
            v-model="dropdown"
            :items="$store.state.detail.photowalk.challenges"
            item-text="description"
            item-value="id"
            :label="$t('photoUpload.selectChallengeId')"
            return-object
            single-line
        ></v-select>
  </v-container>
</template>

<script>
import {SET_SELECTED_CHALLENGE} from "@/store/mutations";

export default {
  name: "ChallengeDropdown",
  computed: {
    dropdown:{
      get(){
        return this.$store.state.detail.selectedChallenge;
      },
      set(value){
        this.$store.commit(SET_SELECTED_CHALLENGE,value);
      }
    }
  }
}
</script>

<style scoped>

</style>