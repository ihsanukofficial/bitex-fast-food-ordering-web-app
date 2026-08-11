import DeliveryDetailsCloseButton from '../DeliveryDetailsCloseButton/DeliveryDetailsCloseButton';
import DeliveryDetailsHeaderDescription from '../DeliveryDetailsHeaderDescription/DeliveryDetailsHeaderDescription';
import DeliveryDetailsHeaderEyebrow from '../DeliveryDetailsHeaderEyebrow/DeliveryDetailsHeaderEyebrow';
import DeliveryDetailsHeaderText from '../DeliveryDetailsHeaderText/DeliveryDetailsHeaderText';
import DeliveryDetailsHeaderTitle from '../DeliveryDetailsHeaderTitle/DeliveryDetailsHeaderTitle';
import styles from './DeliveryDetailsHeader.module.css';

/**
 * DeliveryDetailsHeader
 *
 * Groups the heading and supporting controls for the delivery and checkout experience.
 */
function DeliveryDetailsHeader({ onClose }) {
  return (
    <header className={styles.header}>
      <DeliveryDetailsHeaderText>
        <DeliveryDetailsHeaderEyebrow />
        <DeliveryDetailsHeaderTitle />
        <DeliveryDetailsHeaderDescription />
      </DeliveryDetailsHeaderText>
      <DeliveryDetailsCloseButton onClick={onClose} />
    </header>
  );
}

export default DeliveryDetailsHeader;
