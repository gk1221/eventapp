<template>
  <div>Host Name = {{ response[1] }}</div>
  <div class="midline">
    <span>Status=</span>
    <img
      v-if="response[2] === 'running'"
      src="@/assets/green.png"
      alt="running"
    />
    <img v-else src="@/assets/red.png" alt="stopping" />
  </div>
  <div>CheckTime = {{ response[0] }}</div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";

const route = useRoute();
const props = defineProps(["prophost"]);
console.log(props);
const host = route.params.host || props.prophost;

const response = ref([]);

const formattedDate = (time) => moment(time).format("YYYY/MM/DD HH:mm:ss");

const fetchData = async (node) => {
  const result = await axios.get(`http://localhost:3000/check/${node}`);
  console.log(result.data);

  return result.data;
};

const setData = async () => {
  response.value = await fetchData(host);

  response.value[0] = formattedDate(response.value[0]);
  //console.log(response.value[2].replace("'", "").replace("'", ""));
  response.value[2] = response.value[2].replace("'", "").replace("'", "");

  if (response.value === null) response.value = "Host error";
};
setData();

const timer = setInterval(() => {
  setData();
}, 3000);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.midline {
  display: flex;
  align-items: center;
}
</style>
