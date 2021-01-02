<template>
  <v-btn @click="navigation()" class="button">{{title}}</v-btn>
</template>

<script>
export default {
  name: "NavigationButton",
  props: {
    title: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    }
  },
  methods: {
    navigation(){
      this.$router.push( {name: this.target})
    }
  }
}
</script>

<style lang="scss" scoped>
.button{
  background: linear-gradient(90.29deg, #F06292, #00BCD4);
  border-radius: 4px;
  color: white;
}
</style>