import { test, expect } from '@playwright/test';

test('Add Shopping List Item with valid inputs', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Apple');

  // Adding Item quantity
  await page.fill('#add-item-modal input#task-quantity', '3');

  // Saving the shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  const tableLocator = page.locator('table');

  // Checking if our Item exist in the shopping list
  await expect(tableLocator).toHaveText(/Apple/);
});

test('Add Shopping List Item with invalid inputs', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Apple');

  // Adding invalid Item quantity 
  await page.fill('#add-item-modal input#task-quantity', 'Invalid quantity value');

  // Saving the invalid shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  const tableRows = page.locator('table tbody tr');
  
  // Checking if our Invalid Item has been added to the shopping list by checking if the shopping list is empty
  await expect(tableRows).toHaveCount(0);
});

test('Delete Single Shopping Item', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Apple');
  
  // Adding Item quantity 
  await page.fill('#add-item-modal input#task-quantity', '5');

  // Saving the shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  // Adding second item to our shopping list

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Orange');

  // Adding Item quantity 
  await page.fill('#add-item-modal input#task-quantity', '3');

  // Saving the shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  // Checking if we have at least 2 Items in the table
  const tableRows = page.locator('table tbody tr');
  
  await expect(tableRows).toHaveCount(2);

  // Click delete single item from our shopping list 
  await page.click('#delete-single-item');

  // Ensure the modal for deleting single task is visible
  await page.waitForSelector('#delete-single-item-modal', { state: 'visible' });

  // Confirming the deletion of a single list item
  await page.click('#delete-single-item-modal button#delete-single-yes-modal');

  // Checking if our list items have now one item less then before
  await expect(tableRows).toHaveCount(1);

});

test('Delete All Shopping Items', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Apple');
  
  // Adding Item quantity 
  await page.fill('#add-item-modal input#task-quantity', '7');

  // Saving the shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  // Adding second item to our shopping list

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Orange');

  // Adding Item quantity 
  await page.fill('#add-item-modal input#task-quantity', '5');

  // Saving the shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  // Checking if we have at least 2 Items in the table
  const tableRows = page.locator('table tbody tr');
  
  await expect(tableRows).toHaveCount(2);

  // Click delete all items from our shopping list button
  await page.click('#delete-all-items');

  // Ensure the modal for deleting all tasks is visible
  await page.waitForSelector('#delete-all-items-modal', { state: 'visible' });

  // Confirming the deletion of a all list items
  await page.click('#delete-all-items-modal button#delete-all-yes-modal');

  // Checking if our list items has been deleted
  await expect(tableRows).toHaveCount(0);

});

test('Filter Shopping Items', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Apple');
  
  // Adding Item quantity 
  await page.fill('#add-item-modal input#task-quantity', '10');

  // Saving the shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  // Adding second item to our shopping list

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Orange');

  // Adding Item quantity 
  await page.fill('#add-item-modal input#task-quantity', '25');

  // Saving the shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  // Adding third item to our shopping list

  // Click add task button
  await page.click('#add-task');

  // Ensure the modal for adding task is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  // Adding Item name
  await page.fill('#add-item-modal input#task-name', 'Milk');

  // Adding Item quantity 
  await page.fill('#add-item-modal input#task-quantity', '2');

  // Saving the shopping item to the list
  await page.click('#add-item-modal button#add-task-btn-modal');

  // Checking if we have at least 3 Items in the table
  const tableRows = page.locator('table tbody tr');
  
  await expect(tableRows).toHaveCount(3);

  // Filter shopping list elements down to only Orange
  await page.fill('#search', 'Orange');
  
  // Check if our list items has just one element visible
  const visibleRows = page.locator('table tbody tr:visible');

  // Assert that there is only one visible row
  await expect(visibleRows).toHaveCount(1);

  // Check if the content of the visible row match the expected filter value
  const firstCell = visibleRows.first().locator('td:first-child');
  await expect(firstCell).toHaveText('Orange');
});
