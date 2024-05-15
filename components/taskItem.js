export const taskItem = (task) => {
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" ${task.is_done ? "checked" : ""} id="check-task-${task.id}">
                <label class="form-check-label" for="check-task-${task.id}">
                ${task.name}
                </label>
            </div>
            <div>
                <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                data-bs-task-id="${task.id}"
                >Supprimer</button>
            </div>
        </li>
        `
}