<template>
  <v-container fluid>
    <v-btn
        elevation="2"
        fab
        class="mainGradient"
    >
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>

export default {
  name: "NewFriendButton"
}
</script>

<style lang="scss" scoped>
.mainGradient{
  background: linear-gradient(90.29deg, #F06292 0.19%, #00BCD4 99.75%);
}
</style>