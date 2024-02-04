import type { AnyPublication } from '@hey/lens';
import type { FC } from 'react';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import stopEventPropagation from '@hey/lib/stopEventPropagation';
import { Menu } from '@hey/ui';
import cn from '@hey/ui/cn';
import useProfileStore from 'src/store/persisted/useProfileStore';

import Bookmark from './Bookmark';
import CopyPostText from './CopyPostText';
import Delete from './Delete';
import NotInterested from './NotInterested';
import Report from './Report';
import Share from './Share';
import Translate from './Translate';

interface PublicationMenuProps {
  publication: AnyPublication;
}

const PublicationMenu: FC<PublicationMenuProps> = ({ publication }) => {
  const currentProfile = useProfileStore((state) => state.currentProfile);
  const iconClassName = 'w-[15px] sm:w-[18px]';

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <button
          aria-label="More"
          className="outline-brand-500 rounded-full p-1.5 hover:bg-gray-300/20"
          onClick={stopEventPropagation}
          type="button"
        >
          <EllipsisHorizontalIcon
            className={cn('ld-text-gray-500', iconClassName)}
          />
        </button>
      </Menu.Trigger>
      <Menu.Content align="end">
        {currentProfile ? (
          <>
            {currentProfile?.id === publication?.by?.id ? (
              <Delete publication={publication} />
            ) : (
              <Report publication={publication} />
            )}
            <NotInterested publication={publication} />
            <Bookmark publication={publication} />
          </>
        ) : null}
        <Share publication={publication} />
        <Translate publication={publication} />
        <CopyPostText publication={publication} />
      </Menu.Content>
    </Menu.Root>
  );
};

export default PublicationMenu;
