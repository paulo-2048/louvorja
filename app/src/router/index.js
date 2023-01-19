import * as VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/liturgy",
    name: "liturgy",
    component: () => import("@/views/Liturgy.vue"),
  },
  {
    path: "/tools",
    name: "tools",
    component: () => import("@/views/Tools.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/error",
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
