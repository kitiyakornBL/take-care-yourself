<template>
  <q-page style="padding: 0 10px 100px 10px" v-if="profile">
    <div class="flex-col items-center justify-center" style="width: 100%">
      <div style="position: relative">
        <q-img
          :src="profile.photo ? profile.photo : 'icons/mock-profile.png'"
          class="q-mb-md"
          alt=""
          style="width: 200px"
        >
        </q-img>
        <q-icon
          name="edit"
          class="q-ml-md"
          style="cursor: pointer; z-index: 1; position: absolute"
          @click="isShowEditProfile = !isShowEditProfile"
        ></q-icon>
      </div>

      <div v-if="isShowEditProfile">
        <q-file
          class="q-pa-md q-mb-sm"
          filled
          v-model="image"
          label="เลือกรูปภาพโปรไฟล์"
        />
      </div>

      <div class="q-gutter-md">
        <div class="row items-center justify-center">
          <span class="q-mr-md">name : </span>
          <q-input
            :disable="isShowEdit"
            dense
            class="q-mb-md q-mr-md"
            outlined
            :placeholder="profile.name"
            v-model="name"
            style="background-color: white"
          ></q-input>
          <q-icon
            name="edit"
            style="cursor: pointer"
            @click="isShowEdit = !isShowEdit"
          ></q-icon>
        </div>
        <span class="q-mb-sm">email : {{ profile.email }}</span>
      </div>
      <div class="row justify-end q-mt-md" style="width: 100%">
        <q-btn @click="onSubmit" label="บันทึก"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { EditDisplayName, UploadImage } from "../boot/firebase";
import { useOnsaveAccount } from "src/pinia-store/account";
import { defineComponent, computed, ref, watch } from "vue";
export default defineComponent({
  setup() {
    const accountPinia = useOnsaveAccount();
    const profile = computed(() => accountPinia.account);
    const name = ref("");
    const isShowEditProfile = ref(false);
    const isShowEdit = ref(true);
    const image = ref();

    const onSubmit = async () => {
      const imagUrl = await UploadImage(image.value);
      const userDetail = await EditDisplayName(name.value);
      userDetail.photo = imagUrl;
      accountPinia.onSaveAccount(userDetail);
      isShowEditProfile.value = false;
      isShowEdit.value = true;
    };

    return { image, profile, name, isShowEdit, isShowEditProfile, onSubmit };
  },
});
</script>

<style></style>
