let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');

  const taskText = input.value.trim();

  if (taskText) {
    tasks.unshift({
      id: Date.now(),
      description: taskText,
      completed: false,
    });

    input.value = '';
    renderTasks();
  }
}

function toggleTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  renderTasks();
}

function handleCheckbox(event, taskId) {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.target.checked = !event.target.checked;
    toggleTask(taskId);
  }
}

function handleKeyPressDeleteBtn(event, taskId) {
  if (event.key === 'Enter') {
    event.preventDefault();
    deleteTask(taskId);
  }
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;

    taskElement.innerHTML = `
        <div class="task-content">
            <input type="checkbox" ${
              task.completed ? 'checked' : ''
            } onchange="toggleTask(${
      task.id
    })" onkeypress="handleCheckbox(event, ${task.id})">
            <p>${task.description}</p>
        </div>
        <button class="delete-btn" onclick="deleteTask(${
          task.id
        })" onkeypress="handleKeyPressDeleteBtn(event, ${task.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
        </svg>
        </button>
    `;

    taskList.appendChild(taskElement);
  });
}

// Allow adding task with Enter key
document.getElementById('taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
// Allow adding task with Enter key
document.getElementById('addTaskBtn').addEventListener('click', function () {
  addTask();
});
