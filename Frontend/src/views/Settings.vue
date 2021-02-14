<template>
  <!--vuetify div-->
  <v-container>
    <div class="div1"> 
      <h1> Profile </h1>
      <SettingsProfilePic/>  
      <SettingsUsername/>
    </div>
    <div class="div2">
      <h1> Change Password </h1>
      <SettingsPassword/>  
    </div> 
  </v-container> 
</template>

<script>
import SettingsProfilePic from "../components/usermanagement/SettingsProfilePic";
import SettingsUsername from "../components/usermanagement/SettingsUsername";
import SettingsPassword from "../components/usermanagement/SettingsPassword";
export default {
  name: 'Settings',
  components: {SettingsProfilePic, SettingsUsername, SettingsPassword},
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

</style>>

