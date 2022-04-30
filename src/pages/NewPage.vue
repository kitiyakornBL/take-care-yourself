<template>
  <q-page>
    <q-img
      style="margin-top: -30px; margin-bottom: 30px"
      src="images/newsBackground.png"
    ></q-img>
    <div style="padding: 0 10px" v-if="newsData?.news">
      <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
        style="
          width: 100%;
          height: 60vw;
          border-radius: 20px;
          box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
          margin-bottom: 30px;
        "
      >
        <q-carousel-slide :name="1" img-src="images/carouselImage.png" />
        <q-carousel-slide :name="2" img-src="images/113.jpg" />
        <q-carousel-slide :name="3" img-src="images/114.jpg" />
        <q-carousel-slide :name="4" img-src="images/115.jpg" />
      </q-carousel>
      <div
        v-for="(item, i) in newsData.news"
        :key="i"
        class="flex-row"
        style="
          gap: 10px;
          background-color: #f7f8fa;
          box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
          margin-bottom: 20px;
          padding: 20px 10px;
          border-radius: 20px;
        "
        @click="openNewTab(item.url)"
      >
        <div class="flex-col">
          <q-img
            :src="item.image"
            style="width: 170px; height: 150px; border-radius: 20px"
          ></q-img>
        </div>
        <div class="flex-col" style="word-break: break-all">
          <span style="font-weight: 600; color: #002245">{{ item.title }}</span>
          <span style="color: #002245">{{ item.desc.substring(0, 110) }}</span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { fetchNewsData } from "src/boot/firebase";
export default defineComponent({
  name: "NewPage",
  setup() {
    const newsData = ref();

    const openNewTab = (url) => {
      window.open(url);
    };
    onMounted(async () => {
      newsData.value = await fetchNewsData();
    });
    return {
      newsData,
      openNewTab,
      slide: ref(1),
    };
  },
});
</script>

<style></style>
