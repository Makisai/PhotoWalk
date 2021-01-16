<template>
  <!--vuetify div-->
  <v-container>
    <p class="p1">Settings</p>
     <SettingsForm/>
  </v-container> 
</template>

<script>
import SettingsForm from "../components/usermanagement/SettingsForm";
export default {
  name: 'Settings',
  components: {SettingsForm},
}
</script>

<style scoped>
.p1{
  margin-top: 2px;
}

</style>>

