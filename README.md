# Panelbear client (browser)

A simple JavaScript library for [Panelbear Analytics](https://panelbear.com).

## Highlights

- Just a thin wrapper around the Panelbear analytics script.
- Integrates with most JS frameworks.
- Typed (Typescript).

## Quickstart

### Install

Run the following command to install in your project:

```
npm install @panelbear/panelbear-js
```

Or with yarn:

```
yarn add @panelbear/panelbear-js
```

### Basic usage

You can now import, and use the Panelbear client on your project.

```javascript
import * as Panelbear from '@panelbear/panelbear-js';

// Load the Panelbear tracker once in your app
Panelbear.load('YOUR_SITE_ID');

// This is how you record page views
Panelbear.trackPageview();

// You can also trigger custom events
Panelbear.track('NewsletterSignup');
```

## Framework integrations

- [Next.js](https://www.npmjs.com/package/@panelbear/panelbear-nextjs)
- [Vuepress](https://www.npmjs.com/package/@panelbear/vuepress-plugin-panelbear)
- [Gatsby](https://www.npmjs.com/package/gatsby-plugin-panelbear)

## Changelog

### 1.3.3

- Handle error on bind queue to window when element with same name exists (eg. <div id="panelbear"></div>).

### 1.3.2

- Update docs.

### 1.3.1

- Export config interface and event schema.

### 1.3.0

- Update PanelbearConfig interface available fields.
- Upgrade package dependencies.
- Add interface docs.

### 1.2.0

- Allow scriptSrc config option to load Panelbear script from own domain.

### 1.1.0

- By default, load tracker with `autoTrack` set to `false`.

### 1.0.2

- Initial open source release.

## Security Disclosure

If you discover any issue regarding security, please disclose the information responsibly by following the instructions [here](https://panelbear.com/security/). Do NOT create a Issue on the GitHub repo.

## Contributors

[@jondcallahan](https://github.com/jondcallahan)

## Contributing

Please check for any existing issues before openning a new Issue. If you'd like to work on something, please open a new Issue describing what you'd like to do before submitting a Pull Request.

## License

See [LICENSE](https://github.com/panelbearhq/panelbear-js/blob/master/LICENSE).
