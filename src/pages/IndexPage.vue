<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h4 text-weight-bold">Dashboard</div>
        <div class="text-subtitle1 text-grey-7">
          Projects, priorities, and progress in one place
        </div>
      </div>

      <q-btn color="primary" icon="bold" label="New Project" to="/projects" />
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="col-12 col-sm-6 col-lg-3"
      >
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="text-subtitle2 text-grey-7">{{ stat.label }}</div>
              <q-icon :name="stats.icon" size="sm" color="primary" />
            </div>

            <div class="text-h4 text-weight-bold q-mt-sm">{{ stat.value }}</div>

            <div class="text-caption text-grey-7 q-mt-xs">
              {{ stat.description }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-12 col-lg-7">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">My Workspace</div>
            <div class="text-body2 text-grey-7">project overview</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="text-center q-py-xl">
            <q-icon name="folder_open" size="48px" color="grey-5" />
            <div class="text-subtitle1 q-mt-md">Let's organize your work!</div>
            <div class="text-body2 text-grey-7 q-mb-md">
              Create your first project to get started.
            </div>
            <q-btn
              outline
              color="primary"
              label="View Projects"
              to="/projects"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-lg-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Quick Actions</div>
          </q-card-section>

          <q-list separator>
            <q-item clickable to="/tasks">
              <q-item-section avatar>
                <q-icon name="check_circle" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>View Tasks</q-item-label>
                <q-item-label caption> Review next actions </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>

            <q-item clickable to="/matrix">
              <q-item-section avatar>
                <q-icon name="grid_view" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Prioritize Work</q-item-label>
                <q-item-label caption>Comapre impact and urgency</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>

            <q-item clickable to="/analytics">
              <q-item-section avatar>
                <q-icon name="bar_chart" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>View Analytics</q-item-label>
                <q-item-label caption>Track progress over time</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from "vue";

defineOptions({
  name: "IndexPage",
});

const stats = computed(() => [
  {
    label: "Active Projects",
    value: "0",
    description: "Projects in progress",
    icon: "folder",
  },
  {
    label: "Tasks To Do",
    value: "0",
    description: "Tasks awaiting action",
    icon: "check_circle",
  },
  {
    label: "Completed",
    value: "0",
    description: "Tasks completed",
    icon: "task_alt",
  },
]);
</script>
