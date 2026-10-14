<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Progress Tracker </q-toolbar-title>

        <q-btn
          flat
          rounddense
          icon="brightness_6"
          aria-label="Toggle theme"
          @click="$q.dark.toggle()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item-label header> WORKSPACE </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Dashboard",
    caption: "Progress at a glance",
    icon: "dashboard",
    link: "/",
  },
  {
    title: "Projects",
    caption: "Manage your projects",
    icon: "folder",
    link: "/projects",
  },
  {
    title: "Tasks",
    caption: "Track your next actions",
    icon: "check_circle",
    link: "/tasks",
  },
  {
    title: "Analytics",
    caption: "Review your progress",
    icon: "bar_chart",
    link: "/analytics",
  },
  {
    title: "Settings",
    caption: "Preferences and data",
    icon: "settings",
    link: "/settings",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
