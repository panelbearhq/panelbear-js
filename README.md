# Panelbear JS client (browser)

JavaScript client library for [Panelbear Analytics](https://panelbear.com).

## Quickstart

Run the following command to install in your project:

```
npm install @panelbear/panelbear-js
```

Or in case you're using yarn:

```
yarn add @panelbear/panelbear-js
```

You can now import, and use the Panelbear client on your project. Here's an example using NextJS and React Hooks:


```javascript
import * as Panelbear from "@panelbear/panelbear-js";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePanelbear = (site, config = {}) => {
  const router = useRouter();

  useEffect(() => {
    // Disable auto-track, and trigger page views manually.
    Panelbear.load(site, { ...config, autoTrack: false });
    Panelbear.trackPageview();

    // Client-side routing will trigger pageviews manually
    const handleRouteChange = () => Panelbear.trackPageview();

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
};
```