import {DragIndicatorIcon} from '@common/icons/material/DragIndicator';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Button} from '@common/ui/buttons/button';
import {EditIcon} from '@common/icons/material/Edit';
import {Trans} from '@common/i18n/trans';
import {DetachContentItemButton} from '@app/dashboard/biolink/biolink-editor/content/detach-content-item-button';
import {ReactNode, useRef} from 'react';
import {
  Biolink,
  BiolinkLink,
  BiolinkWidget,
} from '@app/dashboard/biolink/biolink';
import {useSortBiolinkContent} from '@app/dashboard/biolink/biolink-editor/requests/use-sort-biolink-content';
import clsx from 'clsx';
import {useSortable} from '@common/ui/interactions/dnd/sortable/use-sortable';

interface BiolinkContentItemLayoutProps {
  item?: BiolinkLink | BiolinkWidget;
  biolink?: Biolink;
  title?: ReactNode;
  updateDialog?: ReactNode;
  children: ReactNode;
  actionRow?: ReactNode;
}
export function BiolinkContentItemLayout({
  item,
  biolink,
  title,
  updateDialog,
  children,
  actionRow,
}: BiolinkContentItemLayoutProps) {
  const sortContent = useSortBiolinkContent();
  const itemRef = useRef<HTMLDivElement>(null);
  const sortDisabled = !item || item.pinned != null;

  const {sortableProps, dragHandleRef} = useSortable({
    item: item || 'noop',
    items: biolink?.content || [],
    type: 'biolinkEditorSortable',
    ref: itemRef,
    onSortEnd: (oldIndex, newIndex) => {
      sortContent.mutate({oldIndex, newIndex});
    },
    disabled: sortDisabled,
  });

  return (
    <div
      className="mb-20 flex h-172 items-stretch rounded-panel border bg-paper shadow"
      ref={itemRef}
      {...sortableProps}
    >
      <button
        type="button"
        className={clsx(
          'flex-shrink-0 border-r px-10 text-muted',
          !sortDisabled && 'hover:text-primary',
        )}
        disabled={sortDisabled}
        ref={dragHandleRef}
      >
        <DragIndicatorIcon />
      </button>
      <div className="min-w-0 flex-auto p-24">
        <div className="flex items-center">
          {title && (
            <div className="mb-4 mr-auto flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap font-medium">
              {title}
            </div>
          )}
          {updateDialog && (
            <DialogTrigger type="modal">
              <Button
                className="ml-20 flex-shrink-0"
                variant="text"
                color="primary"
                startIcon={<EditIcon />}
              >
                <Trans message="Edit" />
              </Button>
              {updateDialog}
            </DialogTrigger>
          )}
          {biolink && item && <DetachContentItemButton item={item} />}
        </div>
        <div className="mb-20">{children}</div>
        {actionRow}
      </div>
    </div>
  );
}
