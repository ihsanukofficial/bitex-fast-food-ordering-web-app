import DeliveryDetailsField from '../DeliveryDetailsField/DeliveryDetailsField';
import DeliveryDetailsFieldLabel from '../DeliveryDetailsFieldLabel/DeliveryDetailsFieldLabel';
import DeliveryDetailsTextarea from '../DeliveryDetailsTextarea/DeliveryDetailsTextarea';

/**
 * DeliveryAddressField
 *
 * Composes the label and input controls for the Delivery Address Field field.
 */
function DeliveryAddressField() {
  return (
    <DeliveryDetailsField>
      <DeliveryDetailsFieldLabel
        inputId="delivery-address"
        label="Delivery address"
        required
      />
      <DeliveryDetailsTextarea
        id="delivery-address"
        name="deliveryAddress"
        rows="4"
        placeholder="House or apartment, street, area, and city"
        autoComplete="street-address"
        minLength="10"
        required
        variant="address"
      />
    </DeliveryDetailsField>
  );
}

export default DeliveryAddressField;
