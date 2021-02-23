<template>
  <!--vuetify div-->
  <v-container>
    <div>
      <h1>{{ $t(myFriends) }}</h1>
      <SearchNewFriend/>
      <FriendsList/>
    </div>
  </v-container>
</template>

<script>
import FriendsList from "../components/friendsmanagement/FriendsList";
import SearchNewFriend from "../components/friendsmanagement/SearchNewFriend";
export default {
  name: 'MyFriends',
  components: {FriendsList, SearchNewFriend},
  data() {
    return {
      myFriends: 'friends.myFriends',
    }
  }
}
</script>