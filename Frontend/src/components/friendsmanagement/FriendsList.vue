<template>
  <v-container>
    <h4 class="text-h4">{{ $t('friends.acceptedFriends') }}</h4>
    <v-list>
      <template v-for="(friend, index) in $store.state.user.friends.friends">
        <v-list-item
            :key="index"
            v-if="friend.friendship.accepted"
            class="ma-3">
          <v-card class="mx-auto elevation-3" width="80%">
            <v-list one-line class="friendCard">
              <v-list-item>
                <v-list-item-avatar
                  size="70">
                  <v-img :src="profilePicture(friend.profile_picture)"/>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="username" v-text="friend.username"/>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="deleteFriendship(friend.id)">
                    <v-icon color="secondary" large >mdi-minus-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-list-item>
      </template>
    </v-list>

    <h4 class="text-h4">{{ $t('friends.pendingFriends') }}</h4>
    <v-list>
      <template v-for="(friend, index) in $store.state.user.friends.friends">
        <v-list-item
            :key="index"
            v-if="!friend.friendship.accepted"
            class="ma-3" >
          <v-card class="mx-auto elevation-3" width="80%">
            <v-list one-line class="friendCard">
              <v-list-item>
                <v-list-item-avatar
                  size="70">
                  <v-img :src="profilePicture(friend.profile_picture)"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="username" v-text="friend.username"/>
                </v-list-item-content>
                <v-list-item-action style="width: 30px">
                  <v-btn v-if="!friend.friendship.first_move" icon @click="acceptRequest(friend.id)">
                    <v-icon color="primary" large>mdi-checkbox-marked-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn icon @click="deleteFriendship(friend.id)">
                    <v-icon color="secondary" large>mdi-minus-circle</v-icon>
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
      acceptRequest(id){
        this.axios.put(`friendships/${id}`,{},{
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
      deleteFriendship(id){
        this.axios.delete(`friendships/${id}`,{
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
.friendCard{
  width: 100%;
  height: 100px
}

.username{
  font-size: 18pt;
}

</style>
