import { getTasks, saveTasks } from './localStorage.js';
import renderTasks from './renderTasks.js';

function updateStatus(e) {
  const item = e.target.closest('.checkbox');
  if (item) {
    const index = +item.nextElementSibling.dataset.id;
    const completed = item.checked;
    const tasks = getTasks();
    tasks.forEach((task) => {
      if (task.index === index) {
        task.completed = completed;
      }
    });
    saveTasks(tasks);
    renderTasks();
  }
}

function clearCompletedTasks() {
  let tasks = getTasks();
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveTasks(tasks);
  renderTasks();
}

export { updateStatus, clearCompletedTasks };