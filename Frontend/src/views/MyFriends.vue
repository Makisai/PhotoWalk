<template>
  <!--vuetify div-->
  <v-container>
    <div>
      <h2>My Friends</h2>
      <NewFriendButton/>
      <FriendsList/>
    </div>
  </v-container>
</template>

<script>
import NewFriendButton from "../components/friendsmanagement/NewFriendButton";
import FriendsList from "../components/friendsmanagement/FriendsList";
export default {
  name: 'MyFriends',
  components: {NewFriendButton, FriendsList}
}
</script>