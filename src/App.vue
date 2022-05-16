<template>
  <router-view />
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted } from "vue";
import { useOnsaveAccount } from "src/pinia-store/account";
import { auth } from "./boot/firebase";

export default defineComponent({
  name: "App",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const accountPinia = useOnsaveAccount();

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          console.log(user);
          void router.replace("/login");
        } else {
          console.log(user);
          const userDetail = {
            photo: user.photoURL,
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          };
          accountPinia.onSaveAccount(userDetail);

          void router.replace("/");
        }
      });
    });
    return {};
  },
});
</script>
