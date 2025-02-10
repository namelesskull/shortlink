import './app.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {CommonProvider} from '@common/core/common-provider';
import * as Sentry from '@sentry/react';
import {rootEl} from '@common/core/root-el';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Link, LinkType} from '@app/dashboard/links/link';
import {TrackingPixel} from '@app/dashboard/tracking-pixels/tracking-pixel';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import {LandingPageContent} from '@app/landing/landing-page-content';
import {ignoredSentryErrors} from '@common/errors/ignored-sentry-errors';
import {Product} from '@common/billing/product';
import {FetchCustomPageResponse} from '@common/custom-page/use-custom-page';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {AppRoutes} from '@app/app-routes';
import {GetLandingPageStatsResponse} from '@app/landing/use-landing-page-stats';

const AdminRoutes = React.lazy(() => import('@common/admin/admin-routes'));
const SwaggerApiDocs = React.lazy(
  () => import('@common/swagger/swagger-api-docs-page')
);

declare module '@common/core/bootstrap-data/bootstrap-data' {
  interface BootstrapData {
    loaders?: {
      landingPage?: {
        products: Product[];
        stats: GetLandingPageStatsResponse['stats'];
      };
      customPage?: FetchCustomPageResponse;
      linkeablePage?: {
        linkeable: Link | LinkGroup | Biolink;
        path: string;
      };
    };
  }
}

declare module '@common/http/value-lists' {
  interface FetchValueListsResponse {
    overlays: LinkOverlay[];
    pixels: TrackingPixel[];
    groups: LinkGroup[];
  }
}

declare module '@common/core/settings/settings' {
  interface Settings {
    homepage: {
      appearance: LandingPageContent;
      type: 'loginPage' | 'registerPage' | string;
      value?: string;
    };
    links: {
      gchart_api_key?: string;
      alias_min?: number;
      alias_max?: number;
      redirect_time?: number;
      enable_type?: boolean;
      default_type?: LinkType;
      min_len?: number;
      max_len?: number;
      retargeting?: boolean;
      pixels?: boolean;
      dash_footer?: boolean;
      homepage_creation?: boolean;
      homepage_stats?: boolean;
      homepage_pricing?: boolean;
    };
    biolink: {
      show_branding?: boolean;
      branding_img?: string;
    };
    ads?: {
      biolink_top?: string;
      splash_top?: string;
      splash_bottom?: string;
      dashboard?: string;
      frame?: string;
      landing?: string;
      link_page?: string;
      disable?: boolean;
    };
  }
}

const data = getBootstrapData();
const sentryDsn = data.settings.logging.sentry_public;
if (sentryDsn && import.meta.env.PROD) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.2,
    ignoreErrors: ignoredSentryErrors,
    release: data.sentry_release,
  });
}

const app = (
  <BrowserRouter basename={data.settings.html_base_uri}>
    <CommonProvider>
      <AppRoutes />
    </CommonProvider>
  </BrowserRouter>
);

if (data.rendered_ssr) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
