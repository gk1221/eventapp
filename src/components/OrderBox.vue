<template>
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
</template>

<script setup>
import axios from "axios";
import { ref, defineProps } from "vue";

const userName = ref("userA");
const userPrice = ref(5);
const upperBound = ref(500000);
const localNowPrice = ref(0);

const { Sellitem } = defineProps(["Sellitem"]);

const SubmitEvent = async () => {
  await fetchIncrement();
  //console.log("local=", localNowPrice.value);
  if (upperBound.value > localNowPrice.value + userPrice.value) {
    const body = {
      username: userName.value,
      type: Sellitem,
      price: localNowPrice.value + userPrice.value,
      increment: userPrice.value,
    };

    const result = await axios.post("http://localhost:3000/order", body);
    alert(result.data);
  } else {
    alert("已超過最高出價!");
  }
};

const fetchIncrement = async () => {
  const result = await axios.get(
    `http://localhost:3000/result/order_result_Apple`
  );
  //console.log("befororder=", result.data);
  if (result.data === "Error") {
    console.log("Error=", result.data);
  } else {
    localNowPrice.value = result.data[0].sum;
  }
};
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
