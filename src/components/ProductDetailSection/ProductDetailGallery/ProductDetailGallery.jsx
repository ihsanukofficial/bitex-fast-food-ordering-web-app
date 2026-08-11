import { useEffect, useRef, useState } from 'react';
import ProductDetailGalleryArrow from '../ProductDetailGalleryArrow/ProductDetailGalleryArrow';
import ProductDetailGalleryDot from '../ProductDetailGalleryDot/ProductDetailGalleryDot';
import ProductDetailGalleryDots from '../ProductDetailGalleryDots/ProductDetailGalleryDots';
import ProductDetailGalleryImage from '../ProductDetailGalleryImage/ProductDetailGalleryImage';
import ProductDetailGallerySlide from '../ProductDetailGallerySlide/ProductDetailGallerySlide';
import ProductDetailGalleryTrack from '../ProductDetailGalleryTrack/ProductDetailGalleryTrack';
import styles from './ProductDetailGallery.module.css';

/**
 * ProductDetailGallery
 *
 * Owns gallery navigation and touch gestures while keeping the active slide
 * synchronized with the supplied image collection.
 */
function ProductDetailGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const slideShowRef = useRef(null);
  const touchStartXRef = useRef(null);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    // Product changes must reset gesture state and return the gallery to its first image.
    setActiveIndex(0);
    setDragOffset(0);
    setIsDragging(false);
    touchStartXRef.current = null;
  }, [images]);

  const showPrevious = () =>
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const showNext = () =>
    setActiveIndex((index) => (index + 1) % images.length);

  const handlePointerDown = (event) => {
    // Mouse users have explicit controls; pointer dragging is reserved for touch input.
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
    // Scale the threshold on small galleries while capping effort on large screens.
    const swipeThreshold = Math.min(70, width * 0.16);

    if (swipeDistance <= -swipeThreshold) {
      showNext();
    } else if (swipeDistance >= swipeThreshold) {
      showPrevious();
    }

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
    <div
      ref={slideShowRef}
      className={styles.gallery}
      role="region"
      aria-label={`${title} image gallery`}
      tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishSwipe}
      onPointerCancel={cancelSwipe}
    >
      <ProductDetailGalleryTrack
        activeIndex={activeIndex}
        dragOffset={dragOffset}
        isDragging={isDragging}
      >
        {images.map((image, index) => (
          <ProductDetailGallerySlide key={`${image}-${index}`}>
            <ProductDetailGalleryImage
              src={image}
              alt={`${title}${hasMultipleImages ? `, image ${index + 1} of ${images.length}` : ''}`}
              priority={index === 0}
            />
          </ProductDetailGallerySlide>
        ))}
      </ProductDetailGalleryTrack>

      {hasMultipleImages && (
        <>
          <ProductDetailGalleryArrow
            direction="previous"
            onClick={showPrevious}
          />
          <ProductDetailGalleryArrow direction="next" onClick={showNext} />
          <ProductDetailGalleryDots>
            {images.map((image, index) => (
              <ProductDetailGalleryDot
                key={`${image}-dot-${index}`}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                imageNumber={index + 1}
                imageCount={images.length}
              />
            ))}
          </ProductDetailGalleryDots>
        </>
      )}
    </div>
  );
}

export default ProductDetailGallery;
