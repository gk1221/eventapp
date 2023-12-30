<template>
  <div class="cwrapper alt">
    <div class="content">
      <div class="cbox">
        <h3>出價</h3>

        <div class="box">
          <div>
            <p>商品名稱</p>
            <input class="textbox" type="text" v-model="ItemName" />

            <p>起始金額</p>
            <input class="textbox" type="text" v-model="price" />

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
const etime = ref(moment().add(1, "M").format("YYYY/MM/DD HH:mm"));

const SubmitItem = async () => {
  const body = {
    ItemName: ItemName.value,
    Picture:
      "https://s.yimg.com/cl/api/res/1.2/S3jWymbcJzjw9oLcpyyejA--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD03MDA7cT04NTtyb3RhdGU9YXV0bzt3PTcwMA--/https://s.yimg.com/ob/image/c6c14377-d518-415c-a2ee-fae2ea9a4d44.jpg",
    stime: etime.value,
    price: price.value,
  };
  const result = await axios.post("http://localhost:3000/add", body);
  alert(result.data);
};
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
