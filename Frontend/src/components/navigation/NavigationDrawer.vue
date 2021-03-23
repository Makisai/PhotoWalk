<template>
  <v-navigation-drawer v-model="drawer" fixed bottom temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="profilePicture"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content align="left">
          <v-list-item-title class="title">
            {{$store.state.user.username}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{$store.state.user.email}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item v-for="item in items" :key="item.title" @click="navigation(item.target)">
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content link>
          <v-list-item-title align="left">{{ $t(item.title) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <Logout/>
    </template>
  </v-navigation-drawer>
</template>

<script>
import Logout from "@/components/usermanagement/Logout";
import {SET_DRAWER} from "@/store/mutations";
export default {
  name: "NavigationDrawer",
  components: {Logout},
  computed:{
    drawer:{
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit(SET_DRAWER,value);
      }
    },
    profilePicture(){
      return process.env.VUE_APP_PUBLIC_URL + this.$store.state.user.profilePicture;
    }
  },
  data () {
    return {
      items:[
        {title:'pages.overview',icon:'mdi-map',target:'WalksOverview'},
        {title:'pages.photos',icon:'mdi-image',target:'MyPhotos'},
        {title:'pages.friends',icon:'mdi-account-supervisor-circle',target: 'MyFriends'},
        {title:'pages.settings',icon:'mdi-cog',target:'Settings'},
      ],
      right: null,
    }
  },
  methods: {
    navigation(target) {
      this.$router.push({name:target});
    }
  }
}
</script>

<style scoped>

</style>