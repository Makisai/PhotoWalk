<template>
  <v-container>
    <h3 class="text-h3 headline">{{ $t('photowalks.chooseWalk') }}</h3>
    <v-row justify="center">
      <v-col cols="9" md="3">
       <ImageHover
         :walk-number="1"
         :edited-photowalks="editedPhotowalks"
         :image-done="`/images/map_stadtpark_Done.png`"
         :image-done-hover="`/images/map_stadtpark_Done_hover.png`"
         :image-not-done="`/images/map_stadtpark_notDone_small.png`"
         :image-not-done-hover="`/images/map_stadtpark_notDone_hover.png`"/>
      </v-col>
      <v-col cols="9" md="3">
        <ImageHover
          :walk-number="2"
          :edited-photowalks="editedPhotowalks"
          :image-done="`/images/hafencity_map_Done.png`"
          :image-done-hover="`/images/hafencity_map_Done_hover.png`"
          :image-not-done="`/images/hafencity_map_notDone.png`"
          :image-not-done-hover="`/images/hafencity_map_notDone_hover.png`"/>
      </v-col>
      <v-col cols="9" md="3">
        <ImageHover
          :walk-number="3"
          :edited-photowalks="editedPhotowalks"
          :image-done="`/images/map_alster_Done.png`"
          :image-done-hover="`/images/map_alster_Done_hover.png`"
          :image-not-done="`/images/map_alster_notDone.png`"
          :image-not-done-hover="`/images/map_alster_notDone_hover.png`"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageHover from "@/components/ImageHover";

export default {
  name: 'WalksOverview',
  components: {ImageHover},
  data(){
    return{
      editedPhotowalks: [],
    };
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
}
</script>

<style scoped lang="scss">
.headline{
  margin-top: 2%;
  margin-bottom: 5%;
}
</style>