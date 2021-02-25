<template>
  <v-container>
    <v-text-field
        style="width: 40%"
        class="mx-auto card ma-2"
        hint="Search for new friends!"
        persistent-hint
        clearable
        v-model="input"
        append-icon="mdi-magnify"
        @click:append="search"
    ></v-text-field>
    <p v-text="feedback"/>
    <v-card style="width: 400px"
            class="mx-auto card" v-if="$store.state.search.foundUser !== null">
      <v-list one-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="profilePicture($store.state.search.foundUser.profile_picture)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content style="width: 250px">
            <v-list-item-title v-text="$store.state.search.foundUser.username"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action style="width: 30px">
            <v-btn icon @click="sendRequest($store.state.search.foundUser.id)">
              <v-icon color="grey lighten-1">mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import {SET_SEARCH_USERNAME, SET_FOUND_USER, SET_FRIENDS_LIST} from "@/store/mutations";

export default {
  name: "SearchNewFriend",
  data() {
    return {
      feedback: '',
    }
  },
  beforeDestroy() {
    this.$store.commit(SET_SEARCH_USERNAME,'');
    this.$store.commit(SET_FOUND_USER, null);
  },
  computed: {
    input:{
      get(){
        return this.$store.state.search.inputUsername;
      },
      set(value){
        this.$store.commit(SET_SEARCH_USERNAME,value);
      }
    }
  },
  methods:{
    search() {
      if (this.$store.state.search.inputUsername !== this.$store.state.user.username) {
        let friends = new Array();
        for (let i = 0; i< this.$store.state.user.friends.friends.length; i++) {
          friends.push(this.$store.state.user.friends.friends[i].username);
        }
        if (!friends.includes(this.$store.state.search.inputUsername)) {
          this.axios.get(`users/search/${this.$store.state.search.inputUsername}`,{
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then(response => {
            if (!response.data) {
              this.feedback = 'Nobody found...';
            } else {
              this.feedback = '';
            }
            this.$store.commit(SET_FOUND_USER,response.data);
          })
        } else {
          this.$store.commit(SET_FOUND_USER, null);
          this.feedback = 'You\'re already friends with this user!';
        }
      } else {
        this.$store.commit(SET_FOUND_USER, null);
        this.feedback = 'You can\'t be friends with yourself!';

      }
    },
    profilePicture(picture){
      return process.env.VUE_APP_PUBLIC_URL + picture;
    },
    sendRequest(id){
      this.axios.post(`friendships/${id}`,{},{
        headers: {
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
      }).then(() => {
        this.axios.get(`users/friends`,{
          headers: {
            'Authorization': `Bearer ${this.$store.state.user.token}`
          }
        }).then(response => {
          this.$store.commit(SET_FRIENDS_LIST,response.data);
        })
      });
      this.$store.commit(SET_FOUND_USER, null);
    },
  }
}
</script>

<style scoped>

</style>