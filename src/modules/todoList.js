import { getTasks, saveTasks } from './localStorage.js';
import { updateStatus, clearCompletedTasks } from './updatesState.js';

class TodoList {
  constructor() {
    this.input = document.querySelector('.input');
    this.form = document.querySelector('.form');
    this.list = document.querySelector('.list');
    this.clearButton = document.querySelector('.btn-clear');
  }

  init = () => {
    // add tasks
    this.form.addEventListener('submit', this.addTask.bind(this));

    // delete a task
    this.list.addEventListener('click', (e) => {
      this.deleteTask(e);
    });

    // edit a task description
    this.list.addEventListener('blur', (e) => {
      this.editTask(e);
    }, true);

    // update task status (completed/unchecked)
    this.list.addEventListener('change', (e) => {
      if (e.target.matches('.item input[type="checkbox"]')) {
        const index = +e.target.nextElementSibling.dataset.id;
        const completed = e.target.checked;
        updateStatus(index, completed);
        this.renderTasks();
      }
    });

    // clear all completed tasks
    this.clearButton.addEventListener('click', () => {
      clearCompletedTasks();
      this.renderTasks();
    });

    // render Tasks
    this.renderTasks();
  }

  renderTasks = () => {
    this.list.innerHTML = '';
    getTasks().forEach((task) => {
      const listItem = document.createElement('li');
      listItem.classList.add('item');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      listItem.appendChild(checkbox);

      const description = document.createElement('span');
      description.classList.add('description');
      description.contentEditable = true;
      description.dataset.id = task.index;
      description.textContent = task.description;
      if (task.completed) {
        description.style.textDecoration = 'line-through';
      }
      listItem.appendChild(description);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn');
      deleteButton.id = task.index;
      deleteButton.textContent = '❌';
      listItem.appendChild(deleteButton);

      this.list.appendChild(listItem);
    });
  };

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
    this.renderTasks();
  };

  deleteTask = (e) => {
    if (e.target.closest('.btn')) {
      let tasks = getTasks();
      const index = +e.target.closest('.btn').id;
      tasks = tasks.filter((task) => task.index !== index);
      tasks.forEach((task, i) => {
        task.index = i + 1;
      });
      saveTasks(tasks);
      this.renderTasks();
    }
  };

  editTask = (e) => {
    if (e.target.closest('.description')) {
      const item = e.target.closest('.description');
      const newDescription = item.textContent.trim();
      const index = +item.dataset.id;

      const tasks = getTasks();
      tasks.forEach((task) => {
        if (task.index === index) {
          task.description = newDescription;
        }
      });
      saveTasks(tasks);
      this.renderTasks();
    }
  };
}

export default TodoList;
