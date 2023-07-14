import { getTasks, saveTasks } from './localStorage.js';

function updateStatus(e) {
  if (e.target.closest('.checkbox')) {
    const index = +e.target.nextElementSibling.dataset.id;
    const completed = e.target.checked;
    const tasks = getTasks();
    tasks.forEach((task) => {
      if (task.index === index) {
        task.completed = completed;
      }
    });
    saveTasks(tasks);
  }
}

function clearCompletedTasks() {
  let tasks = getTasks();
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveTasks(tasks);
}

export { updateStatus, clearCompletedTasks };