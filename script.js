function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', options);
}

function renderTasks() {
  const tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = '';

  let tasks = [];
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  if (tasks.length === 0) {
    tasksDiv.innerHTML = '<p>No tasks found.</p>';
  } else {
    tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

    tasks.forEach((task, index) => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      const title = document.createElement('h3');
      title.textContent = task.title;
      taskDiv.appendChild(title);

      const description = document.createElement('p');
      description.textContent = task.description;
      taskDiv.appendChild(description);

      const dueDate = document.createElement('p');
      dueDate.textContent = `Due Date: ${formatDate(task.dueDate)}`;
      taskDiv.appendChild(dueDate);

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = 'X';
      deleteBtn.setAttribute('onclick', `deleteTask(${index})`);
      taskDiv.appendChild(deleteBtn);

      tasksDiv.appendChild(taskDiv);
    });
  }
}

function deleteTask(index) {
  let tasks = [];
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

const addTaskForm = document.getElementById('add-task-form');
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const dueDateInput = document.getElementById('due-date');

  const title = titleInput.value;
  const description = descriptionInput.value;
  const dueDate = dueDateInput.value;

  if (!title || !dueDate) {
    alert('Title and Due Date are required!');
    return;
  }

  const task = {
    title,
    description,
    dueDate,
  };

  let tasks = [];
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';

  renderTasks();
  alert('Task added successfully!');
});

renderTasks();
