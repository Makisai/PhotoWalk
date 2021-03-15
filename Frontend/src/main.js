import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
import {VueMasonryPlugin} from 'vue-masonry';
import i18n from './plugins/i18n'
import '../node_modules/leaflet/dist/leaflet.css';
import CxltToastr from '../node_modules/cxlt-vue2-toastr'


Vue.config.productionTip = false
Vue.use(VueMasonryPlugin);
Vue.use(CxltToastr);

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
