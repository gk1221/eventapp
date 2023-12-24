<template>
    <Header />
    <div class="cwrapper">
        <div class="content">
          <h1>Welcome To 商品競標模擬</h1>
        </div>
    </div>
    <list>
      <router-link :to="{ name: 'order' }"> order </router-link>
      >
      <router-link :to="{ name: 'list' }"> list </router-link>
      >
      <router-link :to="{ name: 'state' }"> state </router-link>>
    </list>
    <div>
      <list v-for="i in host">
        <router-link :to="{ path: 'host/' + i }"> {{ i }} </router-link>>
      </list>
    </div>
  
    <div style="display: flex; justify-content: space-between">
      <div v-show="showrender" style="min-width: 420px">
        <Host :prophost="'node1'" />
      </div>
  
      <div v-show="showrender2" style="min-width: 420px">
        <Host :prophost="'node2'" />
      </div>
      <div v-show="showrender3" style="min-width: 420px">
        <Host :prophost="'node3'" />
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import Host from "./host.vue";
  import Header from "../components/header.vue"
  
  const host = ["node1", "node2", "node3"];
  const showrender = ref(true);
  const showrender2 = ref(false);
  const showrender3 = ref(false);
  
  onMounted(() => {
    // const mount = setTimeout(() => {
    //   showrender.value = true;
    // }, 200); // 2秒後顯示內容
  
    const mount2 = setTimeout(() => {
      showrender2.value = true;
    }, 100); // 2秒後顯示內容
  
    const mount3 = setTimeout(() => {
      showrender3.value = true;
    }, 100); // 2秒後顯示內容
  });
  </script>
  