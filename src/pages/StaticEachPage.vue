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
      <q-img src="images/17.png" fit="contain" />
      <div class="flex-col h-full text-right w-full" style="font-weight: 900">
        <span class="static-title text-black">สถานการณ์ผู้ติดเชื้อ</span>
        <span class="covid-19">COVID-19</span>
        <span
          class="static-title flex"
          style="margin-left: auto; flex-wrap: nowrap"
          >รายพื้นที่</span
        >
      </div>
    </div>
    <div class="flex-col">
      <div class="flex-row">
        <div
          @click="showProvinceDialog = true"
          class="flex justiflex-center items-center"
          style="
            border-radius: 4px;
            background-color: #f2f2f2;
            width: 100%;
            height: 40px;
            margin-bottom: 10px;
            padding: 0 13px;
            flex-wrap: nowrap;
          "
        >
          <span style="font-weight: 900; color: #a4a4a4">
            {{ provinceValue }}
          </span>
          <q-icon
            class="flex"
            style="margin-left: auto; font-size: 25px; color: #002245"
            name="keyboard_arrow_down"
          />
        </div>
      </div>
    </div>
    <div v-if="selectedCovidData">
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

    <!-- dialog -->
    <q-dialog v-model="showProvinceDialog" position="bottom">
      <q-card style="border-radius: 20px 20px 0 0">
        <q-card-section class="flex justify-center">
          <div class="black-bar"></div>
        </q-card-section>
        <q-card-section>
          <div class="area-sec">--เลือกจังหวัด--</div>
        </q-card-section>
        <q-select
          behavior="menu"
          filled
          v-model="model"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="options"
          @filter="filterFn"
          @update:model-value="getProvince(model)"
          style="padding: 0 10px; padding-bottom: 32px"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                ไม่มีจังหวัดที่ค้นหา
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { covidService } from "src/services/covid-service";
export default defineComponent({
  name: "StaticEachPage",

  setup() {
    const color_list = [
      {
        background: "#FE5472",
      },
      {
        background: "#87C7C7",
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
    const province = [
      "กระบี่",

      "กรุงเทพมหานคร",

      "กาญจนบุรี",

      "กาญจนบุรี",

      "กำแพงเพชร",

      "ขอนแก่น",

      "จันทบุรี",

      "ฉะเชิงเทรา",

      "ชลบุรี",

      "ชัยนาท",

      "ชัยภูมิ",

      "ชุมพร",

      "ตรัง",

      "ตราด",

      "ตาก",

      "นครนายก",

      "นครปฐม",

      "นครพนม",

      "นครราชสีมา",

      "นครศรีธรรมราช",

      "นครสวรรค์",

      "นนทบุรี",

      "นราธิวาส",

      "น่าน",

      "บึงกาฬ",

      "บุรีรัมย์",

      "ปทุมธานี",

      "ประจวบคีรีขันธ์",

      "ปราจีนบุรี",

      "ปัตตานี",

      "พระนครศรีอยุธยา",

      "พะเยา",

      "พังงา",

      "พัทลุง",

      "พิจิตร",

      "พิษณุโลก",

      "ภูเก็ต",

      "มหาสารคาม",

      "มุกดาหาร",

      "ยะลา",

      "ยโสธร",

      "ร้อยเอ็ด",

      "ระนอง",

      "ระยอง",

      "ราชบุรี",

      "ลพบุรี",

      "ลำปาง",

      "ลำพูน",

      "ศรีสะเกษ",

      "สกลนคร",

      "สงขลา",

      "สตูล",

      "สมุทรปราการ",

      "สมุทรสงคราม",

      "สมุทรสาคร",

      "สระบุรี",

      "สระแก้ว",

      "สิงห์บุรี",

      "สุพรรณบุรี",

      "สุราษฎร์ธานี",

      "สุรินทร์",

      "สุโขทัย",

      "หนองคาย",

      "หนองบัวลำภู",

      "อ่างทอง",

      "อำนาจเจริญ",

      "อุดรธานี",

      "อุตรดิตถ์",

      "อุทัยธานี",

      "อุบลราชธานี",

      "เชียงราย",

      "เชียงใหม่",

      "เพชรบุรี",

      "เพชรบูรณ์",

      "เลย",

      "แพร่",

      "แม่ฮ่องสอน",
    ];
    const selectedCovidData = ref();
    const showProvinceDialog = ref(false);
    const model = ref("");
    const covidData = ref();
    const provinceValue = ref("กรุงเทพมหานคร");
    const getArea = (i) => {
      areaValue.value = area[i].name;
    };
    const getProvince = (i) => {
      provinceValue.value = i;
      fetchCovidByProvines();
    };
    const options = ref(province);
    const fetchCovidByProvines = async () => {
      selectedCovidData.value = covidData.value.filter(
        (res) => res.province == provinceValue.value
      )[0];
      static_list[0].new = selectedCovidData.value?.new_case;
      static_list[0].total = selectedCovidData.value?.total_case;
      static_list[1].new = selectedCovidData.value?.new_case_excludeabroad;
      static_list[1].total = selectedCovidData.value?.total_case_excludeabroad;
      static_list[2].new = selectedCovidData.value?.new_death;
      static_list[2].total = selectedCovidData.value?.total_death;
    };

    onMounted(async () => {
      covidData.value = await covidService.fetchCovidByProvinces();
      fetchCovidByProvines();
    });
    return {
      filterFn(val, update, abort) {
        if (val.length < 2) {
          abort();
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          options.value = province.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      province,
      model,
      options,
      provinceValue,
      selectedCovidData,
      getProvince,
      showProvinceDialog,
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
