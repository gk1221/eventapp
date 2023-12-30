<template>
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
      <span class="big red">{{ NowPrice }}</span>
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
</template>

<script setup>
import { ref } from "vue";
const { NowPrice, Sellitem, StartPrice } = defineProps([
  "NowPrice",
  "Sellitem",
  "StartPrice",
]);

const pic = ref(null);

const imgLarger = () => {
  const item = pic.value;
  if (item.classList.contains("larger")) {
    item.classList.remove("larger");
  } else {
    item.classList.add("larger");
  }
};
</script>
<style scoped>
.boxdiv {
  display: flex;
  align-items: center;
}
</style>
