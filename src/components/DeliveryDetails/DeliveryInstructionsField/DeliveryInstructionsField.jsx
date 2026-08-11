import DeliveryDetailsField from '../DeliveryDetailsField/DeliveryDetailsField';
import DeliveryDetailsFieldLabel from '../DeliveryDetailsFieldLabel/DeliveryDetailsFieldLabel';
import DeliveryDetailsOptionalIndicator from '../DeliveryDetailsOptionalIndicator/DeliveryDetailsOptionalIndicator';
import DeliveryDetailsTextarea from '../DeliveryDetailsTextarea/DeliveryDetailsTextarea';

/**
 * DeliveryInstructionsField
 *
 * Composes the label and input controls for the Delivery Instructions Field field.
 */
function DeliveryInstructionsField() {
  return (
    <DeliveryDetailsField>
      <DeliveryDetailsFieldLabel
        inputId="delivery-requirements"
        label="Delivery instructions"
      >
        <DeliveryDetailsOptionalIndicator />
      </DeliveryDetailsFieldLabel>
      <DeliveryDetailsTextarea
        id="delivery-requirements"
        name="deliveryRequirements"
        rows="3"
        placeholder="Landmark, gate code, preferred delivery time, or other instructions"
        variant="instructions"
      />
    </DeliveryDetailsField>
  );
}

export default DeliveryInstructionsField;
