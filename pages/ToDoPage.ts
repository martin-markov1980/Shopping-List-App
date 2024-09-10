import { expect, type Locator, type Page } from '@playwright/test';

export class ToDoPage {

  readonly page: Page;
  readonly addTaskBtn: Locator;
  readonly addTaskFormModal: Locator;
  readonly taskNameInput: Locator;
  readonly taskQuantityInput: Locator;
  readonly saveTaskBtn: Locator;
  readonly deleteSingleTaskBtn: Locator;
  readonly deleteSingleTaskModal: Locator;
  readonly confirmDeleteSingleTaskBtn: Locator;
  readonly deleteAllTasksBtn: Locator;
  readonly deleteAllTasksModal: Locator;
  readonly confirmDeleteAllTasksBtn: Locator;
  readonly searchItemFormInput: Locator;
  readonly tableTasksBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addTaskBtn = page.locator('#add-task');
    this.addTaskFormModal = page.locator('#add-item-modal');
    this.taskNameInput = page.locator('#task-name');
    this.taskQuantityInput = page.locator('#task-quantity');
    this.saveTaskBtn = page.locator('#add-task-btn-modal');
    this.deleteSingleTaskBtn = page.locator('#delete-single-item');
    this.deleteSingleTaskModal = page.locator('#delete-single-item-modal');
    this.confirmDeleteSingleTaskBtn = page.locator('#delete-single-yes-modal');
    this.deleteAllTasksBtn = page.locator('#delete-all-items');
    this.deleteAllTasksModal = page.locator('#delete-all-items-modal');
    this.confirmDeleteAllTasksBtn = page.locator('#delete-all-yes-modal');
    this.searchItemFormInput = page.locator('#search');
    this.tableTasksBody = page.locator('tbody tr');
  }

  async goto(baseURL: string) {
    await this.page.goto(baseURL);
  }

  async addTaskWithValidInputs(tasksName: string, taskQuantity: number): Promise<void> {
    await this.addTaskBtn.click();
    await expect(this.addTaskFormModal).toBeVisible();
    await this.taskNameInput.fill(tasksName);
    await this.taskQuantityInput.fill(taskQuantity.toString());
    await this.saveTaskBtn.click();
  }

  async addTaskWithInvalidInputs(tasksName: string, taskQuantity: string): Promise<void> {
    await this.addTaskBtn.click();
    await expect(this.addTaskFormModal).toBeVisible();
    await this.taskNameInput.fill(tasksName);
    await this.taskQuantityInput.fill(taskQuantity);
    await this.saveTaskBtn.click();
  }

  async deleteSingleTask(tasksName: string): Promise<void> {
    const textToFind = tasksName;
    const row = this.page.locator(`tr:has(td:has-text("${textToFind}"))`);
    const button = row.locator('td >> button');
    await expect(button).toBeVisible();
    await button.click();
    await expect(this.deleteSingleTaskModal).toBeVisible();
    await this.confirmDeleteSingleTaskBtn.click();
  }


  async deleteAllTasks(): Promise<void> {
    await this.deleteAllTasksBtn.click();
    await expect(this.deleteAllTasksModal).toBeVisible();
    await this.confirmDeleteAllTasksBtn.click();
  }

  async searchTasksByName(task: string): Promise<number> {
    await this.searchItemFormInput.fill(task);
    const tasks = this.tableTasksBody.all();
    let visibleTasksCount = 0;
    for (const task of await tasks) {
      const isVisible = await task.isVisible();
      if (isVisible) {
        visibleTasksCount++;
      }
    }
    return visibleTasksCount;
  }

}