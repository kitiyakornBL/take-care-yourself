<template>
  {{ account }}
  <div
    class="justify-center"
    :class="onChangeBg == true ? '' : 'bg'"
    style="display: flex; height: 100vh; position: relative"
  >
    <div
      v-if="isShowGetStart"
      class="flex flex-col items-center q-gutter-y-lg"
      style="
        margin: auto;
        font-size: 24px;
        color: #00b3b7;
        font-weight: 900;
        margin-top: auto;
      "
    >
      <img
        src="icons/heart-logo.png"
        alt=""
        style="width: 50px; height: 50px"
      />
      <div class="flex flex-row">
        <span> Welcome to </span>
      </div>
      <div class="flex flex-row">
        <span>Take Care Yourself</span>
      </div>
      <img src="icons/image1.png" alt="" style="width: 350px; height: 350px" />
      <q-btn
        class="text-white q-px-xl"
        @click="pushToLogin()"
        label="GET START"
        style="background-color: #002245"
      />
    </div>
    <div
      v-if="isShowLogin"
      class="col items-center justify-center"
      style="display: flex; width: 100%; margin-top: -250px"
    >
      <div class="row items-center justify-center">
        <span class="" style="font-size: 24px; font-weight: 900; color: #002245"
          >Take Care Yourself</span
        >
        <q-img src="icons/image2.png" style="width: 400px"></q-img>
      </div>

      <div
        class="bg-white q-pa-md q-gutter-y-lg"
        style="
          border-radius: 15px 15px 0 0;
          width: 100%;
          position: absolute;
          z-index: 1;
          bottom: 0;
        "
      >
        <q-btn style="width: 100%" label="Sign In With Google">
          <img
            class="q-ml-md"
            src="icons/google.png"
            alt=""
            style="width: 20px"
          />
        </q-btn>
        <q-input
          outlined
          v-model="email"
          placeholder="อีเมล"
          style="background-color: #f7f8fa; border: none"
        ></q-input>
        <q-input
          v-model="password"
          outlined
          placeholder="รหัสผ่าน"
          style="background-color: #f7f8fa; border: none"
        ></q-input>
        <q-btn
          @click="login()"
          unelevated
          class="bg-white"
          style="
            font-weight: 900;
            color: #002245;
            border: solid 1px #002245;
            width: 100%;
          "
          label="เข้าสู่ระบบ"
        ></q-btn>
        <q-btn
          @click="pustToregister"
          unelevated
          style="width: 100%; color: white; background-color: #002245"
          label="สมัครสมาชิก"
        ></q-btn>
      </div>
    </div>
    <div
      v-if="isShowRegister"
      class="col items-center justify-center"
      style="display: flex; width: 100%; margin-top: -250px"
    >
      <q-btn
        @click="backToLogin"
        style="
          background-color: #002245;
          position: absolute;
          left: 0;
          top: 0;
          margin-top: 10px;
          margin-left: 10px;
        "
      >
        <span style="font-weight: 900; color: white">Back</span>
      </q-btn>
      <div class="row items-center justify-center">
        <span class="" style="font-size: 24px; font-weight: 900; color: #002245"
          >สมัครสมาชิก</span
        >
        <q-img src="icons/image3.png" style="width: 400px"></q-img>
      </div>

      <div
        class="bg-white q-pa-md q-gutter-y-lg"
        style="
          border-radius: 15px 15px 0 0;
          width: 100%;
          position: absolute;
          z-index: 1;
          bottom: 0;
        "
      >
        <q-btn style="width: 100%" label="Sign In With Google">
          <img
            class="q-ml-md"
            src="icons/google.png"
            alt=""
            style="width: 20px"
          />
        </q-btn>
        <q-input
          outlined
          placeholder="อีเมล"
          style="background-color: #f7f8fa; border: none"
        ></q-input>
        <q-input
          outlined
          placeholder="รหัสผ่าน"
          style="background-color: #f7f8fa; border: none"
        ></q-input>
        <q-input
          outlined
          placeholder="ยืนยันรหัสผ่าน"
          style="background-color: #f7f8fa; border: none"
        ></q-input>
        <q-btn
          unelevated
          style="width: 100%; color: white; background-color: #002245"
          label="สมัครสมาชิก"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useOnsaveAccount } from "src/pinia-store/account";
import { LoginWithFirebase } from "src/main";
export default defineComponent({
  name: "LoginPage",

  setup() {
    //manage layout
    const isShowGetStart = ref(true);
    const onChangeBg = ref(true);
    const isShowLogin = ref(false);
    const isShowRegister = ref(false);

    //manage data
    const email = ref("");
    const password = ref("");
    const accountPinia = useOnsaveAccount();
    const account = computed(() => accountPinia.account);

    //firebase
    const login = async () => {
      const user = await LoginWithFirebase(email.value, password.value);
      if (user.user) {
        const userDetail = {
          name: user.user.email,
          uid: user.user.uid,
        };
        accountPinia.onSaveAccount(userDetail);
      }
    };

    //push page
    const pushToLogin = () => {
      console.log("1");
      isShowGetStart.value = false;
      onChangeBg.value = false;
      isShowLogin.value = true;
    };

    const pustToregister = () => {
      onChangeBg.value = true;
      isShowLogin.value = false;
      isShowRegister.value = true;
    };

    const backToLogin = () => {
      onChangeBg.value = false;
      isShowLogin.value = true;
      isShowRegister.value = false;
    };

    return {
      onChangeBg,
      isShowGetStart,
      isShowLogin,
      isShowRegister,
      email,
      password,
      account,
      backToLogin,
      pushToLogin,
      pustToregister,
      login,
    };
  },
});
</script>

<style>
.bg {
  background-color: #bfe9ef;
}
</style>
