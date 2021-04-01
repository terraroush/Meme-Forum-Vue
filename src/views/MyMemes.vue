<template>
  <v-container>
    <h1 class="teal--text text--darken-4 text-center">My Memes</h1>
    <div v-if="!loading">
      <div v-if="memes.length">
        <div v-for="meme in memes" :key="meme.id" class="my-5">
          <meme
            class="mx-auto"
            :top="meme.topText"
            :bottom="meme.bottomText"
            :imageURL="meme.imageURL"
          />
        </div>
      </div>
      <div v-else class="text-center mx-auto mt-5">
        <h3>You don't currently have any memes</h3>
        <v-btn to="/create" color="teal" dark> Create Memes </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import Meme from "../components/Meme.vue";
import { db, auth } from "../firebase";
export default {
  components: { Meme },
  data() {
    return {
      loading: true,
      error: null,
      memes: [],
    };
  },
  async mounted() {
    const userId = auth.currentUser.uid;
    const snapshot = await db
      .collection("memes")
      .where("userId", "==", userId)
      .get();

    this.memes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    this.loading = false;
  },
};
</script>

<style></style>
