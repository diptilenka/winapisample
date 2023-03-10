require('ts-node').register({transpileOnly: true});

export const config  = {
    runner: "local",

    specs: ["./test/specs/*.ts"],
  
    maxInstances: 1,
  
    port: 4723,
    capabilities: [
      {
        app: "Microsoft.WindowsAlarms_8wekyb3d8bbwe!App",
        "ms:experimental-webdriver": true,
        browserName: "",
      },
    ],
    logLevel: "trace",
    services: ["winappdriver"],
    framework: "jasmine",
    outputDir: ".\\reports",
    reporters: ["dot", ["junit", { outputDir: ".\\reports" }]],
  
    before() {
      //implicit wait for 5 seconds
      browser.setTimeout({ implicit: 5000 });
    },
  
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000,
      expectationResultHandler: function (passed, assertion) {
        /**
         * only take screenshot if assertion failed
         */
        if (passed) {
          return;
        }
  
        browser.getPageSource();
        browser.saveScreenshot(
          `.\\reports\\assertionError_${assertion.error.message}.png`
        );
      },
    }
}
