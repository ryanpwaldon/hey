import type { ChangeEvent, FC } from 'react';

import {
  MusicalNoteIcon,
  PhotoIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { Menu, Spinner, Tooltip } from '@hey/ui';
import {
  MediaAudioMimeType,
  MediaImageMimeType
} from '@lens-protocol/metadata';
import { motion } from 'framer-motion';
import { useId, useState } from 'react';
import toast from 'react-hot-toast';
import useUploadAttachments from 'src/hooks/useUploadAttachments';
import { usePublicationAttachmentStore } from 'src/store/non-persisted/publication/usePublicationAttachmentStore';

const ImageMimeType = Object.values(MediaImageMimeType);
const AudioMimeType = Object.values(MediaAudioMimeType);
const VideoMimeType = [
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/quicktime'
];

const Attachment: FC = () => {
  const attachments = usePublicationAttachmentStore(
    (state) => state.attachments
  );
  const isUploading = usePublicationAttachmentStore(
    (state) => state.isUploading
  );
  const { handleUploadAttachments } = useUploadAttachments();
  const [showMenu, setShowMenu] = useState(false);
  const id = useId();

  const isTypeAllowed = (files: FileList) => {
    const allowedTypes = [
      ...ImageMimeType,
      ...AudioMimeType,
      ...VideoMimeType
    ] as string[];

    for (const file of files) {
      if (allowedTypes.includes(file.type)) {
        return true;
      }
    }

    return false;
  };

  const isUploadAllowed = (files: FileList) => {
    if (files[0]?.type.slice(0, 5) === 'image') {
      return attachments.length + files.length <= 4;
    }

    return files.length === 1;
  };

  const disableImageUpload = () => {
    const notImage = attachments[0] && attachments[0].type !== 'Image';
    const isLimit = !notImage && attachments.length >= 4;
    return notImage || isLimit;
  };

  const handleAttachment = async (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setShowMenu(false);

    try {
      const { files } = evt.target;
      if (!isUploadAllowed(files as FileList)) {
        toast.error('Exceeded max limit of 1 audio, or 1 video, or 4 images');
        return;
      }
      if (isTypeAllowed(files as FileList)) {
        await handleUploadAttachments(files);
        evt.target.value = '';
      } else {
        return toast.error('File format not allowed.');
      }
    } catch {
      toast.error('Something went wrong while uploading!');
    }
  };

  return (
    <div>
      <Menu.Root open={showMenu}>
        <Menu.Trigger>
          <motion.button
            aria-label="More"
            className="outline-brand-500 rounded-full outline-offset-8"
            onClick={() => setShowMenu(!showMenu)}
            whileTap={{ scale: 0.9 }}
          >
            {isUploading ? (
              <Spinner size="sm" />
            ) : (
              <Tooltip content="Media" placement="top">
                <PhotoIcon className="text-brand-500 size-5" />
              </Tooltip>
            )}
          </motion.button>
        </Menu.Trigger>
        <Menu.Content onInteractOutside={() => setShowMenu(false)}>
          <Menu.Item asChild disabled={disableImageUpload()}>
            <label className="flex items-center gap-2" htmlFor={`image_${id}`}>
              <PhotoIcon className="text-brand-500 size-4" />
              <span className="text-sm">Upload image(s)</span>
              <input
                accept={ImageMimeType.join(',')}
                className="hidden"
                disabled={disableImageUpload()}
                id={`image_${id}`}
                multiple
                onChange={handleAttachment}
                type="file"
              />
            </label>
          </Menu.Item>
          <Menu.Item asChild disabled={Boolean(attachments.length)}>
            <label className="flex items-center gap-2" htmlFor={`video_${id}`}>
              <VideoCameraIcon className="text-brand-500 size-4" />
              <span className="text-sm">Upload video</span>
              <input
                accept={VideoMimeType.join(',')}
                className="hidden"
                disabled={Boolean(attachments.length)}
                id={`video_${id}`}
                onChange={handleAttachment}
                type="file"
              />
            </label>
          </Menu.Item>
          <Menu.Item asChild disabled={Boolean(attachments.length)}>
            <label className="flex items-center gap-2" htmlFor={`audio_${id}`}>
              <MusicalNoteIcon className="text-brand-500 size-4" />
              <span className="text-sm">Upload audio</span>
              <input
                accept={AudioMimeType.join(',')}
                className="hidden"
                disabled={Boolean(attachments.length)}
                id={`audio_${id}`}
                onChange={handleAttachment}
                type="file"
              />
            </label>
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </div>
  );
};

export default Attachment;
