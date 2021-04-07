<template>
  <div v-if="meme">
    <meme
      class="mx-auto my-5"
      :top="meme.topText"
      :bottom="meme.bottomText"
      :imageURL="meme.imageURL"
    />
    <div v-if="myMeme" class="text-center">
      <v-btn @click="sendToEdit">Edit</v-btn>
      <v-btn @click="deleteMeme">Delete</v-btn>
    </div>
    <div v-if="meme.memeAuthor" class="text-center">
      credit: {{ meme.memeAuthor }}
    </div>
  </div>
</template>

<script>
import Meme from "../components/Meme.vue";
import { db, auth } from "../firebase";

export default {
  components: { Meme },
  data() {
    return {
      meme: null,
      myMeme: false,
    };
  },
  async mounted() {
    const memeId = this.$route.params.memeId;
    const snapshot = await db.collection("memes").doc(memeId).get();
    this.meme = snapshot.data();

    const userId = auth.currentUser.uid;
    if (userId === this.meme.userId) {
      this.myMeme = true;
    }
  },
  methods: {
    async deleteMeme() {
      const memeId = this.$route.params.memeId;
      await db.collection("memes").doc(memeId).delete();

      this.$router.push("/feed");
    },

    sendToEdit() {
      const memeId = this.$route.params.memeId;
      // push to edit component
      this.$router.push(`/edit/${memeId}`);
    },
  },
};
</script>

<style></style>
