<template>
  <div v-if="meme">
    <meme
      class="mx-auto my-5"
      :top="meme.topText"
      :bottom="meme.bottomText"
      :imageURL="meme.imageURL"
    />
  </div>
</template>

<script>
import Meme from "../components/Meme.vue";
import { db } from "../firebase";

export default {
  components: { Meme },
  data() {
    return {
      meme: null,
    };
  },
  async mounted() {
    const memeId = this.$route.params.memeId;
    const snapshot = await db.collection("memes").doc(memeId).get();
    this.meme = snapshot.data();
  },
};
</script>

<style></style>
