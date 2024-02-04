import type { AnyPublication } from '@hey/lens';
import type { FC } from 'react';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Menu } from '@hey/ui';
import { useGlobalModalStateStore } from 'src/store/non-persisted/useGlobalModalStateStore';

interface ReportProps {
  publication: AnyPublication;
}

const Report: FC<ReportProps> = ({ publication }) => {
  const setShowPublicationReportModal = useGlobalModalStateStore(
    (state) => state.setShowPublicationReportModal
  );

  return (
    <Menu.Item
      onClick={() => setShowPublicationReportModal(true, publication.id)}
    >
      <div className="flex items-center space-x-2 text-red-500">
        <ExclamationTriangleIcon className="size-4" />
        <div>Report post</div>
      </div>
    </Menu.Item>
  );
};

export default Report;
