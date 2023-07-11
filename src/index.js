import './style.css';

const toDoTasks = [
  {
    description: 'Task 1',
    completed: true,
    index: 1,
  },
  {
    description: 'Task 2',
    completed: true,
    index: 2,
  },
  {
    description: 'Task 3',
    completed: false,
    index: 3,
  },
  {
    description: 'Task 4',
    completed: false,
    index: 4,
  },
];

function renderTasks() {
  const list = document.querySelector('.list');

  list.innerHTML = '';

  toDoTasks.forEach((task) => {
    const listItem = `<li class="item">
                        <input
                        type="checkbox"
                        value=${task.completed}
                        />
                        <span>
                        ${task.description}
                        </span>
                        <button class="btn">❌</button>
                     </li>`;

    list.insertAdjacentHTML('beforeend', listItem);
  });
}

renderTasks();
