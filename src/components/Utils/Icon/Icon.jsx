import iconAssets from './iconAssets';

/**
 * Icon
 *
 * Centralizes Remix Icon class construction and accessible-label behavior for all icon
 * consumers.
 */
const Icon = (props) => {
  const {
    name = 'ri-star-fill',
    size = '1.25rem',
    color = 'currentColor',
    className = '',
    ariaLabel = 'icon',
  } = props;
  const markup = iconAssets[name] || iconAssets['ri-star-fill'];

  return (
    <span
      className={`${name} ${className}`.trim()}
      style={{
        display: 'inline-flex',
        flexShrink: 0,
        width: '1em',
        height: '1em',
        color,
        fontSize: size,
        lineHeight: 1,
        verticalAlign: '-0.125em',
      }}
      aria-label={ariaLabel || undefined}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export default Icon;
