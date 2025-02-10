import type {
  Biolink,
  BiolinkAppearance,
  BiolinkBtnConfig,
  BiolinkLink,
} from '@app/dashboard/biolink/biolink';
import {ReactElement, useEffect} from 'react';
import clsx from 'clsx';
import {loadFonts} from '@common/ui/font-picker/load-fonts';
import {WidgetRenderers} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-renderers';
import {AdHost} from '@common/admin/ads/ad-host';
import {useSettings} from '@common/core/settings/use-settings';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {Link} from 'react-router-dom';
import {getColorBrightness} from '@common/ui/themes/utils/get-color-brightness';
import {useIsDarkMode} from '@common/ui/themes/use-is-dark-mode';
import {cssPropsFromBgConfig} from '@common/background-selector/css-props-from-bg-config';

interface BiolinkLayoutProps {
  biolink: Biolink;
  appearance?: BiolinkAppearance | null;
  className?: string;
  enableLinkAnimations?: boolean;
  showAds?: boolean;
  height?: string;
}
export function BiolinkLayout({
  biolink,
  className,
  appearance,
  enableLinkAnimations,
  showAds,
  height = 'h-screen',
}: BiolinkLayoutProps) {
  appearance = appearance || biolink.appearance?.config;

  useEffect(() => {
    const id = 'biolink-fonts';
    if (appearance?.fontConfig) {
      loadFonts([appearance?.fontConfig], {id});
    }
  }, [appearance?.fontConfig]);

  useEffect(() => {
    const hasAnimations = biolink.content.some(
      item => item.model_type === 'link' && item.animation,
    );
    if (enableLinkAnimations && hasAnimations) {
      import(
        '@app/dashboard/biolink/biolink-editor/content/link-content-item/animate.min.css'
      );
    }
  }, [enableLinkAnimations, biolink.content]);

  return (
    <div
      className={clsx('overflow-y-auto', height)}
      style={{
        ...cssPropsFromBgConfig(appearance?.bgConfig),
        fontFamily: appearance?.fontConfig?.family,
      }}
    >
      <div
        className={clsx('flex h-full w-full flex-col px-12 py-24', className)}
      >
        <div className="flex-auto">
          {showAds && <AdHost slot="biolink_top" className="mb-60" />}
          {biolink.content.map(item => {
            if (!item.active) {
              return null;
            }

            const key = `${item.model_type}-${item.id}`;
            let renderedItem: ReactElement;
            if (item.model_type === 'link') {
              renderedItem = <LinkButton appearance={appearance} link={item} />;
            } else {
              const Widget = WidgetRenderers[item.type];
              renderedItem = <Widget widget={item} variant="biolinkPage" />;
            }

            return (
              <div className="mb-14 w-full" key={key}>
                {renderedItem}
              </div>
            );
          })}
        </div>
        <Branding appearance={appearance} />
      </div>
    </div>
  );
}

interface LinkButtonProps {
  link: BiolinkLink;
  appearance?: BiolinkAppearance | null;
}
function LinkButton({link, appearance}: LinkButtonProps) {
  const variant: 'outline' | 'flat' = appearance?.btnConfig?.variant ?? 'flat';
  const radius: BiolinkBtnConfig['radius'] =
    appearance?.btnConfig?.radius ?? 'rounded';
  const shadow: BiolinkBtnConfig['shadow'] =
    appearance?.btnConfig?.shadow ?? undefined;
  const buttonColor: BiolinkBtnConfig['color'] =
    appearance?.btnConfig?.color ?? undefined;
  const buttonTextColor = appearance?.btnConfig?.textColor ?? undefined;

  const isCustomBgColor = buttonColor !== 'primary' && buttonColor !== 'paper';

  return (
    <a
      className={clsx(
        'relative flex h-56 w-full select-none appearance-none items-center justify-center hyphens-auto whitespace-normal break-words rounded border py-16 align-middle text-sm font-semibold no-underline outline-none transition-button duration-200 focus-visible:ring',
        link.animation &&
          `animate__animated animate__repeat-3 animate__${link.animation}`,
        radius,
        link.image ? 'px-66' : 'px-18',
        !buttonColor &&
          (variant === 'outline'
            ? 'border-primary'
            : 'border-primary bg-primary'),
        !buttonTextColor &&
          (variant === 'outline' ? 'text-primary' : 'text-on-primary'),
      )}
      style={{
        boxShadow: shadow,
        backgroundColor:
          isCustomBgColor && variant !== 'outline' ? buttonColor : undefined,
        borderColor: isCustomBgColor ? buttonColor : undefined,
        color: buttonTextColor,
      }}
      rel="noopener noreferrer"
      target="_blank"
      href={link.short_url}
    >
      {link.image ? (
        <img
          className={clsx(
            'absolute left-10 top-1/2 aspect-square h-[calc(100%-18px)] -translate-y-1/2 object-cover',
            radius,
          )}
          src={link.image}
          alt=""
          loading="lazy"
        />
      ) : null}
      {link.name}
    </a>
  );
}

interface BrandingProps {
  appearance?: BiolinkAppearance | null;
}
function Branding({appearance}: BrandingProps) {
  const {branding, biolink} = useSettings();
  let src = biolink?.branding_img;
  const {trans} = useTrans();
  let isDarkMode = useIsDarkMode();

  if (appearance?.hideBranding) {
    return null;
  }

  if (appearance?.bgConfig?.color) {
    isDarkMode = getColorBrightness(appearance?.bgConfig?.color) > 100;
  }

  if (!src) {
    src = isDarkMode ? branding.logo_light : branding.logo_dark;
  }

  return (
    <div className="flex-shrink-0">
      <Link to="/">
        <img
          className="mx-auto h-24 w-auto"
          src={src}
          alt={trans(
            message(':site logo', {values: {site: branding.site_name}}),
          )}
        />
      </Link>
    </div>
  );
}
