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

  return {
    projects,
    tasks,
    activeProjects,
    completedTasks,
    todoTasks,
    priorityScore,
    getPriorityLabel,
    saveData,
  };
}
