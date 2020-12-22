<template>
  <div>
    <v-btn text @click="signout" class="logout-btn">Logout</v-btn>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    signout() {
      this.axios.post('users/logout',{},{headers: {'Authorization': `Bearer ${this.$store.state.user.token}`}})
          .then(()=>{
            this.$store.commit('setToken','XXX');
            this.$router.push({name: 'LandingPage'})
          })
    }
  }
}

</script>

<style scoped>
.logout-btn{
  color: white;
}
</style>