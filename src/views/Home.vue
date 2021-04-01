<template>
  <div>
    <v-container>
      <div class="mx-auto mt-6">
        <v-alert
          v-if="error"
          elevation="2"
          border="left"
          colored-border
          type="error"
        >
          <h5>{{ error }}</h5>
        </v-alert>
        <div class="text-center">
          <img
            src="https://bellette.com.au/uploads/images/_1250xAUTO_crop_center-center/Viral-Facebook-Memes.jpg"
            alt="pimp my ride style meme"
          />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
    };
  },
  mounted() {
    if (this.$route.query.unauthorized) {
      this.error = "You must be logged in to do that";
    }
  },
};
</script>

<style scoped>
img {
  width: 50rem;
}
</style>
