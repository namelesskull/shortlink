import {Trans} from '@common/i18n/trans';
import {
  biolinkEditorState,
  useBiolinkEditorStore,
} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {appearanceHeaderClassnames} from '@app/dashboard/biolink/biolink-editor/appearance/header-classnames';
import {BackgroundSelector} from '@common/background-selector/background-selector';

interface BackgroundSelectorProps {
  className?: string;
}
export function BiolinkBackgroundSelector({
  className,
}: BackgroundSelectorProps) {
  const value = useBiolinkEditorStore(s => s.appearance?.bgConfig);
  return (
    <div className={className}>
      <h2 className={appearanceHeaderClassnames.h2}>
        <Trans message="Background" />
      </h2>
      <BackgroundSelector
        value={value}
        onChange={newValue =>
          biolinkEditorState().updateAppearance({bgConfig: newValue})
        }
      />
    </div>
  );
}
