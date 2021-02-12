import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import {
  SET_CURRENT_ID, SET_DRAWER,
  SET_EMAIL,
  SET_PHOTOWALK, SET_PROFILEPICTURE,
  SET_SELECTED_CHALLENGE,
  SET_TOKEN,
  SET_USERNAME
} from "@/store/mutations";
import {CLEAR_USER_DATA} from "@/store/actions";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    drawer: false,
    user: {
      token: 'XXX',
      username: '',
      email: '',
      profilePicture:'',
    },
    detail:{
      currentID: 0,
      photowalk: null,
      selectedChallenge: null,
    },
  },
  mutations: {
    [SET_DRAWER](state,drawer){
      state.drawer = drawer;
    },
    [SET_TOKEN](state,token){
      state.user.token = token;
    },
    [SET_USERNAME](state,username){
      state.user.username = username;
    },
    [SET_EMAIL](state,email){
      state.user.email = email;
    },
    [SET_PROFILEPICTURE](state,profilePicture){
      state.user.profilePicture = profilePicture;
    },
    [SET_CURRENT_ID](state,id){
      state.detail.currentID = id;
    },
    [SET_PHOTOWALK](state,photowalk){
      state.detail.photowalk = photowalk;
    },
    [SET_SELECTED_CHALLENGE](state,selectedChallenge){
      state.detail.selectedChallenge = selectedChallenge;
    },
  },
  actions: {
    [CLEAR_USER_DATA]({commit}){
      commit(SET_EMAIL,'');
      commit(SET_USERNAME,'');
      commit(SET_PROFILEPICTURE,'');
      commit(SET_TOKEN,'XXX');
      commit(SET_DRAWER,false);
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
