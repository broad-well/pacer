//import { Task } from "./task"

const Xtask = xtag.create('x-task', class extends XTagElement {
    constructor(task) {
        super()
        this.task = task
    }

    '::template(true)'() {
        const unitsDone = this.task.expectedUnitsDone(new Date())
        return `<div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${this.task.name}</h5>
                <big class="font-weight-bold">${unitsDone} ${this.task.workUnit}</big>
            </div>
            <p class="m-0">${this.task.numWorkUnits} ${this.task.workUnit} from
            ${this.task.startDate.toISOString().substr(0, 10)} to ${this.task.endDate.toISOString().substr(0, 10)}</p>
            <progress max="${this.task.numWorkUnits}" value="${unitsDone}"></progress>
        </div>`
    }
})

let currentTasks = []
const taskContainer = document.querySelector('#task-container')

function renderTasks() {
    taskContainer.innerHTML = ''
    for (let task of currentTasks) {
        const taskElement = new Xtask(task)
        taskContainer.appendChild(taskElement)
    }
}

function onAddTaskSubmit(event) {
    event.preventDefault()
    const name = document.querySelector('#snt-name').value
    const startDate = document.querySelector('#snt-start-date').value
    const endDate = document.querySelector('#snt-end-date').value
    const numUnits = document.querySelector('#snt-num-workunits').value
    const unit = document.querySelector('#snt-workunit').value
    currentTasks.push(new Task(name, new Date(startDate + ' EST'), new Date(endDate + ' EST'), parseInt(numUnits), unit))
    renderTasks()
    saveTasks()
}

function saveTasks() {
    const json = JSON.stringify(currentTasks.map(it => it.toObject()))
    localStorage.setItem('tasks', json)
}

function loadTasks() {
    const json = localStorage.getItem('tasks')
    if (json != null) {
        currentTasks = JSON.parse(json).map(Task.fromObject)
    }
}

document.forms[0].onsubmit = onAddTaskSubmit

loadTasks()
renderTasks()