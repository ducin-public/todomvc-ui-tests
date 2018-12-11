import { browser, ExpectedConditions, ElementFinder, promise } from 'protractor'

export const waitForTimeout = browser.params.findElementTimeout

export const sendKeysWithWait = (element: ElementFinder, value: string, waitFor: number): promise.Promise<void> =>
  element.sendKeys(value)
    .then(() => browser.sleep(waitFor))

export const waitForClickableElement = (element: ElementFinder): promise.Promise<void> =>
  browser.wait(
    ExpectedConditions.elementToBeClickable(element),
    waitForTimeout)

export const waitForPresenceOfElement = (element: ElementFinder, timeout: number = waitForTimeout): promise.Promise<void> =>
  browser.wait(
    ExpectedConditions.presenceOf(element),
    timeout)

export const waitForPresenceOfElementWithText = (element: ElementFinder, text: string): promise.Promise<void> =>
  browser.wait(
    ExpectedConditions.textToBePresentInElement(element, text),
    waitForTimeout)

export const waitForPresenceOfElementWithDifferentText = (element: ElementFinder, text: string): promise.Promise<void> =>
  browser.wait(
    ExpectedConditions.not(ExpectedConditions.textToBePresentInElement(element, text)),
    waitForTimeout)

export const waitForVisibilityOfElement = (element: ElementFinder): promise.Promise<void> =>
  browser.wait(
    ExpectedConditions.visibilityOf(element),
    waitForTimeout)

export const setInput = async (element: ElementFinder, input: string, delay?: number): Promise<void> => {
  await waitForVisibilityOfElement(element)
  await element.sendKeys(input)
  if (delay) {
    await browser.sleep(delay)
  }
}
