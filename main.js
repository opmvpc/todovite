import "/style.scss";
import { nav } from "./components/nav";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { taskItem } from "./components/taskItem";
import { modal } from "./components/modal";

const app = document.getElementById("app");

let list = [
  {
    id: 1,
    name: "Acheter nourriture pour le chat",
    is_done: false,
  },
  {
    id: 2,
    name: "Faire le devoir pour le cours de js",
    is_done: true,
  },
]

const renderTaskList = (list) => {
  if (list.length === 0) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
      Vous n'avez pas encore de tâche.
    </li>
    `
  }

  let html = ``
  for (let index = 0; index < list.length; index++) {
    const task = list[index];
    html += taskItem(task)
  }
  return html
}

app.innerHTML = `
    ${nav}
    <div class="container py-4 px-3 mx-auto">
      <h1>Ajouter des tâches</h1>
      <div class="mb-3">
        <label for="input-tache" class="form-label">Nom de la tâche</label>
        <input type="text" class="form-control" id="input-tache" placeholder="Une tâche à faire...">
      </div>
      <button class="btn btn-primary mb-4" id="ajouter-tache-btn">Ajouter</button>
      <h2>Liste des tâches</h2>
      <ul class="list-group" id="task-list">
        ${renderTaskList(list)}
      </ul>
    </div>
    ${modal}
  `;



const ajouterTache = () => {
  const input = document.getElementById("input-tache")

  let lastUsedId = 0;
  if (list.length > 0)
  {
     lastUsedId = list[list.length-1].id

  }

  const nouvelleTache = {
    id: lastUsedId + 1,
    name: input.value,
    is_done: false,
  }

  list.push(nouvelleTache)

  document.getElementById("task-list").innerHTML = renderTaskList(list)

  input.value = ""
}

const btnAjouter = document.getElementById("ajouter-tache-btn")

btnAjouter.addEventListener("click", ajouterTache)


let selectedTaskIdToDelete = null;
const deleteModal = document.getElementById('deleteModal')
deleteModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget

  selectedTaskIdToDelete = parseInt(button.getAttribute('data-bs-task-id'))
})

const deleteTask = () => {
  list = list.filter((task) => {
    return task.id !== selectedTaskIdToDelete
  })

  document.getElementById("task-list").innerHTML = renderTaskList(list)
}

document.getElementById("delete-task-btn").addEventListener("click", deleteTask)