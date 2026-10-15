<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-weight-bold">Analytics</div>

    <div class="text-subtitle1 text-grey-7 q-mt-sm">
      View your analytics here
    </div>

    <q-card flat bordered class="q-mt-lg">
      <q-card-section class="text-center q-py-xl">
        <q-icon name="bar_chart" size="48px" color="grey-5" />

        <div class="text-h6 q-mt-md">KPIs</div>

        <div class="text-body2 text-grey-7">
          This workspace will contain your important KPIs
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "AnalyticsPage",
});
</script>
