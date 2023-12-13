<template>
  <list>
    <router-link :to="{ name: 'order' }"> order </router-link>
    >
    <router-link :to="{ name: 'list' }"> list </router-link>
    >
    <router-link :to="{ name: 'state' }"> state </router-link>>
  </list>
  <div>
    {{ node1 }}
    <list v-for="host in hosts">
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
const hosts = ref([]);
const hostcheck = async () => {
  const result = await axios.get(`http://localhost:3000/check`);
  console.log(result.data);
  hosts.value = [...result.data];
};

hostcheck();
console.log(hosts.value);
</script>
