<template>
  <v-row justify="center">
    <v-expansion-panels popout>
      <v-expansion-panel
        v-for="(item,i) in 8"
        :key="i"
      >
        <v-expansion-panel-header v-text="$t('welcome.step')+' '+(i+1)"> </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-img
          :src="'/images/Tutorial'+(i+1)+'.png'"
          cols="4">
          </v-img>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>


<script>
export default {
  name: 'WelcomeToPhotowalk',

  data(){
    return{
    
    }
  },
}
</script>