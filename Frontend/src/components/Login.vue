<template>
<div>
  <v-text-field v-model="email"></v-text-field>
  <v-text-field v-model="password"></v-text-field>
  <v-btn @click="signin">Login</v-btn>
</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signin() {
      this.axios.post('users/login',{email: this.email, password: this.password})
      .then((response)=>{
        const token = response.data.token;
        this.$store.commit('setToken',token);
        this.$router.push({name:'Start'})
      })
    }
  }
}
</script>

<style scoped>

</style>