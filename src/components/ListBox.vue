<template>
  <h3>出價紀錄</h3>
  <div class="ultable">
    <ul class="lister lheader">
      <li>出價時間</li>
      <li>出價者</li>
      <li>出價增額/當時價格</li>
    </ul>
    <ul class="lister" v-for="data in response">
      <li>{{ data.time }}</li>
      <li>{{ data.people }}</li>
      <li>{{ data.increment }}/{{ parseInt(data.orderprice) }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import axios from "axios";
import moment from "moment";

const response = ref(null);
const ListType = defineProps({ orderType: String });

const fromnow = ref("");

const formattedDate = (time) => moment(time).format("YYYY/MM/DD HH:mm:ss");

const fetchData = async () => {
  const result = await axios.get(`http://localhost:3000/list`);
  await fetchItem();
  //console.log(result.data);
  if (result.data !== "Error") {
    response.value = result.data
      .filter((item) => item.type === ListType["orderType"])
      .filter((item) => item.time >= fromnow.value)
      .map((item) => {
        // 將每個物件複製到新的物件中
        const newItem = { ...item };
        newItem.time = formattedDate(item.time);
        return newItem;
      });
    // console.log(response.value);
  } else {
    console.log("Fetching List data Error!");
  }
};

const fetchItem = async () => {
  const result = await axios.get(
    `http://localhost:3000/result/orderconference`
  );
  //console.log(result.data);
  if (result.data === "Error") {
    console.log("Fetch Item Error!");
  } else {
    result.data = result.data.filter((item) => item.type === "Itemtype")[0];
    //console.log(result.data);
    fromnow.value = result.data.time;
  }
};
fetchData();

const timer = setInterval(() => fetchData(), 3000);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
