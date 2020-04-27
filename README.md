Target browsers tailored to your audience. Integrate [Mixpanel](https://mixpanel.com) with Browserslist to keep your targeted browsers updated.

Inspired by [browserslist-ga](https://github.com/browserslist/browserslist-ga)

## Notes of caution

- During development it has shown that many events did not include all the necessary properties. Often times either the browser, browser_version or both, were undefined. Depending on your data, your results could be incorrect because of this.

- Due to limited test data, browsers such as YaBrowser or Cốc Cốc are not handled at all yet.

## How to use

In the root directory of your project run:

```yaml
npx browserslist-mixpanel --apiSecret=<mixpanel api secret> --event='["Page View"]' --days=90
```

Arguments:

| Argument  | Description                                                                                                             | default | required |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| apiSecret | The Mixpanel API Secret. Can be provided as Environment variable `MIXPANEL_API_SECRET`                                  |         | yes      |
| days      | The amount of days to load events for                                                                                   | 30      | no       |
| event     | The event or events that you wish to get data for, encoded as a JSON array. Example `--event='["Page View", "Log In"]'` | all     | no       |

Afterwards, you can use your stats with Browserslist by adding the following to your [Browserslist config](https://github.com/browserslist/browserslist#config-file):

```yaml
> 0.5% in my stats
```

For more information about Browserslist and why it's useful, please take a look into the [browserslist](https://github.com/browserslist/browserslist) repository.
