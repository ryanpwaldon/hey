import type { AnyPublication } from '@hey/lens';
import type { FC } from 'react';

import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { PUBLICATION } from '@hey/data/tracking';
import { Menu } from '@hey/ui';
import { Leafwatch } from '@lib/leafwatch';
import toast from 'react-hot-toast';

interface ShareProps {
  publication: AnyPublication;
}

const Share: FC<ShareProps> = ({ publication }) => {
  return (
    <Menu.Item
      onClick={async () => {
        await navigator.clipboard.writeText(
          `${location.origin}/posts/${publication?.id}`
        );
        toast.success('Copied to clipboard!');
        Leafwatch.track(PUBLICATION.SHARE, {
          publication_id: publication.id
        });
      }}
    >
      <div className="flex items-center space-x-2">
        <ClipboardDocumentIcon className="size-4" />
        <div>Share</div>
      </div>
    </Menu.Item>
  );
};

export default Share;
