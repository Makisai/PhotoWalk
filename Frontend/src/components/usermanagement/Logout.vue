<template>
  <v-list-item @click="signout">
    <v-list-item-icon>
      <v-icon color="primary">mdi-logout</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title align="left">Logout</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {CLEAR_USER_DATA} from "@/store/actions";

export default {
  name: "Logout",
  methods: {
    signout() {
      this.axios.post('users/logout',{},{headers: {'Authorization': `Bearer ${this.$store.state.user.token}`}})
          .then(()=>{
            this.$store.dispatch(CLEAR_USER_DATA);
            this.$router.push({name: 'LandingPage'})
          })
    }
  }
}

</script>

<style scoped>

</style>