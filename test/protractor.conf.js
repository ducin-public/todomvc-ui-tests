const { SpecReporter } = require('jasmine-spec-reporter');
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

const screenshotReporter = new HtmlScreenshotReporter({
    dest: 'test-results/screenshots',
    filename: 'report.html'
});

exports.config = {
  allScriptsTimeout: 15000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  suites: {
    integration: './e2e/**/*.e2e-spec.ts',
    smoke: './e2e/**/*smoke.e2e-spec.ts'
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--window-size=1600,1400']
    }
  },
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000,
    print: function () { },
    random: true
  },
  onPrepare: () => {
    require('ts-node').register({
      project: __dirname + '/tsconfig.e2e.json'
    });

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
          displayStacktrace: true
      }
    }));

    const jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        savePath: __dirname + '/test-results/',
        consolidateAll: true,
        useFullTestName: true
    }));

    jasmine.getEnv().addReporter(screenshotReporter);

    browser.ignoreSynchronization = true
  },
  params: {
    baseURL: "http://localhost:9000",
    findElementTimeout: 30000,
  },

  SELENIUM_PROMISE_MANAGER: 0
}