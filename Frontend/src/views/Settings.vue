<template>
  <v-container>
    <v-card class="div1" elevation="2">
      <SettingsProfilePicture/>  
      <SettingsUsername/>
      <SettingsPassword/>
    </v-card>
    <v-card class="div2" elevation="2">
      <SettingsDeleteUser/>
    </v-card>
  </v-container>
</template>

<script>
import SettingsProfilePicture from "../components/usermanagement/SettingsProfilePicture";
import SettingsUsername from "../components/usermanagement/SettingsUsername";
import SettingsPassword from "../components/usermanagement/SettingsPassword";
import SettingsDeleteUser from "../components/usermanagement/SettingsDeleteUser";
export default {
  name: 'Settings',
  components: {SettingsProfilePicture, SettingsUsername,SettingsPassword,SettingsDeleteUser},
}
</script>

<style scoped>
.div1{ 
  text-align: left;
  padding: 3%;
  margin-top: 3%;
  margin-bottom: 3%;

}
.div2 {
  text-align: left;
  padding: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
}
</style>