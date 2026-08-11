import DeliveryDetailsField from '../DeliveryDetailsField/DeliveryDetailsField';
import DeliveryDetailsFieldLabel from '../DeliveryDetailsFieldLabel/DeliveryDetailsFieldLabel';
import DeliveryDetailsTextInput from '../DeliveryDetailsTextInput/DeliveryDetailsTextInput';

/**
 * DeliveryDetailsTextField
 *
 * Composes the label and input controls for the Delivery Details Text Field field.
 */
function DeliveryDetailsTextField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
  minLength,
  pattern,
  title,
}) {
  return (
    <DeliveryDetailsField>
      <DeliveryDetailsFieldLabel
        inputId={id}
        label={label}
        required={required}
      />
      <DeliveryDetailsTextInput
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        pattern={pattern}
        title={title}
      />
    </DeliveryDetailsField>
  );
}

export default DeliveryDetailsTextField;
