import type { AnyPublication } from '@hey/lens';
import type { FC } from 'react';

import { TrashIcon } from '@heroicons/react/24/outline';
import { Menu } from '@hey/ui';
import { useGlobalAlertStateStore } from 'src/store/non-persisted/useGlobalAlertStateStore';

interface DeleteProps {
  publication: AnyPublication;
}

const Delete: FC<DeleteProps> = ({ publication }) => {
  const setShowPublicationDeleteAlert = useGlobalAlertStateStore(
    (state) => state.setShowPublicationDeleteAlert
  );

  return (
    <Menu.Item onClick={() => setShowPublicationDeleteAlert(true, publication)}>
      <div className="flex items-center space-x-2">
        <TrashIcon className="size-4" />
        <div>Delete</div>
      </div>
    </Menu.Item>
  );
};

export default Delete;
