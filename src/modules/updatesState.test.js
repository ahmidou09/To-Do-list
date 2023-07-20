import { getTasks, saveTasks } from './localStorage.js';
import { updateStatus, clearCompletedTasks } from './updatesState.js';
import renderTasks from './renderTasks.js';

jest.mock('./localStorage', () => ({
  getTasks: jest.fn(() => []),
  saveTasks: jest.fn(),
}));

jest.mock('./renderTasks', () => jest.fn());

describe('updateStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the completed status of a task in localStorage', () => {
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.classList.add('checkbox');
    checkboxElement.checked = true;
    checkboxElement.dataset.id = '1';

    const event = {
      target: checkboxElement,
    };

    const initialTasks = [
      {
        description: 'Task Description',
        completed: false,
        index: 1,
      },
    ];
    getTasks.mockReturnValue(initialTasks);

    updateStatus(event);

    expect(saveTasks).toHaveBeenCalledWith([
      {
        description: 'Task Description',
        completed: true,
        index: 1,
      },
    ]);

    expect(renderTasks).toHaveBeenCalled();
  });

  it('should remove all completed tasks from localStorage', () => {
    const initialTasks = [
      {
        description: 'Task 1',
        completed: true,
        index: 1,
      },
      {
        description: 'Task 2',
        completed: false,
        index: 2,
      },
      {
        description: 'Task 3',
        completed: true,
        index: 3,
      },
    ];
    getTasks.mockReturnValue(initialTasks);

    clearCompletedTasks();

    expect(saveTasks).toHaveBeenCalledWith([
      {
        description: 'Task 2',
        completed: false,
        index: 1,
      },
    ]);
  });
});
