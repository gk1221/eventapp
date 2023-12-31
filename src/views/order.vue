<template>
  <div class="cwrapper alt">
    <div class="content">
      <ItemShow
        :NowPrice="NowPrice"
        :Sellitem="Sellitem"
        :StartPrice="StartPrice"
      />

      <OrderBox />
      <div class="clear"></div>
    </div>
  </div>
  <div class="cwrapper">
    <div class="content">
      <div class="cbox" style="margin-bottom: 20px">
        <ListBox :orderType="Sellitem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onBeforeUnmount } from "vue";
import ItemShow from "@/components/ItemShow.vue";

import ListBox from "@/components/ListBox.vue";
import OrderBox from "@/components/OrderBox.vue";

const Sellitem = ref("");

const StartPrice = 60;
const NowPrice = ref(0);

const fetchItem = async () => {
  const result = await axios.get(
    `http://localhost:3000/result/orderconference`
  );
  //console.log(result.data);
  if (result.data === "Error") {
    console.log("Fetch Item Error!");
  } else {
    result.data = result.data.filter((item) => item.type === "Itemtype")[0];
    // console.log("itemname=", result.data.ItemName);
    Sellitem.value = result.data.ItemName;
  }
};
fetchItem();

const fetchNowPrice = async (type) => {
  const result = await axios.get(
    `http://localhost:3000/result/orderconference`
  );
  //console.log(result.data);
  if (result.data === "Error") {
    console.log("Fetch NowPrice Error!");
  } else {
    NowPrice.value = result.data[0].metadata.NowPrice;
  }
};

fetchNowPrice();
const timer = setInterval(() => {
  fetchNowPrice();
}, 3000);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.textbox {
  margin-left: 10px;
  padding: 10px;
  font-size: 32px;
}
button {
  font-size: 50px;
}
</style>
