<template>
  <!--vuetify div-->
  <v-container>
    <div class="div1"> 
      <SettingsProfilePicture/>  
      <SettingsUsername/>
    </div>
    <div class="div2">
      <SettingsPassword/>
      <SettingsDeleteUser/>
    </div> 
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
  background-color: #e3e3e3;
  text-align: left;
  padding: 2em;
 
}
.div2 {
  text-align: left;
  padding: 2em;
}
</style>