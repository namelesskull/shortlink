import {ReactNode} from 'react';
import {BiolinkLayout} from '@app/short-links/renderers/biolink-renderer/biolink-layout';
import {Trans} from '@common/i18n/trans';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {useBiolinkEditorStore} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {useIsTabletMediaQuery} from '@common/utils/hooks/is-tablet-media-query';
import {useEditorBiolink} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';

export function LivePreview() {
  const {biolink} = useEditorBiolink();
  const appearance = useBiolinkEditorStore(s => s.appearance);
  const isTablet = useIsTabletMediaQuery();

  if (isTablet) {
    return null;
  }

  return (
    <div className="sticky top-24 h-max flex-shrink-0">
      <Chip
        size="sm"
        color="positive"
        radius="rounded"
        className="m-auto mb-24 w-max"
      >
        <Trans message="Live preview" />
      </Chip>
      <PhoneSkeleton>
        {biolink ? (
          <BiolinkLayout
            biolink={biolink}
            appearance={appearance}
            height="h-full"
          />
        ) : null}
      </PhoneSkeleton>
      <div className="mt-14 text-center text-sm text-muted">
        <Trans message="Scheduled and disabled content is not shown" />
      </div>
    </div>
  );
}

interface PhoneSkeletonProps {
  children: ReactNode;
}
function PhoneSkeleton({children}: PhoneSkeletonProps) {
  return (
    <div className="h-[724px] w-350 overflow-hidden rounded-[64px] border border-[12px] border-[#444546] shadow-lg">
      <div className="compact-scrollbar h-full overflow-y-auto">{children}</div>
    </div>
  );
}
