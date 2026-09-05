import { preload } from 'react-dom';
import HeroImageItem from "../HeroImageItem/HeroImageItem";
import burger from "./heroimages/burger.webp";
import fries from "./heroimages/fries.webp";
import pasta from "./heroimages/pasta.webp";
import pizza from "./heroimages/pizza.webp";
import shawarma from "./heroimages/shawarma.webp";
import styles from "./HeroImageGallery.module.css";

/**
 * HeroImageGallery
 *
 * Composes the responsive hero image collage while keeping decorative layering
 * isolated from hero copy.
 */
const HeroImageGallery = () => {
  preload(pizza, { as: 'image', fetchPriority: 'high' });

  return (
    <div className={styles.heroImageGallery}>
      <HeroImageItem
        className={`${styles.galleryItem} ${styles.itemOne}`}
        src={burger}
        alt="Burger"
      />
      <HeroImageItem
        className={`${styles.galleryItem} ${styles.itemTwo}`}
        src={fries}
        alt="Fries"
      />
      <HeroImageItem
        className={`${styles.galleryItem} ${styles.itemThree}`}
        src={pizza}
        alt="Pizza"
        priority
      />
        <HeroImageItem
          className={`${styles.galleryItem} ${styles.itemFour}`}
          src={shawarma}
          alt="Shawarma"
        />
      <HeroImageItem
        className={`${styles.galleryItem} ${styles.itemFive}`}
        src={pasta}
        alt="Pasta"
      />
    </div>
  );
};

export default HeroImageGallery;
