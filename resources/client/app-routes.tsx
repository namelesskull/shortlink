import {useSettings} from '@common/core/settings/use-settings';
import {useAuth} from '@common/auth/use-auth';
import {Route, Routes, useLocation} from 'react-router-dom';
import {ToastContainer} from '@common/ui/toast/toast-container';
import {EmailVerificationPage} from '@common/auth/ui/email-verification-page/email-verification-page';
import {DialogStoreOutlet} from '@common/ui/overlays/store/dialog-store-outlet';
import {AppearanceListener} from '@common/admin/appearance/commands/appearance-listener';
import {CookieNotice} from '@common/ui/cookie-notice/cookie-notice';
import {DynamicHomepage} from '@common/ui/dynamic-homepage';
import {GuestRoute} from '@common/auth/guards/guest-route';
import {LandingPage} from '@app/landing/landing-page';
import React, {Fragment} from 'react';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {ActiveWorkspaceProvider} from '@common/workspace/active-workspace-id-context';
import {AuthRoute} from '@common/auth/guards/auth-route';
import {AuthRoutes} from '@common/auth/auth-routes';
import {BillingRoutes} from '@common/billing/billing-routes';
import {NotificationRoutes} from '@common/notifications/notification-routes';
import {ContactUsPage} from '@common/contact/contact-us-page';
import {CustomPageLayout} from '@common/custom-page/custom-page-layout';
import {LinkeableRenderer} from '@app/short-links/linkeable-renderer';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';

const AdminRoutes = React.lazy(() => import('@common/admin/admin-routes'));
const SwaggerApiDocs = React.lazy(
  () => import('@common/swagger/swagger-api-docs-page')
);
const DashboardRoutes = React.lazy(
  () => import('./dashboard/dashboard-routes')
);

export function AppRoutes() {
  const {billing, notifications, require_email_confirmation, api} =
    useSettings();
  const {user, hasPermission} = useAuth();

  // if we have linkeable data returned from backend and paths match, render linkeable page
  const {pathname} = useLocation();
  const linkeableData = getBootstrapData().loaders?.linkeablePage;
  const path = pathname.replace(/^\/|\/$/g, '');
  if (linkeableData && path === linkeableData.path) {
    return (
      <Fragment>
        <CookieNotice />
        <ToastContainer />
        <LinkeableRenderer linkeable={linkeableData.linkeable} />
        <DialogStoreOutlet />
      </Fragment>
    );
  }

  if (user != null && require_email_confirmation && !user.email_verified_at) {
    return (
      <Fragment>
        <ToastContainer />
        <Routes>
          <Route path="*" element={<EmailVerificationPage />} />
        </Routes>
        <DialogStoreOutlet />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <AppearanceListener />
      <CookieNotice />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <DynamicHomepage
              homepageResolver={() => (
                <GuestRoute>
                  <LandingPage />
                </GuestRoute>
              )}
            />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <React.Suspense fallback={<FullPageLoader screen />}>
              <ActiveWorkspaceProvider>
                <DashboardRoutes />
              </ActiveWorkspaceProvider>
            </React.Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AuthRoute permission="admin.access">
              <React.Suspense fallback={<FullPageLoader screen />}>
                <AdminRoutes />
              </React.Suspense>
            </AuthRoute>
          }
        />
        {AuthRoutes}
        {billing.enable && BillingRoutes}
        {notifications.integrated && NotificationRoutes}
        {api?.integrated && hasPermission('api.access') && (
          <Route
            path="api-docs"
            element={
              <React.Suspense fallback={<FullPageLoader screen />}>
                <SwaggerApiDocs />
              </React.Suspense>
            }
          />
        )}
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="pages/:pageSlug" element={<CustomPageLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <DialogStoreOutlet />
    </Fragment>
  );
}
