<template>
  <v-container fluid >
    <v-carousel height="90%" v-model="currentIndex">
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
	<v-card-text>{{$t('welcome.step'+(currentIndex+1))}}</v-card-text>
  </v-container>
</template>

<script>
export default {
  name: 'TutorialCarousel',
  data() {
    return {
			currentIndex: this.i,
			items: [ {
				src:"/images/Tutorial1.png"
			},
			{
				src:"/images/Tutorial2.png"
			},
				{
				src:"/images/Tutorial3.png"
			},
				{
				src:"/images/Tutorial4.png"
			},
				{
				src:"/images/Tutorial5.png"
			},
				{
				src:"/images/Tutorial6.png"
			},
				{
				src:"/images/Tutorial7.png"
			},
				{
				src:"/images/Tutorial8.png"
			},
		],
    }
  },
}
</script>