import { getTasks, saveTasks } from './localStorage.js';
import { updateStatus, clearCompletedTasks } from './updatesState.js';
import renderTasks from './renderTasks.js';

class TodoList {
  input = document.querySelector('.input');

  form = document.querySelector('.form');

  list = document.querySelector('.list');

  clearButton = document.querySelector('.btn-clear');

  init = () => {
    // add tasks
    this.form.addEventListener('submit', this.addTask);

    // delete a task
    this.list.addEventListener('click', this.deleteTask);

    // edit a task description
    this.list.addEventListener('blur', this.editTask, true);

    // update task status (completed/unchecked)
    this.list.addEventListener('change', updateStatus);

    // clear all completed tasks
    this.clearButton.addEventListener('click', clearCompletedTasks);

    // render Tasks
    renderTasks();
  }

  addTask = (e) => {
    e.preventDefault();
    const tasks = getTasks();

    if (!this.input.value) return;
    const newTask = {
      description: this.input.value,
      completed: false,
      index: tasks.length + 1,
    };

    tasks.push(newTask);

    this.input.value = '';
    saveTasks(tasks);
    renderTasks();
  };

  deleteTask = (e) => {
    const item = e.target.closest('.btn');
    if (item) {
      let tasks = getTasks();
      const index = +item.id;
      tasks = tasks.filter((task) => task.index !== index);
      tasks.forEach((task, i) => {
        task.index = i + 1;
      });
      saveTasks(tasks);
      renderTasks();
    }
  };

  editTask = (e) => {
    const item = e.target.closest('.description');
    if (item) {
      item.parentElement.style.color = 'red';
      const newDescription = item.textContent;
      const index = +item.dataset.id;

      const tasks = getTasks();
      tasks.forEach((task) => {
        if (task.index === index) {
          task.description = newDescription;
        }
      });
      saveTasks(tasks);
      renderTasks();
    }
  };
}

export default TodoList;
