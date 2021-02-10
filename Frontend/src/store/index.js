import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import {SET_CURRENT_ID, SET_PHOTOWALK, SET_SELECTED_CHALLENGE, SET_TOKEN, SET_FRIENDS_LIST} from "@/store/mutations";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    user: {
      token: 'XXX',
      friends: null
    },
    detail:{
      currentID: 0,
      photowalk: null,
      selectedChallenge: null,
    }
  },
  mutations: {
    [SET_TOKEN](state,token){
      state.user.token = token;
    },
    [SET_FRIENDS_LIST](state, friends){
      state.user.friends = friends;
    },
    [SET_CURRENT_ID](state,id){
      state.detail.currentID = id;
    },
    [SET_PHOTOWALK](state,photowalk){
      state.detail.photowalk = photowalk;
    },
    [SET_SELECTED_CHALLENGE](state,selectedChallenge){
      state.detail.selectedChallenge = selectedChallenge;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
