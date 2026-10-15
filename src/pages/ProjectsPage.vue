<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-weight-bold">Projects</div>

    <div class="text-subtitle1 text-grey-7 q-mt-sm">
      Manage and track your projects
    </div>

    <q-card flat bordered class="q-mt-lg">
      <q-card-section class="text-center q-py-xl">
        <q-icon name="folder" size="48px" color="grey-5" />

        <div class="text-h6 q-mt-md">Upcoming projects</div>

        <div class="text-body2 text-grey-7">
          This workspace will contain your projects.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "ProjectsPage",
});
</script>
