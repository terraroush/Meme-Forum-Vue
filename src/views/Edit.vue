<template>
  <v-container>
    <v-form >
      <v-row justify="space-between">
        <v-col>
          <v-text-field
            outlined
            v-model="imageURL"
            type="text"
            label="Image URL"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="topText"
            type="text"
            label="Top Text"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="bottomText"
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
        :top="topText"
        :bottom="bottomText"
        :imageURL="imageURL"
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

// when it mounts(?) grab memeID from route param
// get meme from db
// fill out form with that meme's data

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
          topText: this.topText,
          bottomText: this.bottomText,
          imageURL: this.imageURL,
          normalized: `${this.topText.toUpperCase()} ${this.bottomText.toUpperCase()}`,
          userId: auth.currentUser.uid,
          memeAuthor: auth.currentUser.displayName,
        });

      this.$router.push("/feed");
    },
  },
};
</script>
