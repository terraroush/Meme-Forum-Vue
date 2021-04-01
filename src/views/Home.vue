<template>
  <div>
    <div class="home"><h1>This is the Home page</h1></div>
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
        <!-- <h1>WELCOME</h1>
        <img src="require('@/assets/logo.png')" alt="" />
        <h2>make cool memes</h2> -->
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

<style></style>
