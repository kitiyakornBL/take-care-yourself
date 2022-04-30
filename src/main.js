import App from "src/App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

const apps = createApp(App);
const pinia = createPinia();

apps.use(pinia);
