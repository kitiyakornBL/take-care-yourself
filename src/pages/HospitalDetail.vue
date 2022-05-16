<template>
  <q-page style="padding: 0 20px 30px 20px">
    <q-btn
      @click="$router.go(-1)"
      unelevated
      icon="chevron_left"
      style="
        color: white;
        font-weight: 700;
        width: 40px;
        height: 40px;
        margin-bottom: 20px;
        border-radius: 10px;
        background-color: #04c5c9;
      "
    >
    </q-btn>
    <div class="q-gutter-y-md" v-if="hospitalDetail">
      <q-img :src="hospitalDetail.image" style="margin-bottom: 20px" />
      <div class="text-desc" style="font-weight: 900; font-size: 22px"></div>
      <div class="text-desc">
        <q-icon name="home" class="q-mr-md" />
        <span>{{ hospitalDetail.location }} </span>
      </div>
      <div class="text-desc">
        <q-icon name="facebook" class="q-mr-md" />
        <a class="editText" :href="hospitalDetail.facebook" target="_blank"
          >{{ hospitalDetail.facebook.substring(0, 30) }}...</a
        >
      </div>
      <div class="text-desc">
        <q-icon name="phone" class="q-mr-md" />
        <span
          ><a class="editText" :href="`tel:${hospitalDetail.tel}`">{{
            hospitalDetail.tel
          }}</a></span
        >
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchHopitalData } from "src/boot/firebase";
export default defineComponent({
  name: "HospitalDetail",
  setup() {
    const route = useRoute();
    const name = ref();
    const hospitalDetail = ref();
    const hospitalData = ref();
    onMounted(async () => {
      hospitalData.value = await fetchHopitalData();
      name.value = route.query.name;
      if (name.value) {
        hospitalDetail.value = hospitalData.value.hospital.find(
          (data) => data.name == name.value
        );
      }
    });
    return {
      name,
      hospitalDetail,
    };
  },
});
</script>

<style scoped>
.text-desc {
  color: #002245;
  font-size: 18px;
}

.editText {
  color: #002245;
  text-decoration: none;
}
</style>
