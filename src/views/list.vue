<template>
  list
  <div v-for="data in response">
    <p>{{ data.language }}</p>
    <span>{{ data.people }} +{{ data.increment }} @{{ data.time }}</span>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import moment from "moment";

const response = ref(null);

const formattedDate = (time) => moment(time).format("YYYY/MM/DD HH:mm:ss");

const fetchData = async () => {
  const result = await axios.get("http://localhost:3000/list");
  //console.log(result);
  //response.value = { ...result.data, tidme: "SWW" };
  response.value = result.data.map((item) => {
    // 將每個物件複製到新的物件中
    const newItem = { ...item };

    // 將 time 屬性值轉換成 Date 物件並存入 newItem
    newItem.time = formattedDate(item.time);

    return newItem;
  });
};

//setInterval(() => fetchData(), 3000);

fetchData();
</script>
