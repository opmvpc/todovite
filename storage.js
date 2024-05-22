export const storage = {
  getTasks: () => {
    return JSON.parse(localStorage.getItem("tasks")) ?? [];
  },

  addTask: (task) => {
    const tasks = storage.getTasks();
    tasks.push(task);
    storage.saveTasks(tasks);

    return tasks;
  },

  deleteTask: (id) => {
    let tasks = storage.getTasks();
    tasks = tasks.filter((task) => {
      return task.id !== id;
    });
    storage.saveTasks(tasks);

    return tasks;
  },

  toggleDone: (id) => {
    const tasks = storage.getTasks();
    const task = tasks.find((t) => t.id === id);
    task.is_done = !task.is_done;
    storage.saveTasks(tasks);
  },

  saveTasks: (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },
};
