import { taskItem } from "./taskItem";

export const taskList = (list) => {
  if (list.length === 0) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
      Vous n'avez pas encore de tâche.
    </li>
    `;
  }

  let html = ``;
  for (let index = 0; index < list.length; index++) {
    const task = list[index];
    html += taskItem(task);
  }
  return html;
};
