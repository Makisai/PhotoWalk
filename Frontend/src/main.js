import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import {VueMasonryPlugin} from 'vue-masonry';

Vue.config.productionTip = false
Vue.use(VueMasonryPlugin);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
