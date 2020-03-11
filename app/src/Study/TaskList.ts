export type TaskType = "manual" | "supported";

export type PlotDef = {
  x: string;
  y: string;
};

type CategoryEncoding = {
  show: boolean;
  column: string;
};

export type TaskDescription = {
  id: string;
  task: string;
  dataset: string;
  plots: PlotDef[];
  category: CategoryEncoding;
  enablePlotAddition: boolean;
  taskType: TaskType;
};

const taskList: TaskDescription[] = [
  {
    id: "0",
    task:
      "Select the points which show a strong correlation in Physics and CS.",
    dataset: "cluster",
    plots: [{ x: "Physics", y: "CS" }],
    category: {
      show: false,
      column: "Profession"
    },
    enablePlotAddition: true,
    taskType: "manual"
  },
  {
    id: "1",
    task:
      "Select the points which belong to the cluster centered on the cross [SYMBOL].",
    dataset: "cluster",
    plots: [{ x: "Physics", y: "CS" }],
    category: {
      show: false,
      column: "Profession"
    },
    enablePlotAddition: false,
    taskType: "supported"
  }
];

export function getAllTasks(): TaskDescription[] {
  return taskList
    .map(d => ({ sort: Math.random(), value: d }))
    .sort((a, b) => a.sort - b.sort)
    .map(d => d.value);
}
