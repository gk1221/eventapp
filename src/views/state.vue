<template>
  <h1>state</h1>
  <div>Things name: {{ response.thing }}</div>
  <div>userA order: {{ response.userA }}</div>
  <div>userB order: {{ response.userB }}</div>
  <div>NOW order: {{ response.sum }}</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const response = ref(null);

const fetchData = async () => {
  const result = await axios.get("http://localhost:3000/result");
  console.log(result.data);
  response.value = result.data[result.data.length - 1];
};

fetchData();
</script>
