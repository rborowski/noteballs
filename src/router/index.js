import { createRouter, createWebHashHistory } from "vue-router"
import ViewNotes from "../views/ViewNotes.vue"
import ViewStats from "../views/ViewStats.vue"
import ViewEdit from "../views/ViewEdit.vue"

const routes = [
  {
    path: "/",
    name: "Notes",
    component: ViewNotes
  },
  {
    path:"/stats",
    name: "Stats",
    component: ViewStats
  },
  {
    path:"/edit/:id",
    name: "Edit",
    component: ViewEdit
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
