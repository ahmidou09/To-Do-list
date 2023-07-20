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
});