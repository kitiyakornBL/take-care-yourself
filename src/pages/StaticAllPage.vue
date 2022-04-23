<template>
  <q-page style="padding: 0 10px">
    <div
      class="flex-row justify-between items-center"
      style="
        color: #a4a4a4;
        font-size: 12px;
        font-weight: 700;
        margin-top: -20px;
        padding-left: 10px;
      "
    >
      <q-icon name="arrow_back_ios" size="30px" @click="$router.go(-1)" />
      <span>*อัพเดทรายวัน</span>
    </div>
    <div class="static-card flex-row h-full w-full">
      <q-img src="images/14.jpg" fit="contain" />
      <div class="flex-col h-full text-right w-full" style="font-weight: 900">
        <span class="static-title text-black">สถานการณ์ผู้ติดเชื้อ</span>
        <span class="covid-19">COVID-19</span>
        <span
          class="static-title flex"
          style="margin-left: auto; flex-wrap: nowrap"
          ><div class="text-black">ทั้งหมดใน</div>
          ประเทศไทย</span
        >
      </div>
    </div>
    <div v-if="covidToday">
      <div
        class="flex-row"
        style="margin-bottom: 1rem"
        v-for="(items, i) in static_list"
        :key="i"
      >
        <div class="static-card w-full text-white" :style="color_list[i]">
          <div
            class="flex-row justify-between"
            style="font-weight: 900; font-size: 16px"
          >
            {{ items.title }} <q-img :src="items.icon" alt="" width="25px" />
          </div>
          <div
            class="flex-row justify-center"
            style="font-size: 36px; font-weight: 500"
          >
            {{ items.new }}
          </div>
          <div
            class="flex-row text-black justify-between items-center"
            style="
              font-weight: 700;
              font-size: 15px;
              padding: 5px;
              border-radius: 5px;
              background: white;
            "
          >
            <div class="flex-row" style="flex-wrap: nowrap">
              <q-img
                src="images/26.png"
                width="24px"
                style="margin-right: 3px"
              />
              สะสม
            </div>
            <span>{{ items.total }} คน</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { covidService } from "src/services/covid-service";
export default defineComponent({
  name: "StaticAllPage",

  setup() {
    const color_list = [
      {
        background: "#FE5472",
      },
      {
        background: "#039245",
      },
      {
        background: "#FDC500",
      },
      {
        background: "#4B4B4B",
      },
    ];
    const static_list = [
      {
        title: "จำนวนผู้ติดเชื้อรายใหม่",
        new: "",
        total: "",
        icon: "images/5.png",
      },
      {
        title: "หายแล้ว",
        new: "",
        total: "",
        icon: "images/8.png",
      },
      {
        title: "เฉพาะคนไทยรายใหม่",
        new: "",
        total: "",
        icon: "images/25.png",
      },
      {
        title: "เสียชีวิต",
        new: "",
        total: "",
        icon: "images/24.png",
      },
    ];
    const covidToday = ref();

    onMounted(async () => {
      covidToday.value = await covidService.fetchCovidToday();
      static_list[0].new = covidToday.value.new_case;
      static_list[0].total = covidToday.value.new_recovered;
      static_list[1].new = covidToday.value.total_recovered;
      static_list[1].total = covidToday.value.total_case;
      static_list[2].new = covidToday.value.new_case_excludeabroad;
      static_list[2].total = covidToday.value.total_case_excludeabroad;
      static_list[3].new = covidToday.value.new_death;
      static_list[3].total = covidToday.value.total_death;
    });
    return {
      covidToday,
      static_list,
      color_list,
    };
  },
});
</script>

<style scoped lang="scss">
.q-card__section--vert {
  padding: 7px;
}

.area-sec {
  position: relative;
  border: solid 2px black;
  border-radius: 5px;
  padding: 0.5rem;
  font-weight: 900;
}

span {
  margin: 3px 0;
}

.static-card {
  padding: 10px;
  gap: 10px;
}

.covid-19 {
  font-size: 34px;
  color: #00b3b7;
}

.static-title {
  font-size: 16px;
  color: #00b3b7;
}

.static-card {
  border-radius: 10px;
}
</style>
