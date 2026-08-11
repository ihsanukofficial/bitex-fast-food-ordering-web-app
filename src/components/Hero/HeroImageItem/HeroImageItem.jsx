import { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './HeroImageItem.module.css';

/**
 * HeroImageItem
 *
 * Defers non-priority imagery until it nears the viewport and forwards its wrapper ref
 * for parent-owned animation.
 */
const HeroImageItem = forwardRef(
  ({ src, alt = 'Hero image', className = '', lazy = true, priority = false }, ref) => {
    const imgRef = useRef(null);
    const [shouldLoadImage, setShouldLoadImage] = useState(priority || !lazy);

    useEffect(() => {
      if (priority || !lazy || !imgRef.current) {
        setShouldLoadImage(true);
        return undefined;
      }

      const currentImage = imgRef.current;

      // Older browsers still receive the image instead of an empty placeholder.
      if (!('IntersectionObserver' in window)) {
        setShouldLoadImage(true);
        return undefined;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (entry?.isIntersecting) {
            setShouldLoadImage(true);
            observer.disconnect();
          }
        },
        {
          // Begin loading before entry to avoid revealing an empty frame while scrolling.
          rootMargin: '200px',
          threshold: 0.01,
        }
      );

      observer.observe(currentImage);

      return () => observer.disconnect();
    }, [lazy, priority]);

    return (
      <div
        ref={ref}
        data-hero-item="true"
        className={`${styles.heroImageItem} ${className}`.trim()}
      >
        <img
          ref={imgRef}
          src={shouldLoadImage ? src : undefined}
          alt={alt}
          className={styles.image}
          data-image-entrance="fade-only"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          width="1792"
          height="2400"
        />
      </div>
    );
  }
);

HeroImageItem.displayName = 'HeroImageItem';

export default HeroImageItem;
