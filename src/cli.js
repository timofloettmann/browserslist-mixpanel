#!/usr/bin/env node

const fs = require('fs');
const request = require('request');
const binarySplit = require('binary-split');
const parse = require('./parse');

const outputFilename = 'browserslist-stats.json';

const MS_PER_DAY = 86400000;

const argv = require('minimist')(process.argv.slice(2));
let { apiSecret = process.env.MIXPANEL_API_SECRET, days = 30, event } = argv;

if (!apiSecret) {
  throw new Error(
    'Mixpanel token missing. Either provide it by environment variable `MIXPANEL_API_SECRET` or argument `--apiSecret=<apiSecret>`'
  );
}

const now = new Date().getTime();
const untilTimestamp = now - (now % MS_PER_DAY);

// Mixpanel expects only a YYYY-MM-DD format, without time
const [toDate] = new Date(untilTimestamp).toISOString().split('T');
const [fromDate] = new Date(untilTimestamp - MS_PER_DAY * days)
  .toISOString()
  .split('T');

if (!argv.days) {
  console.warn(`using last ${days} days (${fromDate} - ${toDate})`);
}

const serialize = function(obj) {
  let parts = [];
  for (p in obj) {
    if (obj.hasOwnProperty(p) && obj[p] !== undefined) {
      parts.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }

  return parts.join('&');
};

async function main() {
  const fetchEventsPromise = new Promise((resolve, reject) => {
    const req = request.post('https://data.mixpanel.com/api/2.0/export/', {
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiSecret}:`).toString(
          'base64'
        )}`,
      },
      body: serialize({
        from_date: fromDate,
        to_date: toDate,
        event,
        // There's not much to do with events that don't have both of these properties
        where:
          'defined (properties["$browser"]) and defined (properties["$browser_version"])',
      }),
    });

    req.on('response', function(res) {
      var events = [];

      const eventStream = res.pipe(binarySplit('\n')).on('data', line => {
        const { properties } = JSON.parse(line.toString('utf-8'));

        const {
          $browser: browser,
          $browser_version: version,
          $os: os,
        } = properties;

        events.push([browser, version, os]);
      });

      eventStream.on('end', () => resolve(events));
      eventStream.on('error', err => reject(err));
    });
  });

  const events = await fetchEventsPromise;

  console.log(`Received ${events.length} events.`);
  const stats = parse(events);

  fs.writeFileSync(outputFilename, JSON.stringify(stats, null, 2));
  console.log(`Success! Stats saved to '${outputFilename}'`);
}

main();
