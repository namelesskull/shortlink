import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Link} from '@app/dashboard/links/link';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {BackgroundSelectorConfig} from '@common/background-selector/background-selector-config';

export interface BiolinkLink extends Omit<Link, 'groups'> {
  leap_until?: string;
  active_locked?: boolean;
  animation: string;
  position: number;
  pinned?: 'top' | null;
}

export interface BiolinkWidget {
  id: number;
  type: WidgetType;
  active: boolean;
  model_type: 'biolinkWidget';
  position: number;
  pinned?: 'top' | null;
  config: Record<string, string>;
}

export interface Biolink extends Omit<LinkGroup, 'rotator' | 'model_type'> {
  content: (BiolinkLink | BiolinkWidget)[];
  appearance?: {config: BiolinkAppearance};
  model_type: 'biolink';
}

export interface BiolinkBtnConfig {
  variant?: 'outline' | 'flat';
  radius?: 'rounded-none' | 'rounded' | 'rounded-full';
  shadow?: string;
  color?: string;
  textColor?: string;
}

export interface BiolinkFontConfig {
  family: string;
}

export interface BiolinkAppearance {
  bgConfig?: BackgroundSelectorConfig;
  btnConfig?: BiolinkBtnConfig;
  fontConfig?: BiolinkFontConfig;
  hideBranding?: boolean;
}
