<template>
  <v-container>
    <v-carousel height="400px" v-model="currentIndex">
      <v-carousel-item v-for="item in items" :key="item.src" :src="item.src" contain/>
    </v-carousel>
	<v-card-text>{{$t('welcome.step'+(currentIndex+1))}}</v-card-text>
  </v-container>
</template>

<script>
export default {
  name: 'TutorialCarousel',
  data() {
    return {
			currentIndex: 0,
			items: [
        { src:"/images/Tutorial1.png" },
        { src:"/images/Tutorial2.png" },
        { src:"/images/Tutorial3.png" },
				{ src:"/images/Tutorial4.png" },
				{ src:"/images/Tutorial5.png" },
				{ src:"/images/Tutorial6.png" },
      ],
    }
  },
}
</script>


<style scoped>

</style>