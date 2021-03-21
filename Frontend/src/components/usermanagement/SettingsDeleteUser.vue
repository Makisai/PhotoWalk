<template>
  <div>
    <v-col cols=12>
      <h6 class="text-h6" py="2">{{ $t('settings.deleteQuestion') }} </h6>
    </v-col>
    <v-col v-if="deleteUserError" cols="12">
      <p class="errorMessage">{{ $t('error.deleteUser') }}</p>
    </v-col>
    <v-col v-if="deletedPicturesError" cols="12">
      <p class="errorMessage">{{ $t('error.deleteAllPictures') }}</p>
    </v-col>
    <v-col>
      <v-dialog
          v-model="dialog"
          width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="secondary"
              v-bind="attrs"
              v-on="on">
            {{ $t('settings.deleteAccount') }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2 fix">
            {{ $t('settings.deleteSure') }}
          </v-card-title>
          <v-card-text class="mt-5">{{ $t('settings.deleteHint') }}</v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                color="secondary"
                text
                @click="deleteUserComplete">
              {{ $t('settings.deleteYes') }}
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="dialog = false">
              {{ $t('settings.deleteNo') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import {CLEAR_USER_DATA} from "@/store/actions";
import {SET_SNACKBARACCOUNT, SET_SNACKBARPICTURES} from "@/store/mutations";

export default {
  name: "SettingsDeleteUser",
  data() {
    return {
      dialog: false,
      deleteUserError: false,
      deletedPicturesError: false,
      snackbar: false,
    }
  },
  methods: {
    deleteUserComplete() {
      this.axios.delete(`photos/deleteUserAllPhotos/`, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.user.token}`
        }
      }).then((response) => {
        if (response && response.status == 200) {
          this.$store.commit(SET_SNACKBARPICTURES,true);
          this.dialog = false;
          this.deletedPicturesError = true;
        }
      }).catch((error) => {
        if (error.response && error.response.status == 500) {
          this.dialog = false;
          this.deletedPhotosError = true;
          this.deletedPicturesError = false;
        }
      }),
          this.axios.delete(`users/deleteUser`, {
            headers: {
              'Authorization': `Bearer ${this.$store.state.user.token}`
            }
          }).then((response) => {
            if (response) {
              setTimeout(() => {
                this.$store.commit(SET_SNACKBARACCOUNT,true);
              }, 4000);
              this.$store.dispatch(CLEAR_USER_DATA);
              this.$router.push({name: 'LandingPage'});
            }
          }).catch((error) => {
            if (error.response && error.response.status == 500) {
              this.deleteUserError = true;
            }
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.fix {
  overflow-wrap: anywhere;
  word-wrap: break-word;
  word-break: normal;
  hyphens: auto;
}
</style>