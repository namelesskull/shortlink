import {ReactElement, ReactNode} from 'react';
import clsx from 'clsx';
import {NoPermissionButton} from '@common/billing/upgrade/no-permission-button';

interface LinkFormSectionProps {
  title: ReactElement;
  description: ReactElement;
  children: ReactNode;
  upgradeMessage?: ReactNode;
}
export function LinkFormSection({
  title,
  description,
  children,
  upgradeMessage,
}: LinkFormSectionProps) {
  return (
    <div className="border-t pt-24">
      <div
        className={clsx(
          'font-semibold',
          upgradeMessage && 'mb-8 flex items-center gap-10',
        )}
      >
        <div className="text-sm">{title}</div>
        {upgradeMessage && <NoPermissionButton message={upgradeMessage} />}
      </div>
      <div className="text-sm text-muted">{description}</div>
      {children}
    </div>
  );
}
