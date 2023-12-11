<template>
  <div class="boxdiv">
    <label>Your Name </label>
    <input class="textbox" type="text" v-model="userName" />
  </div>

  <div class="boxdiv">
    <label>Order type </label>
    <input class="textbox" type="text" v-model="type" />
  </div>

  <div class="boxdiv">
    <label>Your Price </label>
    <input type="text" class="textbox" v-model="userPrice" />
  </div>
  <div class="boxdiv">
    <label> Upperbound</label>
    <input type="text" class="textbox" v-model="userUp" />
  </div>
  <div>
    <button type="submit" @click="SubmitEvent">Submit</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const userName = ref("userA");
const type = ref("order-UFO");
const userPrice = ref(6);
const userUp = ref(200);

const SubmitEvent = async () => {
  const body = {
    username: userName.value,
    type: type.value,
    upbound: userUp.value,
    increment: userPrice.value,
  };
  console.log(body);

  const result = await axios.post("http://localhost:3000/order", body);
  console.log(result);
  alert(result.data);
};
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
