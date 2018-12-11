import { promise, element, by, ElementFinder, Key } from 'protractor'
import { By } from 'selenium-webdriver'

import { waitForPresenceOfElement, setInput } from '../common/actions'

type Filter = 'all' | 'active' | 'completed'

const Locator = {
  todoApp: (): By => by.id('todoapp'),
  newTodoInput: (): By => by.id('new-todo'),
  todoItems: (): By => by.css('#todo-list li'),
  todoCheckboxes: (): By => by.css('#todo-list input.toggle'),
  filters: {
    all: (): By => by.partialLinkText('All'),
    active: () => By.css('a[href*="active"]'),
    completed: () => By.css('a[href*="completed"]'),
  },
  clearCompletedBtn: (): By => by.css('#clear-completed')
}

export class TodoMVCPage {

  public async setAndSubmitMainInput(phrase: string): Promise<void> {
    const input = element(Locator.newTodoInput())
    await setInput(input, phrase, 250)
    await input.sendKeys(Key.RETURN)
  }

  public async getVisibleTodosCount(): Promise<number> {
    return element.all(Locator.todoItems()).count()
  }

  public async clickNthCheckbox(idx: number): Promise<void> {
    return element.all(Locator.todoCheckboxes()).get(idx).click()
  }

  public waitForTodomvcPageToLoad(): promise.Promise<void> {
    return waitForPresenceOfElement(element(Locator.todoApp()))
  }

  public async clickFilter(filter: Filter): Promise<void> {
    await element(Locator.filters[filter]()).click()
  }

  public async clickClearCompleted(): Promise<void> {
    await element(Locator.clearCompletedBtn()).click()
  }
}
