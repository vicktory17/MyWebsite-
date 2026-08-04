function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
    <span onclick="completeTask(this)">${taskInput.value}</span>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
`;

    taskList.appendChild(li);
saveTasks();

    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
saveTasks();
}

function completeTask(task) {
    task.classList.toggle("completed");
saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}

window.onload = loadTasks;
