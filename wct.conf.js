var envIndex = process.argv.indexOf('--env') + 1;
var env = envIndex ? process.argv[envIndex] : undefined;

module.exports = {
  testTimeout: 180 * 1000,
  verbose: false,
  // MAGI REMOVE START
  plugins: {
    istanbul: {
      dir: './coverage',
      reporters: ['text-summary', 'lcov'],
      include: [
        '**/vaadin-upload/src/*.html'
      ],
      exclude: [],
      thresholds: {
        global: {
          statements: 92
        }
      }
    }
  },
  // MAGI REMOVE END

  registerHooks: function(context) {
    const saucelabsPlatformsMobile = [
      'macOS 10.12/iphone@10.3',
      'macOS 10.12/ipad@11.2',
      'macOS 9.3.2/iphone@9.3'
    ];

    const saucelabsPlatformsPolyfilled = [
      'Windows 10/microsoftedge@16',
      'Windows 10/internet explorer@11'
    ];

    const saucelabsPlatformsDesktop = [
      'Windows 10/chrome@65',
      'Windows 10/firefox@59',
      'macOS 10.12/safari@11.0'
    ];

    const saucelabsPlatforms = [
      ...saucelabsPlatformsMobile,
      ...saucelabsPlatformsPolyfilled,
      ...saucelabsPlatformsDesktop
    ];

    const cronPlatforms = [
      'Android/chrome',
      'Windows 10/chrome@65',
      'Windows 10/firefox@59'
    ];

    if (env === 'saucelabs') {
      context.options.plugins.sauce.browsers = saucelabsPlatforms;
    } else if (env === 'saucelabs-cron') {
      context.options.plugins.sauce.browsers = cronPlatforms;
    }
  }
};
