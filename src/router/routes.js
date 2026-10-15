const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "projects", component: () => import("pages/ProjectsPage.vue") },
      { path: "tasks", component: () => import("pages/TasksPage.vue") },
      { path: "matrix", component: () => import("pages/MatrixPage.vue") },
      { path: "analytics", component: () => import("pages/AnalyticsPage.vue") },
      { path: "settings", component: () => import("pages/SettingsPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
