/*
Mixpanel Browser Identifiers:

Chrome
Chrome iOS
Firefox
Firefox iOS
Mozilla
Safari
Mobile Safari
Microsoft Edge
Internet Explorer
Internet Explorer Mobile
Opera
Opera Mini
Android Mobile
Facebook Mobile
Samsung Internet
BlackBerry
UC Browser
Konqueror
*/

/*
Mixpanel Operating Systems

Mac OS X
Windows
Android
iOS
Linux
Chrome OS
BlackBerry
*/

// mapping data from mixpanel to caniuse identifiers
const mapCanIUseBrowser = (browser, os) => {
  if (browser === "Chrome") {
    if (os === "Android") {
      return "and_chr"; // Chrome for Android
    }
    return "chrome";
  }

  if (browser === "Firefox") {
    if (os === "Android") {
      return "and_ff"; // Firefox for Android
    }
    return "firefox";
  }

  if (browser === "Safari") {
    return "safari";
  }

  if (browser === "Mobile Safari") {
    return "ios_saf"; // iOS Safari
  }

  if (browser === "Microsoft Edge") {
    return "edge";
  }

  if (browser === "Internet Explorer") {
    return "ie";
  }

  if (browser === "Internet Explorer Mobile") {
    return "ie_mob";
  }

  if (browser === "Opera") {
    if (["Android", "iOS"].includes(os)) {
      return "op_mob"; // Opera Mobile
    }
    return "opera";
  }

  if (browser === "Opera Mini") {
    return "op_mini";
  }

  if (browser === "Android Browser") {
    return "android";
  }

  if (browser === "BlackBerry") {
    return "bb";
  }

  if (browser === "UC Browser") {
    if (os === "Android") {
      return "and_uc";
    }
  }

  if (browser === "Samsung Internet") {
    return "samsung";
  }

  return null;
};

module.exports = mapCanIUseBrowser;
