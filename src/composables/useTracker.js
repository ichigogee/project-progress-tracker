import { computed, ref } from "vue";
import { defaultProjects, defaultTasks } from "src/data/defaultData";

const STORAGE_KEY = "progress_tracker_data";

const loadData = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Failed to load tracker data:", error);
    }
  }

  return {
    projects: defaultProjects,
    tasks: defaultTasks,
  };
};

const data = ref(loadData());

const saveData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value));
};

export function useTracker() {
  const projects = computed(() => data.value.projects);
  const tasks = computed(() => data.value.tasks);

  const activeProjects = computed(() =>
    projects.value.filter((project) => project.status === "active")
  );

  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.status === "completed")
  );

  const todoTasks = computed(() =>
    tasks.value.filter((task) => task.status === "todo")
  );

  const priorityScore = (task) => task.impact * task.urgency;

  const getPriorityLabel = (task) => {
    const score = priorityScore(task);

    if (score >= 20) return "Critical";
    if (score >= 12) return "High";
    if (score >= 6) return "Medium";
    if (score >= 3) return "Low";

    return "Minimal";
  };

  const addProject = (projectInput) => {
    const now = new Date().toISOString();

    const project = {
      id: `project-${crypto.randomUUID()}`,
      name: projectInput.name.trim(),
      description: projectInput.description?.trim() || "",
      status: projectInput.status || "planned",
      startDate: projectInput.startDate || "",
      dueDate: projectInput.dueDate || "",
      createdAt: now,
      updatedAt: now,
    };

    data.value.projects.push(project);
    saveData();

    return project;
  };

  const updateProject = (projectId, updates) => {
    const project = data.value.projects.find((item) => item.id === projectId);

    if (!project) return false;

    Object.assign(project, updates, {
      updatedAt: new Date().toISOString(),
    });

    saveData();
    return true;
  };

  const archiveProject = (projectId) => {
    return updateProject(projectId, {
      status: "archived",
    });
  };

  const deleteProject = (projectId) => {
    data.value.projects = data.value.projects.filter(
      (project) => project.id !== projectId
    );

    //prevent orphaned records
    data.value.tasks = data.value.tasks.filter(
      (task) => task.projectId !== projectId
    );

    saveData();
  };

  return {
    projects,
    tasks,
    activeProjects,
    completedTasks,
    todoTasks,
    priorityScore,
    getPriorityLabel,
    saveData,
    addProject,
    updateProject,
    archiveProject,
    deleteProject,
  };
}
