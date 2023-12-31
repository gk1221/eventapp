<template>
  <div class="cbox fleft">
    <h3>{{ Sellitem }}</h3>
    <div class="flist">
      <p ref="pic" @click="imgLarger">
        <img :src="picURL" alt="Null" />
      </p>
    </div>
    <div class="flist">
      <p>起標金額</p>
      <span>{{ StartPrice }}</span>
    </div>
    <div class="flist boxdiv">
      <p>目前出價</p>
      <span class="big red">{{ NowPrice }}</span>
    </div>
    <div class="flist">
      <p>起標時間</p>
      <span>{{ StartTime }}</span>
    </div>
    <div class="flist">
      <p>結標時間</p>
      <span>{{ EndTime }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import moment from "moment";

const { NowPrice } = defineProps(["NowPrice"]);

const Sellitem = ref("ItemName");
const StartPrice = ref(0);
const StartTime = ref(moment().add(1, "M").format("YYYY/MM/DD HH:mm"));
const EndTime = ref(moment().add(1, "M").format("YYYY/MM/DD HH:mm"));
const picURL = ref("");
const pic = ref("");

const imgLarger = () => {
  const item = pic.value;
  if (item.classList.contains("larger")) {
    item.classList.remove("larger");
  } else {
    item.classList.add("larger");
  }
};
const formattedDate = (time) => moment(time).format("YYYY/MM/DD HH:mm:ss");

const fetchItem = async () => {
  const result = await axios.get(
    `http://localhost:3000/result/orderconference`
  );
  //console.log(result.data);
  if (result.data === "Error") {
    console.log("Fetch NowPrice Error!");
  } else {
    result.data = result.data.filter((item) => item.type === "Itemtype")[0];
    Sellitem.value = result.data.ItemName;
    StartPrice.value = result.data.StartPrice;
    picURL.value = result.data.Picture;
    StartTime.value = formattedDate(result.data.time);
    //console.log();
    EndTime.value = formattedDate(result.data.metadata.Endtime);
    //  console.log(result.data);
  }
};
fetchItem();
</script>
<style scoped>
.boxdiv {
  display: flex;
  align-items: center;
}
</style>
