import TodoList from './todoList.js';
import { getTasks, saveTasks } from './localStorage.js';
import renderTasks from './renderTasks.js';

jest.mock('./localStorage', () => ({
  getTasks: jest.fn(() => []),
  saveTasks: jest.fn(),
}));

jest.mock('./renderTasks', () => jest.fn());

function createMockEvent(target) {
  return {
    target,
    preventDefault: jest.fn(),
    closest: (selector) => {
      if (target.matches(selector)) {
        return target;
      }
      return null;
    },
  };
}

describe('TodoList', () => {
  let todoList;

  beforeEach(() => {
    jest.clearAllMocks();
    todoList = new TodoList();
  });

  describe('addTask', () => {
    it('should add a new task when form is submitted', () => {
      // Mock the input element and its value
      const inputValue = 'Test Task';
      const inputElement = {
        value: inputValue,
      };
      todoList.input = inputElement;

      // Create a mock event with the input element
      const event = createMockEvent(inputElement);

      // Call the addTask function
      todoList.addTask(event);

      // Check if the task was added to localStorage and renderTasks was called
      expect(saveTasks).toHaveBeenCalledWith([
        {
          description: inputValue,
          completed: false,
          index: 1,
        },
      ]);
      expect(renderTasks).toHaveBeenCalled();

      // Check if the input element was cleared
      expect(inputElement.value).toBe('');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task when the delete button is clicked', () => {
      // Mock the event target (delete button)
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn');
      deleteButton.id = '1'; // Simulate deleting the task with index 1
      const event = createMockEvent(deleteButton);
      // Mock the initial tasks in localStorage
      const initialTasks = [
        {
          description: 'Task 1',
          completed: false,
          index: 1,
        },
        {
          description: 'Task 2',
          completed: false,
          index: 2,
        },
      ];
      getTasks.mockReturnValue(initialTasks);
      // Call the deleteTask function
      todoList.deleteTask(event);
      // Check if the correct task was deleted from localStorage and renderTasks was called
      expect(saveTasks).toHaveBeenCalledWith([
        {
          description: 'Task 2',
          completed: false,
          index: 1, // The index of the remaining task should be updated
        },
      ]);
      expect(renderTasks).toHaveBeenCalled();
    });
  });

  describe('editTask', () => {
    it('should update the description of a task in localStorage', () => {
      // Mock the event target (description element)
      const descriptionElement = document.createElement('span');
      descriptionElement.classList.add('description');
      descriptionElement.dataset.id = '1'; // Simulate editing the task with index 1
      descriptionElement.textContent = 'New Task Description'; // Updated description value
      const event = {
        target: descriptionElement,
        preventDefault: jest.fn(),
      };
      // Mock the initial tasks in localStorage
      const initialTasks = [
        {
          description: 'Old Task Description',
          completed: false,
          index: 1,
        },
      ];
      getTasks.mockReturnValue(initialTasks);
      // Call the editTask function
      todoList.editTask(event);
      // Check if the task description was updated in localStorage
      expect(saveTasks).toHaveBeenCalledWith([
        {
          description: 'New Task Description', // Updated description value
          completed: false,
          index: 1,
        },
      ]);
    });
  });
});