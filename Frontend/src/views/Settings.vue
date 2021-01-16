<template>
  <!--vuetify div-->
  <v-container>
     <div class="div1"> 
    <h1> Profile </h1>
    <SettingsForm/>  
     </div>
     <div class="div2">
      <h1> Change Password </h1>
  <SettingsForm2/>  
     </div> 
  </v-container> 
</template>

<script>
import SettingsForm from "../components/usermanagement/SettingsForm";
import SettingsForm2 from "../components/usermanagement/SettingsForm2";
export default {
  name: 'Settings',
  components: {SettingsForm, SettingsForm2},
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

