import { cloneElement, useRef, useState } from 'react';
import { uploadFile } from '../../../services/apiClient';
import { useEditMode } from '../../../context/EditModeContext';
import Icon from '../Icon/Icon';
import styles from './EditableImage.module.css';

/**
 * EditableImage
 *
 * Wraps an existing image element (`children`, rendered untouched) with a hover
 * overlay — a dark scrim plus a centered "Change image" button — that uploads a
 * replacement and writes its URL back to `path` on the shared edit session. Pass
 * `standalone` for a CSS `background-image` (nothing to wrap as `children`, e.g.
 * MenuSearchBanner): it renders just the hover zone, `inset: 0` over whatever
 * `position: relative` element the caller already has. Outside AdminLiveEditor this
 * is meant to be a no-op passthrough — but `className` (e.g. HeroImageGallery's
 * `.itemThree` grid placement, which has to land on the direct grid child) still has
 * to reach the real element even on that path, so it's merged onto `children` rather
 * than silently dropped.
 */
function EditableImage({ page, path, children, className, standalone = false }) {
  const edit = useEditMode();
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!edit) {
    if (!children || !className) return children ?? null;
    return cloneElement(children, {
      className: `${children.props.className || ''} ${className}`.trim(),
    });
  }

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setIsUploading(true);
    try {
      const { url } = await uploadFile(file);
      edit.update(page, path, url);
    } catch {
      // The upload failing leaves the existing image in place — nothing to reconcile.
    } finally {
      setIsUploading(false);
    }
  };

  const hoverZone = (
    <div className={styles.hoverZone}>
      <span className={styles.scrim} aria-hidden="true" />
      <button
        type="button"
        className={styles.overlayButton}
        onClick={(event) => {
          // The wrapped image is sometimes a link (e.g. the site logo) — never let
          // this bubble into a navigation while the admin is trying to upload.
          event.preventDefault();
          event.stopPropagation();
          inputRef.current?.click();
        }}
        disabled={isUploading}
      >
        <Icon name="ri-camera-line" size="1.3rem" ariaLabel="" />
        {isUploading ? 'Uploading…' : 'Change image'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
    </div>
  );

  if (standalone) return hoverZone;

  return <div className={`${styles.wrap} ${className || ''}`.trim()}>{children}{hoverZone}</div>;
}

export default EditableImage;
