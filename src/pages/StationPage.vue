<template>
  <q-page style="padding: 0 20px 30px 20px">
    <div class="row" style="width: 100%">
      <div style="width: 100%">
        <div
          @click="showBuildingDialog = true"
          class="flex justiflex-center items-center"
          style="
            border-radius: 10px;
            background-color: #f2f2f2;
            width: 100%;
            height: 40px;
            margin-bottom: 10px;
            padding: 0 13px;
          "
        >
          <span style="font-weight: 500; color: #002245">
            {{ building }}
          </span>
          <q-icon
            class="flex"
            style="margin-left: auto; font-size: 25px; color: #002245"
            name="domain"
          />
        </div>
      </div>
      <div class="row" style="width: 100%; margin-bottom: 20px">
        <iframe
          :src="map"
          style="border: 0; width: 100%; height: 100vw"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="row q-gutter-y-md" style="width: 100%; gap: 10px">
        <div class="row" style="width: 100%; gap: 20px">
          <div
            class="col flex-1 flex items-center justify-center"
            style="
              border-radius: 10px;
              height: 20vw;
              background-color: #fe5472;
              color: white;
            "
          >
            <div class="col">
              <div class="row justify-center">
                <span class="flex items-center q-pr-sm" style="font-weight: 500"
                  >จำนวนผู้ติดเชื้อ
                </span>
                <img src="images/5.png" style="width: 30px; height: 30px" />
              </div>
              <div class="row justify-center">
                <span style="font-weight: 500; font-size: 26px"
                  >{{ onFilterData }}
                </span>
              </div>
            </div>
          </div>
          <div
            class="col flex-1 flex items-center justify-center"
            style="
              border-radius: 10px;
              height: 20vw;
              background-color: #fdc500;
              color: white;
            "
          >
            <div class="col">
              <div class="row justify-center">
                <span class="flex items-center q-pr-sm" style="font-weight: 500"
                  >ความเสี่ยง
                </span>
                <img src="icons/u_home.png" style="width: 30px; height: 30px" />
              </div>
              <div class="row justify-center" v-if="sum">
                <span style="font-weight: 500; font-size: 26px"
                  >{{ percent }} %</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row" style="width: 100%; gap: 20px">
          <div
            class="col flex-1 flex items-center justify-center"
            style="
              border-radius: 10px;
              height: 20vw;
              background-color: #039245;
              color: white;
            "
          >
            <div class="col">
              <div class="row justify-center">
                <span class="flex items-center q-pr-sm" style="font-weight: 500"
                  >ระดับประชากร
                </span>
                <img
                  src="icons/user-group.png"
                  style="width: 30px; height: 30px"
                />
              </div>
              <div class="row justify-center">
                <span style="font-weight: 500; font-size: 26px">-</span>
              </div>
            </div>
          </div>
          <div
            class="col flex-1 flex items-center justify-center"
            style="
              border-radius: 10px;
              height: 20vw;
              background-color: #4b4b4b;
              color: white;
            "
          >
            <div class="col">
              <div class="row justify-center">
                <span class="flex items-center q-pr-sm" style="font-weight: 500"
                  >ผู้ติดเชื้อรายใหม่
                </span>
                <img src="icons/users.png" style="width: 30px; height: 30px" />
              </div>
              <div class="row justify-center">
                <span style="font-weight: 500; font-size: 26px">{{
                  today
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- q-dialog -->
    <q-dialog v-model="showBuildingDialog" position="bottom">
      <q-card style="border-radius: 20px 20px 0 0; padding-top: 20px">
        <q-card-section class="q-gutter-y-md">
          <div class="cp; q-gutter-x-md">
            <div
              v-for="(item, index) in buildingObtions"
              :key="index"
              class="q-mb-md"
              style="
                border-radius: 7px;
                border: solid 2px #002245;
                padding: 10px;
              "
              @click="onSetBuilding(item)"
            >
              <span style="font-weight: 900; color: #002245">{{ item }}</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/th";
import { fetchTimeline } from "src/boot/firebase";
import { defineComponent, ref, watchEffect, onMounted } from "vue";
export default defineComponent({
  name: "StationPage",

  setup() {
    const date = ref(dayjs(Date.now()).format("YYYY/MM/DD"));
    const data = ref();
    const onFilterData = ref();
    const map = ref();
    const percent = ref(0);
    const sum = ref(0);
    const today = ref();
    const showBuildingDialog = ref();
    const building = ref("อาคาร 6 อาคารเรียนรวมและปฏิบัติการกลาง");
    const buildingObtions = ref([
      "อาคาร 6 อาคารเรียนรวมและปฏิบัติการกลาง",
      "อาคาร 1A ภาควิชาวิศวกรรมคอมพิวเตอร์",
      "อาคาร 2 คณะการบริการและการท่องเที่ยว",
      "โรงแรม พี เอส ยู ลอดจ์",
      "ศูนย์อำนวยการร่วมรักษาความปลอดภัย",
      "สนามบาสเกตบอล",
      "โรงบำบัดน้ำเสีย",
    ]);
    const onSetBuilding = (item) => {
      building.value = item;
    };

    const onFilter = () => {
      onFilterData.value = data.value?.timeline.filter((data) =>
        data.payload.data
          .find((x) => x)
          ?.detail.find((x) => x.location == building.value)
      ).length;
      today.value = data.value?.timeline.filter((data) =>
        data.payload.data
          .find((x) => x.date == date.value)
          ?.detail.find((x) => x.location == building.value)
      ).length;
      percent.value = ((onFilterData.value / sum.value) * 100).toFixed(2);
    };

    onMounted(async () => {
      data.value = await fetchTimeline();
      buildingObtions.value.forEach((d) => {
        sum.value += data.value?.timeline.filter((data) =>
          data.payload.data.find((x) => x)?.detail.find((x) => x.location == d)
        ).length;
      });
      onFilter();
    });

    watchEffect(() => {
      if (building.value) {
        console.log(building.value);
        if (building.value == "อาคาร 6 อาคารเรียนรวมและปฏิบัติการกลาง") {
          map.value =
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2349.879323144288!2d98.35132725632087!3d7.8940009516011544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305031eff9f00bf5%3A0x7eb34946c8fa5432!2sCOC!5e0!3m2!1sth!2sth!4v1652230112393!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';
        }
        if (building.value == "อาคาร 1A ภาควิชาวิศวกรรมคอมพิวเตอร์") {
          map.value =
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.0027357209874!2d98.34969090882984!3d7.894781200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305031b105d687e7%3A0xb24d9d05af2986c2!2z4Lir4LmJ4Lit4LiH4Liq4LmC4Lih4Liq4Lij4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LiB4Liy4Lij4LiE4Lit4Lih4Lie4Li04Lin4LmA4LiV4Lit4Lij4LmM!5e0!3m2!1sth!2sth!4v1652230157179!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';
        }
        if (building.value == "อาคาร 2 คณะการบริการและการท่องเที่ยว") {
          map.value =
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988.0023105028503!2d98.35115642889268!3d7.894100933301135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30503034c540e595%3A0xaf83f017faa7de0d!2z4LiE4LiT4Liw4LiB4Liy4Lij4Lia4Lij4Li04LiB4Liy4Lij4LmB4Lil4Liw4LiB4Liy4Lij4LiX4LmI4Lit4LiH4LmA4LiX4Li14LmI4Lii4LinIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC4quC4h-C4guC4peC4suC4meC4hOC4o-C4tOC4meC4l-C4o-C5jA!5e0!3m2!1sth!2sth!4v1652230216019!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';
        }
        if (building.value == "โรงแรม พี เอส ยู ลอดจ์") {
          map.value =
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1397.2459787816122!2d98.35076979833671!3d7.894186220414047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30503034c5a8c987%3A0xb9341947be62c603!2sPSU%20Lodge!5e0!3m2!1sth!2sth!4v1652230235027!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';
        }
        if (building.value == "ศูนย์อำนวยการร่วมรักษาความปลอดภัย") {
          map.value =
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d984.0822728058474!2d98.35279681873452!3d7.895797654175432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30503121f93a391b%3A0x5b8b48a9ffdd819d!2z4Lio4Li54LiZ4Lii4LmM4Lib4Lij4Liw4Liq4Liy4LiZ4LiB4Liy4Lij4Liq4LmI4LiH4LmA4Liq4Lij4Li04Lih4Liq4Li44LiC4Lig4Liy4Lie4Lit4Lix4LiZ4LiU4Liy4Lih4Lix4LiZIChBbmRhbWFuIEhlYWx0aCBhbmQgTWFuYWdlbWVudCBDZW50ZXIp!5e0!3m2!1sth!2sth!4v1652230288683!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';
        }
        if (building.value == "สนามบาสเกตบอล") {
          map.value =
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d698.619406613621!2d98.3513033984842!3d7.896305052676385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305030354de8f3dd%3A0x327d72c87183a4b4!2sSports%20Complex%20PSU%20Phuket!5e0!3m2!1sth!2sth!4v1652230310074!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';
        }
        if (building.value == "โรงบำบัดน้ำเสีย") {
          map.value =
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d587.4718866850408!2d98.35112873125263!3d7.892554700788396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30503034bcf43bdd%3A0x3f58700d006f67a5!2z4LiX4Li14LmI4LiI4Lit4LiU4Lij4LiWIOC4leC4s-C4muC4pSDguIHguLDguJfguLnguYkg4Lit4Liz4LmA4Lig4Lit4LiB4Liw4LiX4Li54LmJIOC4oOC4ueC5gOC4geC5h-C4lSA4MzEyMA!5e0!3m2!1sth!2sth!4v1652230340843!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';
        }
        onFilter();
      }
    });
    return {
      showBuildingDialog,
      buildingObtions,
      onFilterData,
      today,
      sum,
      map,
      percent,
      building,
      onSetBuilding,
    };
  },
});
</script>

<style></style>
