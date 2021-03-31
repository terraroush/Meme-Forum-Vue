<template>
  <v-container>
    <v-row justify="center" class="mt-5">
      <v-col :sm="12" :md="6">
        <form @submit.prevent="addSearch">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            color="teal darken-2"
            rounded
            outlined
            v-model="inputVal"
            label="Search"
          />
        </form>
      </v-col>
    </v-row>
    <div v-for="meme in displayedMemes" :key="meme.id" class="py-5">
      <router-link :to="`/meme/${meme.id}`">
        <meme
          class="mx-auto"
          :top="meme.topText"
          :bottom="meme.bottomText"
          :imageURL="meme.imageURL"
        />
      </router-link>
    </div>
  </v-container>
</template>

<script>
import { db } from "../firebase";
import Meme from "../components/Meme";

export default {
  components: { Meme },
  data() {
    return {
      memes: [],
      inputVal: this.$route.query.q,
      searchTerm: this.$route.query.q,
    };
  },
  methods: {
    addSearch() {
      this.searchTerm = this.inputVal;

      this.$router.push({
        path: "/feed",
        query: { q: this.searchTerm },
      });
    },
  },
  mounted() {
    db.collection("memes").onSnapshot((snap) => {
      const memes = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      this.memes = memes;
    });
  },
  computed: {
    displayedMemes() {
      if (!this.searchTerm) return this.memes;

      return this.memes.filter((meme) => {
        return meme.normalized.includes(this.searchTerm.toUpperCase());
      });
    },
  },
};
</script>

<style></style>
