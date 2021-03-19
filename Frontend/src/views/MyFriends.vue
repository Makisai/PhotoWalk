<template>
  <v-container>
    <div>
      <h3 class="text-h3">{{ $t('friends.myFriends') }}</h3>
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
}
</script>