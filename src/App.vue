<template>
  <router-view />
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted } from "vue";
import { auth } from "./boot/firebase";

export default defineComponent({
  name: "App",

  setup() {
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          console.log(user);
          void router.replace("/login");
        } else {
          console.log(user);
          void router.replace("/");
        }
      });
    });
    return {};
  },
});
</script>
