import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { auth } from "./firebase";

Vue.config.productionTip = false;

let userLoaded = false;

// don't make this app until firebase has determined if there is an authenticated user
auth.onAuthStateChanged(() => {
  if (!userLoaded) {
    new Vue({
      router,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
  userLoaded = true; 
});
