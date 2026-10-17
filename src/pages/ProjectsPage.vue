<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-gutter-md q-mb-lg">
      <div>
        <div class="text-h4 text-weight-bold">Projects</div>
        <div class="text-subtitle1 text-grey-7">
          Manage and track your projects
        </div>
      </div>

      <q-btn
        color="primary"
        icon="add"
        label="New Project"
        @click="openCreateDialog"
      />
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="project in projects"
        :key="project.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="row items-start justify-between">
              <div class="text-h6 text-weight-medium">{{ project.name }}</div>

              <q-badge
                :color="statusColor(project.status)"
                :label="project.status"
              />
            </div>

            <div class="text-body2 text-grey-7 q-mt-sm">
              {{ project.description || "No description provided." }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row justify-between text-caption text-grey-7">
              <span>Start Date</span>
              <span>{{ project.startDate || "Not set" }}</span>
            </div>

            <div class="row justify-between text-caption text-grey-7">
              <span>Due date</span>
              <span>{{ project.dueDate || "Not set" }}</span>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              round
              icon="edit"
              color="primary"
              @click="openEditDialog(project)"
            >
              <q-tooltip>Edit project</q-tooltip>
            </q-btn>

            <q-btn
              v-if="project.status !== 'archived'"
              flat
              round
              icon="archive"
              color="warning"
              @click="confirmArchive(project)"
            >
              <q-tooltip>Archive project</q-tooltip>
            </q-btn>

            <q-btn
              flat
              round
              icon="delete"
              color="negative"
              @click="confirmDelete(project)"
            >
              <q-tooltip>Delete project permanently</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-card
      v-if="projects.length === 0"
      flat
      bordered
      class="text-center q-pa-xl"
    >
      <q-icon name="folder_open" size="48px" color="grey-5" />

      <div class="text-h6 q-mt-md">No projects yet</div>

      <div class="text-body2 text-grey-7 q-mb-md">
        Create your first project to start organizing your work
      </div>

      <q-btn
        color="primary"
        label="Create Project"
        icon="add"
        @click="openCreateDialog"
      />
    </q-card>
    <q-dialog v-model="dialogOpen" persistent>
      <q-card style="width: 500px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6">
            {{ editingProjectId ? "Edit Project" : "New Project" }}
          </div>
          <div class="text-body2 text-grey-7">
            {{
              editingProjectId
                ? "Update project details."
                : "Add a project to your workspace"
            }}
          </div>
        </q-card-section>

        <q-form @submit.prevent="createProject">
          <q-card-section class="q-gutter-md">
            <q-input
              v-model="form.name"
              label="Project name"
              outlined
              autofocus
              maxlength="100"
              :rules="[(value) => !!value.trim() || 'Project name is required']"
            />

            <q-input
              v-model="form.description"
              label="Description"
              type="textarea"
              outlined
              autogrow
              maxlength="100"
            />

            <q-select
              v-model="form.status"
              label="Status"
              outlined
              emit-value
              map-options
              :options="statusOptions"
            />

            <q-input
              v-model="form.startDate"
              label="Start Date"
              type="date"
              outlined
            />

            <q-input
              v-model="form.dueDate"
              label="Due Date"
              type="date"
              outlined
              :rules="[
                (value) =>
                  !value ||
                  !form.startDate ||
                  value >= form.startDate ||
                  'Due date must be on or after the start date',
              ]"
            />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="q-pa-md">
            <q-btn
              flat
              label="Cancel"
              color="grey-7"
              @click="dialogOpen = false"
            />

            <q-btn
              color="primary"
              :label="editingProjectId ? 'Save Changes' : 'Create Project'"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialogOpen">
      <q-card style="width: 480px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6">Delete Project?</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1">
            Are you sure you want to permanently delete
            <strong>{{ projectToDelete?.name }}</strong
            >?
          </div>

          <div class="text-body2 text-negative q-mt-md">
            This will also permanently delete all tasks belonging to this
            project. This action cannot be undone.
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="deleteDialogOpen = false" />

          <q-btn
            color="negative"
            label="Delete Permanently"
            @click="performDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useQuasar } from "quasar";
import { useTracker } from "src/composables/useTracker";

defineOptions({
  name: "ProjectsPage",
});

const $q = useQuasar();
const { projects, addProject, updateProject, archiveProject, deleteProject } =
  useTracker();

const dialogOpen = ref(false);
const editingProjectId = ref(null);
const deleteDialogOpen = ref(false);
const projectToDelete = ref(null);

const statusOptions = [
  { label: "Planned", value: "planned" },
  { label: "Active", value: "active" },
  { label: "On Hold", value: "on-hold" },
  { label: "Completed", value: "completed" },
];

const form = reactive({
  name: "",
  description: "",
  status: "planned",
  startDate: "",
  dueDate: "",
});

function resetForm() {
  Object.assign(form, {
    name: "",
    description: "",
    status: "planned",
    startDate: "",
    dueDate: "",
  });
}

function openCreateDialog() {
  editingProjectId.value = null;
  resetForm();
  dialogOpen.value = true;
}

function openEditDialog(project) {
  editingProjectId.value = project.id;

  Object.assign(form, {
    name: project.name,
    description: project.description,
    status: project.status,
    startDate: project.startDate,
    dueDate: project.dueDate,
  });

  dialogOpen.value = true;
}

function createProject() {
  if (form.dueDate && form.startDate && form.dueDate < form.startDate) {
    return;
  }

  if (editingProjectId.value) {
    updateProject(editingProjectId.value, {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
    });

    $q.notify({
      type: "positive",
      message: "Project edited successfully.",
    });
  } else {
    addProject({ ...form });

    $q.notify({
      type: "positive",
      message: "Project created successfully.",
    });
  }

  dialogOpen.value = false;
  editingProjectId.value = null;
}

function confirmArchive(project) {
  $q.dialog({
    title: "Archive Project?",
    message: `Archive "${project.name}"? You can keep its data without deleting it permanently.`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    archiveProject(project.id);

    $q.notify({
      type: "positive",
      message: "Project archived.",
    });
  });
}

function confirmDelete(project) {
  projectToDelete.value = project;
  deleteDialogOpen.value = true;
}

function performDelete() {
  if (!projectToDelete.value.id) return;

  deleteProject(projectToDelete.value.id);

  deleteDialogOpen.value = false;

  $q.notify({
    type: "positive",
    message: "Project permanently deleted.",
  });

  projectToDelete.value = null;
}

function statusColor(status) {
  const colors = {
    planned: "blue-grey",
    active: "positive",
    "on-hold": "warning",
    completed: "primary",
    archived: "grey",
  };

  return colors[status] || "grey";
}
</script>
