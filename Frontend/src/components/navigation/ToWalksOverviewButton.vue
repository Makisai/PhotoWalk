<template>
     <v-btn @click="redirect">{{$t('welcome.navigate')}} </v-btn>
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
