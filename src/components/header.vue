<template>
  <div class="h-wrapper">
    <div class="header">
      <div class="logo">
        <router-link :to="{ name: 'home' }"> 商品競標模擬 </router-link>
      </div>
      <ul class="hnav">
        <li class="dash">
          <router-link :to="{ name: 'order' }"> 下標模擬 </router-link>
        </li>
        <li class="dash">
          <router-link :to="{ name: 'item' }"> 替換商品 </router-link>
        </li>
        <li class="last">
          <router-link v-if="show_state" :to="{ name: 'state' }">
            機器狀況
          </router-link>
        </li>
        <div class="clear"></div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const show_state = ref(false);
const passwordL = "38384040373937396665";
const pressed = [];
window.addEventListener("keyup", (e) => {
  pressed.push(e.keyCode);
  //splice(從後面數，保留密碼=鍵入次數數)
  pressed.splice(
    -passwordL.length / 2 - 1,
    pressed.length - passwordL.length / 2
  );
  if (pressed.join("") === passwordL) {
    show_state.value = true;
  }
});
</script>
