import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Trello from "../views/Trello.vue";
import Planning from "../views/Planning.vue";
import Projects from "../views/Projects.vue";
import Team from "../views/Team.vue";
import Client from "../views/Client.vue";
import Login from "../views/Login.vue";
import Test from "../views/TestGrid.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/trello", component: Trello },
  { path: "/planning", component: Planning },
  { path: "/projects", component: Projects },
  { path: "/team", component: Team },
  { path: "/client", component: Client },
  { path: "/login", component: Login },
  { path: "/test", component: Test },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
