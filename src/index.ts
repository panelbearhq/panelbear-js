const SCRIPT_CDN_HOST = 'https://cdn.panelbear.com';

export interface PanelbearConfig {
  site?: string;
  debug?: boolean;
  analyticsHost?: string;
  honorDNT?: boolean;
  autoTrack?: boolean;
  spaMode?: 'history' | 'off';
}

interface PanelbearInterpreter {
  (command: 'trackPageview'): void;
  (command: 'track', eventName: string): void;
  (command: 'config', config: PanelbearConfig): void;
}

declare global {
  interface Window {
    panelbear: PanelbearInterpreter;
    panelbearQ: PanelbearInterpreter[];
  }
}

const interpret: PanelbearInterpreter = (command: any, arg1?: any): void => {
  window.panelbear =
    window.panelbear ||
    function () {
      window.panelbearQ = window.panelbearQ || [];
      window.panelbearQ.push(arguments as any);
    };

  window.panelbear(command, arg1);
};

export const load = (site: string, config?: PanelbearConfig): void => {
  const tracker = document.createElement('script');
  tracker.async = true;
  tracker.src = `${SCRIPT_CDN_HOST}/analytics.js?site=${site}`;
  document.head.appendChild(tracker);

  interpret('config', {
    site: site,
    ...config,
  });
};

export const trackPageview = (): void => {
  interpret('trackPageview');
};

export const config = (config: PanelbearConfig): void => {
  interpret('config', config);
};

export const track = (eventName: string): void => {
  interpret('track', eventName);
};
