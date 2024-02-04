import type { AnyPublication } from '@hey/lens';
import type { FC } from 'react';

import { LanguageIcon } from '@heroicons/react/24/outline';
import { PUBLICATION } from '@hey/data/tracking';
import getPublicationData from '@hey/lib/getPublicationData';
import { isMirrorPublication } from '@hey/lib/publicationHelpers';
import stopEventPropagation from '@hey/lib/stopEventPropagation';
import { Menu } from '@hey/ui';
import { Leafwatch } from '@lib/leafwatch';
import Link from 'next/link';
import urlcat from 'urlcat';

interface TranslateProps {
  publication: AnyPublication;
}

const Translate: FC<TranslateProps> = ({ publication }) => {
  const targetPublication = isMirrorPublication(publication)
    ? publication.mirrorOn
    : publication;
  const filteredContent =
    getPublicationData(targetPublication.metadata)?.content || '';

  if (filteredContent.length < 1) {
    return null;
  }

  const getGoogleTranslateUrl = (text: string): string => {
    return encodeURI(
      urlcat('https://translate.google.com/#auto|en|:text', { text })
    );
  };

  return (
    <Menu.Item asChild>
      <Link
        href={getGoogleTranslateUrl(filteredContent || '')}
        onClick={(event) => {
          stopEventPropagation(event);
          Leafwatch.track(PUBLICATION.TRANSLATE, {
            publication_id: publication.id
          });
        }}
        target="_blank"
      >
        <div className="flex items-center space-x-2">
          <LanguageIcon className="size-4" />
          <div>Translate</div>
        </div>
      </Link>
    </Menu.Item>
  );
};

export default Translate;
