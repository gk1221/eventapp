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
<<<<<<< HEAD

  response.value = result.data[0];
};

=======
  console.log(result.data);
  response.value = result.data[0];
};

setInterval(() => fetchData(), 3000);

>>>>>>> 3b3155418d8bf7dabe112cbc81f8d6e3e984c5f9
fetchData();
</script>
