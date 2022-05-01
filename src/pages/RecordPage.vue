<template>
  <q-page style="padding: 0 10px 100px 10px" v-if="account_timeline">
    <div v-if="account_timeline">
      <div
        class="row q-mb-lg items-center q-pa-md"
        v-for="(item, i) in account_timeline"
        :key="i"
        style="background-color: #f7f8fa; border-radius: 10px"
      >
        <div class="flex-col">
          <img src="icons/heart-logo.png" style="width: 50px; heigth: 50px" />
        </div>
        <div class="flex-col q-ml-lg">
          <div class="row">บันทึกไทม์ไลน์ของคุณสำเร็จแล้ว</div>
          <div class="row">
            {{ item.payload.newDate }}
          </div>
        </div>
        <q-space />
        <q-icon @click="onSelected(item)" name="more_vert"></q-icon>
      </div>
    </div>
    <div v-else class="items-center justify-center" style="height: 60vh">
      <q-img src="images/nonList.png" style="width: 100px; height: 100px" />
    </div>
    <q-btn
      flat
      dense
      unelevated
      style="position: absolute; right: 0; bottom: 0; border-radius: 100%"
      to="add-timline-page"
    >
      <q-img src="images/addTimeLine.png" style="width: 100px; height: 100px" />
    </q-btn>

    <q-dialog v-model="showMenu" position="bottom">
      <q-card style="border-radius: 20px 20px 0 0; padding-top: 20px">
        <q-card-section class="q-gutter-y-md">
          <div @click="onOpenDialogDetail()" class="cp; q-gutter-x-md">
            <div
              class="q-mb-md"
              style="
                border-radius: 7px;
                border: solid 2px #002245;
                padding: 10px;
              "
            >
              <span style="font-weight: 900; color: #002245">ดูข้อมูล</span>
            </div>
          </div>
          <div
            @click="onDeleteTimeline(selectedData.id)"
            class="cp; q-gutter-x-md"
          >
            <div
              class="q-mb-md"
              style="
                border-radius: 7px;
                border: solid 2px #002245;
                padding: 10px;
              "
            >
              <span style="font-weight: 900; color: #002245">ลบ</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogDetail">
      <q-card>
        <q-card-section class="q-gutter-y-md">
          {{ selectedData }}
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { fetchTimeline, deleteTimeline } from "src/boot/firebase";
import { useOnsaveAccount } from "src/pinia-store/account";
import { defineComponent, ref, onMounted, computed } from "vue";
export default defineComponent({
  name: "RecordPage",

  setup() {
    const timeLineList = ref();
    const showMenu = ref();
    const dialogDetail = ref();
    const selectedData = ref();
    const accountPinia = useOnsaveAccount();
    const uid = computed(() => accountPinia.account);
    const account_timeline = ref();

    const onSelected = (item) => {
      showMenu.value = true;
      selectedData.value = item;
      console.log(selectedData.value);
    };

    const onOpenDialogDetail = () => {
      showMenu.value = false;
      dialogDetail.value = true;
    };

    const onDeleteTimeline = async (id) => {
      await deleteTimeline(id);
    };

    onMounted(async () => {
      if (uid.value) {
        const allTimeline = await fetchTimeline();
        account_timeline.value = allTimeline.timeline.filter(
          (data) => data.payload.account_id == uid.value.uid
        );
        console.log(account_timeline.value);
      }
    });

    return {
      timeLineList,
      onDeleteTimeline,
      account_timeline,
      onOpenDialogDetail,
      showMenu,
      onSelected,
      selectedData,
      dialogDetail,
    };
  },
});
</script>

<style>
</style>
