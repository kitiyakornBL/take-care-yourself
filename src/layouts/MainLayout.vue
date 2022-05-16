<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #04c5c9">
      <q-toolbar style="background-color: #04c5c9">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="row justify-center">{{
          title
        }}</q-toolbar-title>
        <q-icon name="notifications_none" size="25px" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div class="row items-center q-mt-xl" v-if="profile">
          <q-btn
            @click="toggleLeftDrawer"
            unelevated
            icon="chevron_left"
            style="
              color: white;
              font-weight: 700;
              width: 40px;
              height: 40px;
              margin-left: 18px;
              border-radius: 10px;
              background-color: #04c5c9;
            "
          >
          </q-btn>
          <q-space />
          <!-- <span
            class="q-mr-lg"
            style="color: #002245; font-size: 18px; font-weight: bold"
            >{{ profile.name }}</span
          > -->
        </div>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @onChangeTitle="onChangeTitle"
        />
        <q-item
          clickable
          style="
            background-color: #f8f7fa;
            border-radius: 8px;
            margin: 20px 20px;
          "
          @click="logout()"
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label
              style="color: #002245; font-size: 18px; font-weight: bold"
              >ออกจากระบบ</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view style="padding-top: 30px" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useOnsaveAccount } from "src/pinia-store/account";
import { auth } from "../boot/firebase";
import { defineComponent, ref, computed } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "หน้าแรก",
    icon: "home",
    link: "/",
  },
  {
    title: "ฟีดข่าว",
    icon: "article",
    link: "new-page",
  },
  {
    title: "ตรวจสอบทาม์ไลน์",
    icon: "find_in_page",
    link: "check-page",
  },
  {
    title: "บันทึกไทม์ไลน์",
    icon: "edit_calendar",
    link: "record-page",
  },
  {
    title: "ข้อมูลติดต่อโรงพยาบาล",
    icon: "medication",
    link: "hospital-contact",
  },
  {
    title: "ตรวจสอบพื้นที่เสี่ยงใกล้คุณ",
    icon: "location_on",
    link: "station",
  },
  {
    title: "สถิติผู้ติดเชื้อ",
    icon: "query_stats",
    link: "static-page",
  },
  {
    title: "ตั้งค่าโปรไฟล์",
    icon: "account_circle",
    link: "profile-page",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const accountPinia = useOnsaveAccount();
    const profile = computed(() => accountPinia.account);
    const title = ref(linksList[0].title);
    const leftDrawerOpen = ref(false);
    const onChangeTitle = (newTitle) => {
      title.value = newTitle;
    };
    const logout = () => {
      auth
        .signOut()
        .then(() => console.log("Signed Out"))
        .catch((err) => alert(err.message));
    };
    return {
      logout,
      onChangeTitle,
      title,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      profile,
    };
  },
});
</script>
