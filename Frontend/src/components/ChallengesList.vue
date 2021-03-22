<template>
  <v-list>
    <v-list-item v-for="challenge in $store.state.detail.photowalk.challenges" :key="challenge.id">
      <v-list-item-avatar>
        <v-img :src = "'/marker/Walkmarker.png'"/>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title align="left" v-text="challenge.description"/>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "ChallengesList",
}
</script>

<style scoped>

</style>