<template>
  <div class="cwrapper alt">
    <div class="content">
      <div class="cbox fleft">
        <h3>{{ Sellitem }}</h3>
        <div class="flist">
          <p ref="pic" @click="imgLarger">
            <img
              src="https://s.yimg.com/cl/api/res/1.2/S3jWymbcJzjw9oLcpyyejA--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD03MDA7cT04NTtyb3RhdGU9YXV0bzt3PTcwMA--/https://s.yimg.com/ob/image/c6c14377-d518-415c-a2ee-fae2ea9a4d44.jpg"
              alt=""
            />
          </p>
        </div>
        <div class="flist">
          <p>起標金額</p>
          <span>{{ StartPrice }}</span>
        </div>
        <div class="flist boxdiv">
          <p>目前出價</p>
          <span class="big red">{{ NoWPrice }}</span>
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
          <p></p>
          <input
            type="submit"
            class="button blue"
            style="margin-left: 10px"
            value="競標"
            @click="SubmitEvent"
          />
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
  <div class="cwrapper">
    <div class="content">
      <div class="cbox" style="margin-bottom: 20px">
        <List :orderType="Sellitem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onBeforeUnmount } from "vue";

import List from "./list.vue";

const userName = ref("userA");
const Sellitem = ref("Apple iPhone 12 Pro 256G");
const userPrice = ref(6);
const upperBound = ref(200);

const pic = ref(null);

const StartPrice = 60;
const AllIncrement = ref(0);
const NoWPrice = ref(0);

const fetchIncrement = async (type) => {
  const result = await axios.get(
    `http://localhost:3000/result/order_result_Apple`
  );
  AllIncrement.value = result.data[0];

  NoWPrice.value = AllIncrement.value.sum + StartPrice;
};

const imgLarger = () => {
  const item = pic.value;
  if (item.classList.contains("larger")) {
    item.classList.remove("larger");
  } else {
    item.classList.add("larger");
  }
};

const SubmitEvent = async () => {
  const body = {
    username: userName.value,
    type: Sellitem.value,
    price: NoWPrice.value,
    increment: userPrice.value,
  };

  if (upperBound.value < NoWPrice.value + userPrice.value) {
    alert("已超過最高出價!");
  } else {
    const result = await axios.post("http://localhost:3000/order", body);
    alert(result.data);
  }
};

fetchIncrement();
const timer = setInterval(() => {
  fetchIncrement();
}, 3000);

onBeforeUnmount(() => {
  clearInterval(timer);
});
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
