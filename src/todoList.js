class TodoList {
  constructor() {
    this.input = document.querySelector('.input');
    this.form = document.querySelector('.form');
    this.list = document.querySelector('.list');
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

    // render Tasks
    this.renderTasks();
  }

  getTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };

  saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  renderTasks = () => {
    this.list.innerHTML = '';
    this.getTasks().forEach((task) => {
      const listItem = `<li class="item">
                        <input
                        type="checkbox"
                        value=${task.completed}
                        />
                        <span class="description" contenteditable="true" data-id=${task.index}>
                        ${task.description}
                        </span>
                        <button class="btn" id=${task.index}>❌</button>
                     </li>`;

      this.list.insertAdjacentHTML('beforeend', listItem);
    });
  };

  addTask = (e) => {
    e.preventDefault();
    const tasks = this.getTasks();

    if (!this.input.value) return;
    const newTask = {
      description: this.input.value,
      completed: false,
      index: tasks.length + 1,
    };

    tasks.push(newTask);

    this.input.value = '';
    this.saveTasks(tasks);
    this.renderTasks();
  };

  deleteTask = (e) => {
    if (e.target.closest('.btn')) {
      let tasks = this.getTasks();
      const index = +e.target.closest('.btn').id;
      tasks = tasks.filter((task) => task.index !== index);
      tasks.forEach((task, i) => {
        task.index = i + 1;
      });
      this.saveTasks(tasks);
      this.renderTasks();
    }
  };

  editTask = (e) => {
    if (e.target.closest('.description')) {
      const item = e.target.closest('.description');
      const newDescription = item.textContent.trim();
      const index = +item.dataset.id;

      const tasks = this.getTasks();
      tasks.forEach((task) => {
        if (task.index === index) {
          task.description = newDescription;
        }
      });
      this.saveTasks(tasks);
      this.renderTasks();
    }
  };
}

export default TodoList;
