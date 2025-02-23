document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    setupThemeToggle();
    new Sortable(taskList, { animation: 150 });
});

function addTask() {
    let taskInput = document.getElementById("task");
    let category = document.getElementById("category").value;
    let dueDate = document.getElementById("dueDate").value;
    let task = taskInput.value.trim();

    if (task !== "") {
        let list = document.getElementById("taskList");
        let li = document.createElement("li");
        li.innerHTML = `<span>${task} <small>(${category})</small> <small>📅 ${dueDate}</small></span> 
                        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>`;
        li.addEventListener("click", toggleTaskCompletion);
        list.appendChild(li);

        saveTask({ task, category, dueDate });
        taskInput.value = "";
    }
}

function deleteTask(button) {
    let taskElement = button.parentElement;
    taskElement.remove();
    removeTaskFromStorage(taskElement.innerText.split("📅")[0].trim());
}

function toggleTaskCompletion(event) {
    if (event.target.tagName !== "BUTTON") {
        event.target.classList.toggle("completed");
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let list = document.getElementById("taskList");

    tasks.forEach(({ task, category, dueDate }) => {
        let li = document.createElement("li");
        li.innerHTML = `<span>${task} <small>(${category})</small> <small>📅 ${dueDate}</small></span>
                        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>`;
        li.addEventListener("click", toggleTaskCompletion);
        list.appendChild(li);
    });
}

function clearAllTasks() {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
}

/* Dark Mode Toggle */
function setupThemeToggle() {
    let themeSwitcher = document.getElementById("themeSwitcher");
    themeSwitcher.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", themeSwitcher.checked ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeSwitcher.checked = true;
    }
}
