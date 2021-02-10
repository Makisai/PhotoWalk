<template>
  <v-container>
    <h2>Accepted Friendships</h2>
    <v-list>
      <template v-for="(friend, index) in $store.state.user.friends.friends">
        <v-list-item :key="index" v-if="friend.friendship.accepted === false">
          <v-card class="mx-auto">
            <v-list one-line>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="https://thispersondoesnotexist.com/image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="friend.username"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
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
        <v-list-item :key="index" v-if="friend.friendship.accepted === true">
          <v-card class="mx-auto">
            <v-list one-line>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="https://thispersondoesnotexist.com/image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="friend.username"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-if="friend.friendship.first_move === false">
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-checkbox-marked-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-minus-circle</v-icon>
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
    }
  }
</script>

<style lang="scss" scoped>

</style>
