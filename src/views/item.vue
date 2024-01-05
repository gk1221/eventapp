<template>
  <div class="cwrapper alt">
    <div class="content">
      <div class="cbox">
        <h3>替換商品</h3>

        <div class="box">
          <div>
            <p>商品名稱</p>
            <input class="textbox" type="text" v-model="ItemName" />

            <p>起始金額</p>
            <input class="textbox" type="text" v-model="price" />

            <p>商品圖片</p>
            <input class="textbox" type="text" v-model="picURL" />

            <p>結束日期</p>
            <input class="textbox" type="text" v-model="etime" />
          </div>

          <div class="flist">
            <input
              type="submit"
              class="button blue"
              style="margin-left: 10px"
              value="新增商品"
              @click="SubmitItem"
            />
          </div>
        </div>
        <div>
          <h4>已新增的商品次數</h4>
          <div v-for="(thing, index) in Things" :key="index">
            <p>{{ index }} : {{ thing }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";
import axios from "axios";

const ItemName = ref("iPhone16");
const price = ref(60);
const etime = ref(moment().add(1, "M").format("YYYY/MM/DD HH:mm:ss"));
const picURL = ref(
  "https://s.yimg.com/cl/api/res/1.2/S3jWymbcJzjw9oLcpyyejA--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD03MDA7cT04NTtyb3RhdGU9YXV0bzt3PTcwMA--/https://s.yimg.com/ob/image/c6c14377-d518-415c-a2ee-fae2ea9a4d44.jpg"
);
const Things = ref({});

const SubmitItem = async () => {
  const body = {
    ItemName: ItemName.value,
    Picture: picURL.value,
    etime: etime.value,
    price: price.value,
  };
  const result = await axios.post("http://localhost:3000/add", body);
  await axios.post("http://localhost:3000/order", {
    type: ItemName.value,
    userName: null,
    increment: 0,
    price: price.value,
  });
  alert(result.data);
  get_thing();
};

const get_thing = async () => {
  const result = await axios.get(
    `http://localhost:3000/result/order_result_Apple`
  );

  if (result.data === "Error") {
    console.log("Fetch things Error!");
  } else {
    console.log(result.data[0]);
    Things.value = result.data[0].things;
  }
};
get_thing();
</script>

<style scoped>
.textbox {
  margin-left: 10px;
  padding: 10px;
  font-size: 16px;
}
.button {
  font-size: 20px;
}
.box {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.flist {
  display: flex;
  flex-direction: column;
}
</style>
