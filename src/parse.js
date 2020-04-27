const parseBrowser = require("./parse-browser");

/**
 *
 * @param {[browser,version,os][]} data Array of data points including browser,version & os
 * Example:
 *
 * parse([
 *   ['Chrome', '80', 'Windows'],
 *   ['Chrome', '75', 'Android']
 *   ...
 * ])
 */
const parse = data => {
  // We can only sum up counts, to determine the percentages we'll need the total count later.
  const totalEventCount = data.length;

  const totalCounts = data.reduce((acc, [browser, version, os]) => {
    const canIUseBrowser = parseBrowser(browser, os);
    if (canIUseBrowser === null || version === null) {
      return acc;
    }

    const canIUseVersion = `${version}`;

    const key = `${canIUseBrowser}|${canIUseVersion}`;
    const versionCount = acc[key] || 0;

    return Object.assign(acc, { [key]: versionCount + 1 });
  }, {});

  return Object.entries(totalCounts).reduce((acc, [key, count]) => {
    const [canIUseBrowser, canIUseVersion] = key.split("|");
    const browserObj = acc[canIUseBrowser] || {};

    // The format is { [caniuse browser name]: { [caniuse browser version]: [float] } ... }
    return Object.assign(acc, {
      [canIUseBrowser]: Object.assign(browserObj, {
        [canIUseVersion]: (count / totalEventCount) * 100,
      }),
    });
  }, {});
};

module.exports = parse;
