<template>
  <v-app class="">
    <v-app-bar prominent shrink-on-scroll app color="teal darken-4" dark>
      <div>
        <h1
          v-resize-text="{
            ratio: 1.3,
            minFontSize: '30px',
            maxFontSize: '100px',
            delay: 100,
          }"
          class="text-uppercase text-no-wrap"
        >
          <router-link class="white--text" to="/">Meme Party</router-link>
        </h1>

        <p
          v-if="user"
          v-resize-text="{
            ratio: 1.2,
            minFontSize: '15px',
            maxFontSize: '40px',
            delay: 100,
          }"
          class="text-uppercase text-no-wrap welcome"
          :class="{ 'welcome--hidden': !showWelcome }"
        >
          Welcome {{ firstName }}!
        </p>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>

      <Slide right :closeOnNavigation="true">
        <router-link v-if="user" to="/create">
          <v-btn text>Create</v-btn>
        </router-link>

        <router-link to="/feed">
          <v-btn text>Memes</v-btn>
        </router-link>

        <router-link v-if="user" to="/my-memes">
          <v-btn text> My Memes </v-btn>
        </router-link>

        <v-btn justify="center" v-if="!user" text @click="signIn">
          Sign In
        </v-btn>
        <v-btn v-else text @click="signOut"> Sign Out </v-btn>
      </Slide>
    </v-main>
  </v-app>
</template>

<script>
import { signIn, signOut, auth } from "./firebase";
import { Slide } from "vue-burger-menu";

export default {
  components: { Slide },
  data() {
    return {
      user: auth.currentUser,
      showWelcome: true,
      lastScrollPosition: 0,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
      window.addEventListener("scroll", this.onScroll);
    });
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    async signIn() {
      await signIn();

      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect);
      }
    },
    signOut() {
      signOut();
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showWelcome = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
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
<style>
a {
  text-decoration: none;
}
.router-link-active .v-btn {
  color: goldenrod;
}
.welcome {
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
}
.welcome.welcome--hidden {
  transform: translate3d(0, -50%, 0);
}
.bm-burger-button {
  top: -100px;
  z-index: 800;
}
.bm-burger-bars {
  background-color: white;
}
</style>
