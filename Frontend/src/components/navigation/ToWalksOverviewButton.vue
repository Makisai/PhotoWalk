<template>
     <v-btn class="mainGradient" @click="redirect">{{$t('welcome.navigate')}} </v-btn>
</template>

<script>
export default {
    name:"ToWalksOverviewButton",
    methods:{
        redirect(){
            this.$router.push('overview');
        }
    }
}
</script>

<style lang="scss" scoped>
.mainGradient{
  background: linear-gradient(90.29deg, #F06292 0.19%, #00BCD4 99.75%);
  border-radius: 4px;
  color: white;
}
</style>
