<template>
  <v-container>
    <v-form v-if="meme">
      <v-row justify="space-between">
        <v-col>
          <v-text-field
            outlined
            v-model="meme.imageURL"
            type="text"
            label="Image URL"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="meme.topText"
            type="text"
            label="Top Text"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="meme.bottomText"
            type="text"
            label="Bottom Text"
          />
        </v-col>
      </v-row>
      <!-- <v-row justify="center">
        <v-btn :disabled="!imageURL" text color="primary" type="submit">
          Save this updated meme
        </v-btn>
      </v-row> -->
    </v-form>

    <div>
      <meme
        class="mx-auto"
        :top="meme.topText"
        :bottom="meme.bottomText"
        :imageURL="meme.imageURL"
        :width="800"
      />
      <div class="text-center mt-3">
        <v-btn class="type button" @click="updateMeme"
          >Save this updated meme</v-btn
        >
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
      meme: null,
    };
  },
  async mounted() {
    const memeId = this.$route.params.memeId;
    const snapshot = await db.collection("memes").doc(memeId).get();
    this.meme = snapshot.data();
  },
  methods: {
    async updateMeme() {
      const memeId = this.$route.params.memeId;
      await db
        .collection("memes")
        .doc(memeId)
        .update({
          topText: this.meme.topText,
          bottomText: this.meme.bottomText,
          imageURL: this.meme.imageURL,
          normalized: `${this.meme.topText.toUpperCase()} ${this.meme.bottomText.toUpperCase()}`,
          userId: auth.currentUser.uid,
          memeAuthor: auth.currentUser.displayName,
        });

      this.$router.push("/feed");
    },
  },
};
</script>
