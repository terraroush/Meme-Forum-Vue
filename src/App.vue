<template>
  <v-app>
    <v-app-bar app color="teal darken-4" dark>
      <h1>Vue Meme Forum</h1>
      <v-spacer></v-spacer>
      <router-link to="/create">
        <v-btn text>Create</v-btn>
      </router-link>
      |
      <router-link to="/feed">
        <v-btn text>Memes</v-btn>
      </router-link>
      |
      <v-btn v-if="!user" text @click="signIn"> Sign In </v-btn>
      <v-btn v-else text @click="signOut"> Sign Out </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { signIn, signOut, auth } from "./firebase";

export default {
  data() {
    return {
      user: auth.currentUser,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },

  methods: {
    signIn() {
      signIn();
    },
    signOut() {
      signOut();
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.router-link-active .v-btn {
  color: goldenrod;
}
</style>
