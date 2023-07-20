import { getTasks } from './localStorage.js';

function renderTasks() {
  const list = document.querySelector('.list');
  list.innerHTML = '';
  getTasks().forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;
    checkbox.dataset.id = task.index;
    listItem.appendChild(checkbox);

    const description = document.createElement('span');
    description.classList.add('description');
    description.contentEditable = true;
    description.dataset.id = task.index;
    description.textContent = task.description;
    if (task.completed) {
      description.style.textDecoration = 'line-through';
      description.style.color = 'grey';
      description.style.opacity = '.9';
    }
    listItem.appendChild(description);

    if (task.completed) {
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn');
      deleteButton.id = task.index;
      deleteButton.textContent = '🗑️';
      listItem.appendChild(deleteButton);
    }
    list.appendChild(listItem);
  });
}

export default renderTasks;