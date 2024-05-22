import "/style.scss";
import "remixicon/fonts/remixicon.css";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import { nav } from "./components/nav";
import { modal } from "./components/modal";
import { storage } from "./storage";
import { taskList } from "./components/taskList";

const app = document.getElementById("app");

let list = storage.getTasks();

app.innerHTML = `
    ${nav}
    <div class="container py-4 px-3 mx-auto">
      <h1>Ajouter des tâches</h1>
      <div class="mb-3">
        <label for="input-tache" class="form-label">Nom de la tâche</label>
        <input type="text" class="form-control" id="input-tache" placeholder="Une tâche à faire...">
      </div>
      <button class="btn btn-primary mb-4" id="ajouter-tache-btn"><i class="ri-add-line"></i></button>
      <h2>Liste des tâches</h2>
      <ul class="list-group" id="task-list">
        ${taskList(list)}
      </ul>
    </div>
    ${modal}
  `;

// Ajout d'une tache
const ajouterTache = () => {
  const input = document.getElementById("input-tache");

  let lastUsedId = 0;
  if (list.length > 0) {
    lastUsedId = list[list.length - 1].id;
  }

  const nouvelleTache = {
    id: lastUsedId + 1,
    name: input.value,
    is_done: false,
  };

  list = storage.addTask(nouvelleTache);

  document.getElementById("task-list").innerHTML = taskList(list);

  input.value = "";
};

document
  .getElementById("ajouter-tache-btn")
  .addEventListener("click", ajouterTache);

// Suppression d'une tache
let selectedTaskIdToDelete = null;
const deleteModal = document.getElementById("deleteModal");
deleteModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;

  selectedTaskIdToDelete = parseInt(button.getAttribute("data-bs-task-id"));
});

const deleteTask = () => {
  list = storage.deleteTask(selectedTaskIdToDelete);

  document.getElementById("task-list").innerHTML = taskList(list);
};

document
  .getElementById("delete-task-btn")
  .addEventListener("click", deleteTask);

// Gestion des checkbox pour marquer une tache comme faite
const checkboxes = document.querySelectorAll("input[type='checkbox']");

for (let index = 0; index < checkboxes.length; index++) {
  const checkbox = checkboxes[index];
  checkbox.addEventListener("change", (e) => {
    const id = e.currentTarget.value;
    storage.toggleDone(parseInt(id));
  });
}
