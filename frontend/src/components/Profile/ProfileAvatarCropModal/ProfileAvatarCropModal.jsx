import { useEffect, useMemo, useRef, useState } from 'react';
import useFocusTrap from '../../../hooks/useFocusTrap';
import Icon from '../../Utils/Icon/Icon';
import styles from './ProfileAvatarCropModal.module.css';

const VIEWPORT_SIZE = 280;
const OUTPUT_SIZE = 512;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

/**
 * Clamps a pan offset so the scaled image always fully covers the square
 * viewport — the crop region can never reveal empty space at an edge.
 */
const clampOffset = (value, displayedSize) => {
  const maxOffset = Math.max(0, (displayedSize - VIEWPORT_SIZE) / 2);
  return Math.min(maxOffset, Math.max(-maxOffset, value));
};

/**
 * ProfileAvatarCropModal
 *
 * A free-form pan-and-zoom cropper locked to a 1:1 output, shown before a
 * selected photo is ever uploaded. Confirming exports a fixed 512x512 JPEG
 * of exactly what's inside the square viewport.
 */
function ProfileAvatarCropModal({ file, isSaving = false, onCancel, onCropped }) {
  const dialogRef = useRef(null);
  const imgRef = useRef(null);
  const dragRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(null);
  const [natural, setNatural] = useState(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useFocusTrap({ containerRef: dialogRef, isActive: true, onEscape: onCancel });

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const scale = natural ? natural.minScale * zoom : 0;
  const displayedWidth = natural ? natural.width * scale : 0;
  const displayedHeight = natural ? natural.height * scale : 0;

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    const minScale = Math.max(VIEWPORT_SIZE / naturalWidth, VIEWPORT_SIZE / naturalHeight);
    setNatural({ width: naturalWidth, height: naturalHeight, minScale });
    setZoom(MIN_ZOOM);
    setOffset({ x: 0, y: 0 });
  };

  const handleZoomChange = (event) => {
    const nextZoom = Number(event.target.value);
    setZoom(nextZoom);
    if (!natural) return;
    const nextScale = natural.minScale * nextZoom;
    setOffset((current) => ({
      x: clampOffset(current.x, natural.width * nextScale),
      y: clampOffset(current.y, natural.height * nextScale),
    }));
  };

  const handlePointerDown = (event) => {
    if (!natural) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startX: event.clientX, startY: event.clientY, startOffset: offset };
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current || !natural) return;
    const { startX, startY, startOffset } = dragRef.current;
    setOffset({
      x: clampOffset(startOffset.x + (event.clientX - startX), displayedWidth),
      y: clampOffset(startOffset.y + (event.clientY - startY), displayedHeight),
    });
  };

  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
  };

  const handleWheel = (event) => {
    if (!natural) return;
    event.preventDefault();
    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom - event.deltaY * 0.0015));
    handleZoomChange({ target: { value: nextZoom } });
  };

  const canConfirm = useMemo(() => Boolean(natural) && !isSaving, [natural, isSaving]);

  const handleConfirm = () => {
    if (!natural || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const context = canvas.getContext('2d');

    const imageLeft = (VIEWPORT_SIZE - displayedWidth) / 2 + offset.x;
    const imageTop = (VIEWPORT_SIZE - displayedHeight) / 2 + offset.y;
    const sourceX = -imageLeft / scale;
    const sourceY = -imageTop / scale;
    const sourceSize = VIEWPORT_SIZE / scale;

    context.drawImage(
      imgRef.current,
      sourceX,
      sourceY,
      sourceSize,
      sourceSize,
      0,
      0,
      OUTPUT_SIZE,
      OUTPUT_SIZE,
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onCropped(new File([blob], 'avatar.jpg', { type: 'image/jpeg' }));
      },
      'image/jpeg',
      0.92,
    );
  };

  return (
    <div className={styles.backdrop} onMouseDown={onCancel}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-crop-title"
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="avatar-crop-title" className={styles.title}>
          Crop your photo
        </h2>

        <div
          className={styles.viewport}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          {imageUrl && (
            <img
              ref={imgRef}
              src={imageUrl}
              alt=""
              className={styles.image}
              draggable={false}
              data-image-entrance="fade-only"
              onLoad={handleImageLoad}
              style={{
                width: natural ? `${displayedWidth}px` : 'auto',
                height: natural ? `${displayedHeight}px` : 'auto',
                transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
              }}
            />
          )}
          <div className={styles.guide} aria-hidden="true" />
        </div>

        <div className={styles.zoomRow}>
          <Icon name="ri-subtract-line" size="1rem" color="#8a8a8a" ariaLabel="" />
          <input
            type="range"
            className={styles.zoomSlider}
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            onChange={handleZoomChange}
            disabled={!natural}
            aria-label="Zoom"
          />
          <Icon name="ri-add-line" size="1.1rem" color="#8a8a8a" ariaLabel="" />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onCancel} disabled={isSaving}>
            Cancel
          </button>
          <button type="button" className={styles.confirmButton} onClick={handleConfirm} disabled={!canConfirm}>
            {isSaving ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileAvatarCropModal;
