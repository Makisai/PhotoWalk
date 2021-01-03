<template>
  <div>
    <span v-for="(lang, i) in langs"
          :key="`Lang${i}`"
          @click="changeLocale(lang.locale)"
          class="v-chip--clickable"
    >
      {{ lang.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'LocaleChange',
  data () {
    return { langs: [{locale:'de', name: '🍺'}, {locale:'en', name: '☕'}] }
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