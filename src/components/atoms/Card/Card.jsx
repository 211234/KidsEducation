import './Card.css';

const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'medium',
  shadow = 'medium',
  className = '',
  onClick,
  ...props 
}) => {
  const cardClass = `
    card 
    card--${variant} 
    card--padding-${padding}
    card--shadow-${shadow}
    ${onClick ? 'card--clickable' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      className={cardClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;