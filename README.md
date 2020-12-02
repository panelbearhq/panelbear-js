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
import * as Panelbear from "@panelbear/panelbear-js";

// Load the Panelbear tracker once in your app
Panelbear.load('YOUR_SITE_ID');

// This is how you record page views
Panelbear.trackPageview();

// You can also trigger custom events
Panelbear.track('NewsletterSignup');
```


### Real-world usage
Here's an example integration with NextJS using standard React hooks:

```javascript
// ./pages/_app.js

import { usePanelbear } from './../hooks/panelbear';

function CustomApp({ Component, pageProps }) {
    // Load Panelbear only once during the app lifecycle
    usePanelbear("YOUR_SITE_ID", {
      // Uncomment to allow sending events on localhost, and log to console too.
      // debug: true
    });

    return <Component {...pageProps} />
}

export default CustomApp;
```

```javascript
// ./hooks/panelbear.js

import * as Panelbear from "@panelbear/panelbear-js";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePanelbear = (site, config = {}) => {
  const router = useRouter();

  useEffect(() => {
    Panelbear.load(site, config);
    
    // Trigger initial page view
    Panelbear.trackPageview();

    // Add on route change handler for client-side navigation
    const handleRouteChange = () => Panelbear.trackPageview();
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
};
```


## Changelog
### 1.1.0
- By default, load tracker with `autoTrack` set to `false`.

### 1.0.2
- Initial open source release.

## Security Disclosure
If you discover any issue regarding security, please disclose the information responsibly by following the instructions [here](https://panelbear.com/security/). Do NOT create a Issue on the GitHub repo.


## Contributing
Please check for any existing issues before openning a new Issue. If you'd like to work on something, please open a new Issue describing what you'd like to do before submitting a Pull Request.

## License
See [LICENSE](https://github.com/panelbearhq/panelbear-js/blob/master/LICENSE).
