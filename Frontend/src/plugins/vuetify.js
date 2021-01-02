import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#00BCD4',
                secondary: '#E91E63',
                accent: '#E91E63',
                error: '#f44336',
                warning: '#ff9800',
                info: '#009688',
                success: '#E91E63'
            }
         }
    }
});
