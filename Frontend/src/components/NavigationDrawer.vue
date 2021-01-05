<template>
  <v-navigation-drawer v-model="drawer" fixed bottom temporary>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://thispersondoesnotexist.com/image"></v-img>
      </v-list-item-avatar>
    </v-list-item>
    <v-list-item>
      <v-list-item-content align="left">
        <v-list-item-title class="title">
          USERNAME
        </v-list-item-title>
        <v-list-item-subtitle>
          emailadress
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
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
      <v-list-item @click="signout">
        <v-list-item-icon>
          <v-icon color="primary">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title align="left">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  data () {
    return {
      items:[
        {title:'pages.photos',icon:'mdi-image',target:'MyPhotos'},
        {title:'pages.friends',icon:'mdi-account-supervisor-circle',target: 'MyFriends'},
        {title:'pages.overview',icon:'mdi-map',target:'WalksOverview'},
        {title:'pages.settings',icon:'mdi-cog',target:'Settings'},
      ],
      right: null,
    }
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    navigation(target) {
      this.$router.push({name:target});
    },
    signout() {
      this.axios.post('users/logout',{},{headers: {'Authorization': `Bearer ${this.$store.state.user.token}`}})
          .then(()=>{
            this.$store.commit('setToken','XXX');
            this.$router.push({name: 'LandingPage'})
          })
    }
  }
}
</script>

<style scoped>

</style>