import { useEffect, useRef, useState } from 'react';
import DealDetailGalleryArrow from '../DealDetailGalleryArrow/DealDetailGalleryArrow';
import DealDetailGalleryQuantityBadge from '../DealDetailGalleryQuantityBadge/DealDetailGalleryQuantityBadge';
import DealDetailGallerySlide from '../DealDetailGallerySlide/DealDetailGallerySlide';
import DealDetailGalleryThumbnail from '../DealDetailGalleryThumbnail/DealDetailGalleryThumbnail';
import DealDetailGalleryTrack from '../DealDetailGalleryTrack/DealDetailGalleryTrack';
import styles from './DealDetailGallery.module.css';

/**
 * DealDetailGallery
 *
 * The deal's own bundle photo comes first; every product it includes follows as its
 * own slide, badged with how many of it the deal contains. The main viewer is a
 * swipeable/keyboard-navigable carousel (mirrors ProductDetailGallery) with arrow
 * controls, plus a thumbnail strip for jumping straight to one image.
 */
function DealDetailGallery({ image, title, items }) {
  const slides = [
    { key: 'deal', src: image, alt: title, quantity: null },
    ...items
      .filter((item) => item.product?.images?.[0])
      .map((item) => ({
        key: item.product._id,
        src: item.product.images[0],
        alt: `${item.quantity}× ${item.product.title}`,
        quantity: item.quantity,
      })),
  ];
  const hasMultipleImages = slides.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const slideShowRef = useRef(null);
  const touchStartXRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
    setDragOffset(0);
    setIsDragging(false);
    touchStartXRef.current = null;
  }, [image]);

  const showPrevious = () => setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % slides.length);

  const handlePointerDown = (event) => {
    if (!hasMultipleImages || event.pointerType === 'mouse') return;
    touchStartXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (touchStartXRef.current === null) return;
    const width = slideShowRef.current?.clientWidth || 1;
    const offset = event.clientX - touchStartXRef.current;
    setDragOffset(Math.max(-width, Math.min(width, offset)));
  };

  const finishSwipe = (event) => {
    if (touchStartXRef.current === null) return;
    const width = slideShowRef.current?.clientWidth || 1;
    const swipeDistance = event.clientX - touchStartXRef.current;
    const swipeThreshold = Math.min(70, width * 0.16);
    if (swipeDistance <= -swipeThreshold) showNext();
    else if (swipeDistance >= swipeThreshold) showPrevious();
    touchStartXRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const cancelSwipe = () => {
    touchStartXRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleKeyDown = (event) => {
    if (!hasMultipleImages) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <div className={styles.gallery}>
      <div
        ref={slideShowRef}
        className={styles.mainFrame}
        role="region"
        aria-label={`${title} image gallery`}
        tabIndex={hasMultipleImages ? 0 : undefined}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishSwipe}
        onPointerCancel={cancelSwipe}
      >
        <DealDetailGalleryTrack activeIndex={activeIndex} dragOffset={dragOffset} isDragging={isDragging}>
          {slides.map((slide) => (
            <DealDetailGallerySlide key={slide.key}>
              <img
                className={styles.mainImage}
                src={slide.src}
                alt={slide.alt}
                loading="eager"
                decoding="async"
              />
              <DealDetailGalleryQuantityBadge quantity={slide.quantity} variant="main" />
            </DealDetailGallerySlide>
          ))}
        </DealDetailGalleryTrack>

        {hasMultipleImages && (
          <>
            <DealDetailGalleryArrow direction="previous" onClick={showPrevious} />
            <DealDetailGalleryArrow direction="next" onClick={showNext} />
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className={styles.thumbnails} aria-label={`${title} images`}>
          {slides.map((slide, index) => (
            <DealDetailGalleryThumbnail
              key={slide.key}
              src={slide.src}
              alt={slide.alt}
              quantity={slide.quantity}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DealDetailGallery;
