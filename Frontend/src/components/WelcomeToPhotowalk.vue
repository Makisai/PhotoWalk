<template>
  <v-container>
    <div v-if="!lastPhotowalk">
    <p> {{$t('welcome.welcomePhrase')}} </p>
    </div>
    <div v-if="lastPhotowalk">
      <p>Hallooooo </p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'WelcomeToPhotowalk',
  beforeMount(){
       this.axios.get(`photowalks/last`,{
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then(response => {
            if(response.status == 204){
              this.lastPhotowalk = false;
            }
            if(response.data){
              this.lastPhotowalk = true;
            }
          })
  },
  data(){
    return{
      lastPhotowalk: false,
    }
  },
}
</script>