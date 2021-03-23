<template>
  <v-container>
    <h4>{{ $t('friends.searchHint') }}</h4>
    <v-text-field
        style="width: 50%"
        class="mx-auto card ma-2"
        clearable
        v-model="input"
        append-icon="mdi-magnify"
        @click:append="search"
    ></v-text-field>
    <p class="feedback errorMessage">{{ $t(feedback) }}</p>
    <v-card
        width="80%"
        class="mx-auto card elevation-3"
        v-if="$store.state.search.foundUser !== null">
      <v-list one-line class="friendCard">
        <v-list-item>
          <v-list-item-avatar size="70">
            <v-img :src="profilePicture($store.state.search.foundUser.profile_picture)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="username" v-text="$store.state.search.foundUser.username"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="sendRequest($store.state.search.foundUser.id)">
              <v-icon color="grey lighten-1" large>mdi-plus</v-icon>
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
              this.feedback = 'error.friendNotFound';
            } else {
              this.feedback = '';
            }
            this.$store.commit(SET_FOUND_USER,response.data);
          })
        } else {
          this.$store.commit(SET_FOUND_USER, null);
          this.feedback = 'error.friendAlready';
        }
      } else {
        this.$store.commit(SET_FOUND_USER, null);
        this.feedback = 'error.friendYourself';

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
.friendCard{
  width: 100%;
  height: 100px;
}

.username{
  font-size: 18pt;
}

.feedback{
  font-size: 14pt;
}

</style>