<template>
  <v-main>
    <v-row>
      <v-col cols="12" md="6">
        <PhotowalkMap/>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col>
            <v-btn>
              Start Walk now
            </v-btn>
          </v-col>
          <v-col cols="12">
            <ChallengeDropdown/>
          </v-col>
          <v-col cols="12">
            <PhotoUpload/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import PhotowalkMap from "@/components/PhotowalkMap";
import {SET_PHOTOWALK} from "@/store/mutations";
import ChallengeDropdown from "@/components/ChallengeDropdown";
import PhotoUpload from "@/components/PhotoUpload";
export default {
  name: 'WalksDetail',
  components: {PhotoUpload, ChallengeDropdown, PhotowalkMap},
  beforeMount() {
    this.axios.get(`photowalks/${this.$store.state.detail.currentID}`,{
      headers: {
        'Authorization': `Bearer ${this.$store.state.user.token}`
      }
    }).then(response => {
      this.$store.commit(SET_PHOTOWALK,response.data);
    })
  },
}
</script>