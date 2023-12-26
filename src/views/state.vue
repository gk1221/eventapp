<template>
  <div class="cwrapper">
    <div class="content mt-18">
      <Host :prophost="'node1'" />
    </div>
    <div class="content mt-18">
      <Host :prophost="'node2'" />
    </div>
    <div class="content mt-18">
      <Host :prophost="'node3'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Host from "@/views/Host.vue";
</script>

<style scoped>
.mt-18 {
  margin-top: 50px;
}
</style>
