import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
import {VueMasonryPlugin} from 'vue-masonry';
import i18n from './plugins/i18n'

Vue.config.productionTip = false
Vue.use(VueMasonryPlugin);

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
