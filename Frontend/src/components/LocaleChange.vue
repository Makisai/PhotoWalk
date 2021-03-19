<template>
  <div class="d-flex align-center">
      <v-img
          :src="lang.name"
          :height="lang.height"
          :width="lang.width"
          v-for="(lang, i) in langs"
          :key="`Lang${i}`"
          @click="changeLocale(lang.locale)"
          class="v-chip--clickable"/>
  </div>
</template>

<script>
export default {
  name: 'LocaleChange',
  data () {
    return { langs: [{locale:'de', name: '/images/de.png', height:'35px', width:'50px'}, {locale:'en', name: '/images/en.png', height:'25px', width:'40px'}] }
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    }
  }
}
</script>

<style scoped>

</style>