<template>
  <list>
    <router-link :to="{ name: 'order' }"> order </router-link>
    >
    <router-link :to="{ name: 'list' }"> list </router-link>
    >
    <router-link :to="{ name: 'state' }"> state </router-link>>
  </list>
  <div>
    <list v-for="host in response.value">
      {{ host }}
      {{ host.host }}
      <img
        v-if="host.status.includes('running')"
        src="@/assets/green.png"
        alt="running"
      />
      <img v-else src="@/assets/red.png" alt="stopping" />
    </list>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

//{host, status}
const any = ["node1", "node2", "node3"];
let hosts = [];

const response = ref([]);

const fetchData = async () => {
  const result1 = await axios.get("http://localhost:3000/check/node1");
  const result2 = await axios.get("http://localhost:3000/check/node2");
  const result3 = await axios.get("http://localhost:3000/check/node3");
  console.log(result2.data);
  response.value = [];
  await response.value.push(result1.data);
  await response.value.push(result2.data);
  await response.value.push(result3.data);
};

setInterval(() => {
  fetchData();
  console.log("resp=", response.value);
}, 5000);
</script>
