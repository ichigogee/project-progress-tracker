<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-weight-bold">Tasks</div>

    <div class="text-subtitle1 text-grey-7 q-mt-sm">
      Manage and track your tasks
    </div>

    <q-card flat bordered class="q-mt-lg">
      <q-card-section class="text-center q-py-xl">
        <q-icon name="check_circle" size="48px" color="grey-5" />

        <div class="text-h6 q-mt-md">Upcoming tasks</div>

        <div class="text-body2 text-grey-7">
          This workspace will contain your tasks.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "TasksPage",
});
</script>
