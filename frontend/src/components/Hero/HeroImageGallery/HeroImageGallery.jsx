import { preload } from 'react-dom';
import EditableImage from '../../Utils/Editable/EditableImage';
import HeroImageItem from "../HeroImageItem/HeroImageItem";
import burger from "./heroimages/burger.webp";
import fries from "./heroimages/fries.webp";
import pasta from "./heroimages/pasta.webp";
import pizza from "./heroimages/pizza.webp";
import shawarma from "./heroimages/shawarma.webp";
import styles from "./HeroImageGallery.module.css";

const SLOTS = [
  { slotClass: 'itemOne', defaultSrc: burger, alt: 'Burger' },
  { slotClass: 'itemTwo', defaultSrc: fries, alt: 'Fries' },
  { slotClass: 'itemThree', defaultSrc: pizza, alt: 'Pizza', priority: true },
  { slotClass: 'itemFour', defaultSrc: shawarma, alt: 'Shawarma' },
  { slotClass: 'itemFive', defaultSrc: pasta, alt: 'Pasta' },
];

/**
 * HeroImageGallery
 *
 * Composes the responsive hero image collage from five fixed, admin-editable slots
 * (see `hero.images` in the Home content model) — each falls back to its bundled
 * default photo until a custom one is uploaded. Grid placement (`.itemOne`..
 * `.itemFive`) has to land on the direct child of `.heroImageGallery`, so it's passed
 * as EditableImage's `className` rather than left on HeroImageItem underneath it.
 */
const HeroImageGallery = ({ images = [] }) => {
  const srcFor = (index) => images[index] || SLOTS[index].defaultSrc;
  preload(srcFor(2), { as: 'image', fetchPriority: 'high' });

  return (
    <div className={styles.heroImageGallery}>
      {SLOTS.map((slot, index) => (
        <EditableImage
          key={slot.slotClass}
          page="home"
          path={['hero', 'images', index]}
          className={`${styles.galleryItem} ${styles[slot.slotClass]}`}
        >
          <HeroImageItem src={srcFor(index)} alt={slot.alt} priority={slot.priority} />
        </EditableImage>
      ))}
    </div>
  );
};

export default HeroImageGallery;
