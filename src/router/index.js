import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import order from "@/views/order.vue";
import state from "@/views/state.vue";
import Host from "@/views/Host.vue";
import item from "@/views/item.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/order",
      name: "order",
      component: order,
    },
    {
      path: "/item",
      name: "item",
      component: item,
    },
    {
      path: "/state",
      name: "state",
      component: state,
    },
    {
      path: "/host/:host",
      name: "host/:host",
      component: Host,
    },
  ],
});

export default router;
