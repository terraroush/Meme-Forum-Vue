<template>
  <v-app class="">
    <v-app-bar prominent shrink-on-scroll app color="teal darken-4" dark>
      <div>
        <h1 class="text-uppercase">Meme Party</h1>
        <p class="text-uppercase">Welcome {{ firstName }}!</p>
      </div>

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
  computed: {
    firstName() {
      if (!this.user) return "";
      return this.user.displayName.split(" ")[0];
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
/* p {
  align-self: flex-start;
} */
</style>
