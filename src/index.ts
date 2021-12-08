/**
 * The Panelbear script configuration object.
 */
export interface PanelbearConfig {
  /**
   * The Site ID to report events for.
   */
  site?: string;
  /**
   * Debug mode allows events to be sent on localhost, and logs to console. Default: false.
   */
  debug?: boolean;
  /**
   * Enables or disables the tracking script. If disabled, no events are ever sent. Default: true.
   */
  enabled?: boolean;
  /**
   * Optionally define a function which modifies or skips events right before sending them to the analytics API.
   */
  beforeSend?: (payload: PanelbearEvent) => PanelbearEvent | undefined;
  /**
   * Override the analytics API where the events will be sent to.
   */
  analyticsHost?: string;
  /**
   * Override the analytics script source URL.
   */
  scriptSrc?: string;
  /**
   * Honor the Do-Not-Track (DNT) setting on the user's browser. Default: false.
   */
  honorDNT?: boolean;
  /**
   * Automatically track navigation changes. Default: true.
   */
  autoTrack?: boolean;
  /**
   * Tracking method for single-page apps. Default: 'history'.
   */
  spaMode?: 'history' | 'off';
  /**
   * Whether or not the URL fragment (hash part) should be reported. Default: false.
   */
  includeURLFragment?: boolean;
}

export interface PanelbearEvent {
  pid: string;
  event: string;
  url?: string;
  screen_width?: number;
  user_language?: string;
  timezone?: string;
  referrer?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  dns?: number;
  connect?: number;
  ssl?: number;
  ttfb?: number;
  download?: number;
  dom_content_loaded?: number;
  render?: number;
  page_load?: number;
  transfer_size?: number;
  connection_speed?: string;
  override_user_agent?: string;
  override_ip?: string;
  override_country_code?: string;
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

  try {
    window.panelbear(command, arg1);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.warn('There was an error while executing a Panelbear command', e)
  }
};

export const load = (site: string, config?: PanelbearConfig): void => {
  const tracker = document.createElement('script');
  tracker.async = true;
  tracker.src = `${config?.scriptSrc ?? 'https://cdn.panelbear.com/analytics.js'}?site=${site}`;
  document.head.appendChild(tracker);

  interpret('config', {
    site: site,
    // Disable auto-track on the JS client. Most projects using this library need
    // more control over the event handlers.
    autoTrack: false,
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
