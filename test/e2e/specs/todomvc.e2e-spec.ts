import { browser } from 'protractor'

import { TodoMVCPage } from '../pages/todomvc.po'

const baseURL = browser.params.baseURL

describe('TodoMVC page', () => {
  const todoMVCPage = new TodoMVCPage()

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000
    await browser.get(baseURL)
    await todoMVCPage.waitForTodomvcPageToLoad()
  })

  it('todomvc accepts some input', async () => {
    await todoMVCPage.setAndSubmitMainInput('prepare chips') // 🍟
    await todoMVCPage.setAndSubmitMainInput('drink beer') // 🍻
    await todoMVCPage.setAndSubmitMainInput('turn on da music') // 🎶
    await todoMVCPage.setAndSubmitMainInput('clean the mess') // 💩
    await todoMVCPage.setAndSubmitMainInput('learn UI tests')

    let count = await todoMVCPage.getVisibleTodosCount()
    expect(count).toBe(5)

    await todoMVCPage.clickNthCheckbox(0)
    await todoMVCPage.clickNthCheckbox(2)
    await browser.sleep(500)

    await todoMVCPage.clickFilter('active')
    await browser.sleep(500)
    count = await todoMVCPage.getVisibleTodosCount()
    expect(count).toBe(3)

    await todoMVCPage.clickFilter('completed')
    await browser.sleep(500)
    count = await todoMVCPage.getVisibleTodosCount()
    expect(count).toBe(2)

    await todoMVCPage.clickClearCompleted()
    await browser.sleep(500)
    count = await todoMVCPage.getVisibleTodosCount()
    expect(count).toBe(3)
    
    await browser.sleep(5000)
  })

})
