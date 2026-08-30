let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// Add Task

function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    input.value = "";

    displayTasks();
}


// Display Tasks

function displayTasks() {

    const taskList = document.getElementById("taskList");
    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.text.toLowerCase().includes(searchText);

        if (currentFilter === "completed") {
            return task.completed && matchesSearch;
        }

        if (currentFilter === "pending") {
            return !task.completed && matchesSearch;
        }

        return matchesSearch;
    });


    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        li.innerHTML = `
            <span
                class="task-text ${task.completed ? "completed" : ""}"
                onclick="toggleTask(${task.id})"
            >
                ${task.text}
            </span>

            <div class="actions">

                <button
                    class="edit"
                    onclick="editTask(${task.id})"
                >
                    Edit
                </button>

                <button
                    class="delete"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateCount();
}


// Complete / Pending

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();

    displayTasks();
}


// Edit Task

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const newText = prompt("Edit your task:", task.text);

    if (newText === null) {
        return;
    }

    if (newText.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    task.text = newText.trim();

    saveTasks();

    displayTasks();
}


// Delete Task

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    displayTasks();
}


// Filter

function setFilter(filter) {

    currentFilter = filter;

    displayTasks();
}


// Count

function updateCount() {

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = tasks.filter(
        task => !task.completed
    ).length;

    document.getElementById("completedCount").textContent = completed;

    document.getElementById("pendingCount").textContent = pending;
}


// Local Storage

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// Initial Display

displayTasks();