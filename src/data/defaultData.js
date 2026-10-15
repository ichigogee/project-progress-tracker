export const defaultProjects = [
  {
    id: "project-001",
    name: "Project Progress Tracker",
    description: "Personal project and progress management system.",
    status: "active",
    startDate: "2026-10-14",
    dueDate: "2026-10-18",
    createdAt: "2026-10-14T00:00:00.000Z",
    updatedAt: "2026-10-15T00:00:00.000Z",
  },
];

export const defaultTasks = [
  {
    id: "task-001",
    projectId: "project-001",
    title: "Build data architecture",
    description:
      "Define the project, task, priority, and persistence structure",
    status: "in-progress",
    impact: "5",
    urgency: "5",
    dueDate: "2026-10-15",
    subtasks: [
      {
        id: "subtask-001",
        title: "Define project model",
        completed: true,
      },
      {
        id: "subtask-002",
        title: "Define task model",
        completed: true,
      },
      {
        id: "subtask-003",
        title: "Build local data layer",
        completed: false,
      },
    ],
    createdAt: "2026-10-15T00:00:00.000Z",
    updatedAt: "2026-10-15T00:00:00.000Z",
  },
];
