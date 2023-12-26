<template>
  <div>Host Name = {{ response[1] }}</div>
  <div>
    Status={{ response[2] }}
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
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";

const route = useRoute();
const props = defineProps(["prophost"]);
console.log(props);
const host = route.params.host || props.prophost;

const response = ref([]);

const fetchData = async (node) => {
  const result = await axios.get(`http://localhost:3000/check/${node}`);
  console.log(result.data);
  return result.data;
};
async function setData() {
  response.value = await fetchData(host);

  const formattedDate = (time) => moment(time).format("YYYY/MM/DD HH:mm:ss");
  response.value[0] = formattedDate(response.value[0]);

  console.log("cout", response.value);
  if (response.value === null) response.value = "Host error";
}
setData();
setTimeout(() => {
  setData();
}, 800);
</script>
