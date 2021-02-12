<template>
  <v-container>
    <h2>Accepted Friendships</h2>
    <v-list>
      <template v-for="(friend, index) in $store.state.user.friends.friends">
        <v-list-item :key="index" v-if="friend.friendship.accepted === true" class="ma-3">
          <v-card class="mx-auto card">
            <v-list one-line>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="profilePicture(friend.profile_picture)"></v-img>
                </v-list-item-avatar>
                <v-list-item-content style="width: 250px">
                  <v-list-item-title v-text="friend.username"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="deleteFriendship(friend.username)">
                    <v-icon color="grey lighten-1">mdi-minus-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-list-item>
      </template>
    </v-list>

    <h2>Pending Friendships</h2>
    <v-list>
      <template v-for="(friend, index) in $store.state.user.friends.friends">
        <v-list-item :key="index" v-if="friend.friendship.accepted === false" class="ma-3" >
          <v-card class="mx-auto card">
            <v-list one-line>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="profilePicture(friend.profile_picture)"></v-img>
                </v-list-item-avatar>
                <v-list-item-content style="width: 250px">
                  <v-list-item-title v-text="friend.username"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action style="width: 30px">
                  <v-btn v-if="friend.friendship.first_move === false" icon @click="acceptRequest(friend.username)">
                    <v-icon color="grey lighten-1">mdi-checkbox-marked-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn icon @click="deleteFriendship(friend.username)">
                    <v-icon color="grey lighten-1" >mdi-minus-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
  import {SET_FRIENDS_LIST} from "../../store/mutations";

  export default {
    name: "FriendsList",
    beforeMount() {
      this.axios.get(`users/friends`,{
        headers: {
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
      }).then(response => {
        this.$store.commit(SET_FRIENDS_LIST,response.data);
      })
    },
    methods: {
      acceptRequest(username){
        this.axios.put(`friendships/${username}`,{},{
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
        })
      },
      deleteFriendship(username){
        this.axios.delete(`friendships/${username}`,{
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
        })
      },
      profilePicture(picture){
        return process.env.VUE_APP_PUBLIC_URL + picture;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
