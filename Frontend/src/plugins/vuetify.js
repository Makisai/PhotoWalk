import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#00BCD4',
                secondary: '#E91E63',
                accent: '#e91e63',
                error: '#E91E63',
                warning: '#ff9800',
                info: '#009688',
                success: '#E91E63'
            }
         }
    }
});
