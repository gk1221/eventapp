<template>
  <Header />
  <div class="cwrapper alt">
    <div class="content">
      <div class="cbox fleft">
        <h3>Apple iPhone 12 Pro 256G</h3>
        <div class="flist">
          <p ref="pic" @click="imgLarger"><img src="https://s.yimg.com/cl/api/res/1.2/S3jWymbcJzjw9oLcpyyejA--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD03MDA7cT04NTtyb3RhdGU9YXV0bzt3PTcwMA--/https://s.yimg.com/ob/image/c6c14377-d518-415c-a2ee-fae2ea9a4d44.jpg" alt=""></p>
        </div>
        <div class="flist">
          <p>起標金額</p>
          <span class="big red">6000</span>
        </div>
        <div class="flist">
          <p>目前出價</p>
          <span>無</span>
        </div>
        <div class="flist">
          <p>起標時間</p>
          <span>2023/12/01 22:00:00</span>
        </div>
        <div class="flist">
          <p>結標時間</p>
          <span>2024/01/31 23:59:00</span>
        </div>
      </div>
      <div class="cbox fright">
        <h3>出價</h3>
        <div class="flist">
          <p>競標人姓名</p>
          <input class="textbox" type="text" v-model="userName" />
        </div>
        <div class="flist">
          <p>出價增額</p>
          <input class="textbox" type="text" v-model="userPrice" />
        </div>
        <div class="flist">
          <p>最高出價</p>
          <input class="textbox" type="text" v-model="upperBound" />
        </div>
        <div class="flist">
          <p> </p>
          <input type="submit" class="button blue" style="margin-left: 10px;" value="競標" @click="SubmitEvent">
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
  <div class="cwrapper">
    <div class="content">
      <div class="cbox" style="margin-bottom:20px;">
        <List />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

import Header from "../components/header.vue"
import List from "./list.vue"

// const userName = ref("userA");
// const type = ref("order-UFO");
// const userPrice = ref(6);
// const userUp = ref(200);

const pic = ref(null);

function imgLarger() {
  const item = pic.value;
  if (item.classList.contains("larger")) {
    item.classList.remove("larger");
  } else {
    item.classList.add("larger");
  }
}

const SubmitEvent = async () => {
  const body = {
    // username: userName.value,
    // type: type.value,
    // upbound: userUp.value,
    // increment: userPrice.value,
  };
  console.log(body);

  // const result = await axios.post("http://localhost:3000/order", body);
  console.log(result);
  alert(result.data);
};




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

// setInterval(() => fetchData(), 3000);

// fetchData();
</script>

<style scoped>
.boxdiv {
  display: flex;
  align-items: center;
}
.textbox {
  margin-left: 10px;
  padding: 10px;
  font-size: 32px;
}
button {
  font-size: 50px;
}
</style>
