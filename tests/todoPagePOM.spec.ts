import { test, expect } from '@playwright/test';
import { ToDoPage } from '../pages/ToDoPage';

test('Add Shopping List Item with valid inputs', async ({ page, baseURL }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto(baseURL);
  await toDoPage.addTaskWithValidInputs('Orange', 5);
  await expect(toDoPage.tableTasksBody).toHaveCount(1);
  await expect(toDoPage.tableTasksBody).toHaveText(/Orange/);
});

test('Add Shopping List Item with invalid inputs', async ({ page, baseURL }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto(baseURL);
  await toDoPage.addTaskWithInvalidInputs('Orange', 'String');
  await expect(toDoPage.tableTasksBody).toHaveCount(0);
});

test('Delete Single Shopping Item', async ({ page, baseURL }) => {
  const toDoPage = new ToDoPage(page);
  toDoPage.goto(baseURL);
  await toDoPage.addTaskWithValidInputs('Orange', 5);
  await toDoPage.addTaskWithValidInputs('Water', 1);
  await toDoPage.addTaskWithValidInputs('Apple', 3);
  expect(toDoPage.tableTasksBody).toHaveCount(3);
  await toDoPage.deleteSingleTask('Apple');
  expect(toDoPage.tableTasksBody).toHaveCount(2);
});

test('Delete All Shopping Items', async ({ page, baseURL }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto(baseURL);
  await toDoPage.addTaskWithValidInputs('Orange', 5);
  await toDoPage.addTaskWithValidInputs('Apple', 2);
  await toDoPage.addTaskWithValidInputs('Water', 3);
  await toDoPage.deleteAllTasks();
  await expect(toDoPage.tableTasksBody).toHaveCount(0);
});

test('Filter Shopping Items', async ({ page, baseURL }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto(baseURL);
  await toDoPage.addTaskWithValidInputs('Orange', 5);
  await toDoPage.addTaskWithValidInputs('Apple', 2);
  await toDoPage.addTaskWithValidInputs('Water', 3);
  const visibleTasksCount = await toDoPage.searchTasksByName('Apple');
  expect(visibleTasksCount).toEqual(1);
});