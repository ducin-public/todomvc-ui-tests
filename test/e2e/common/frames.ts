import { browser, promise } from 'protractor'

export const switchToDefaultFrame = (): promise.Promise<void> =>
  browser.switchTo().defaultContent()

export const switchToFrame = (index: number): promise.Promise<void> =>
  browser.switchTo().frame(index)
