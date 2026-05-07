import './ProductCard.css'


export default function ProductCard({ product, onClick, className, actionLabel = 'Upravit', isActionDisabled = false }) {
    const productStatus = product.status || (product.enable ? 'enabledProduct' : 'disabledProduct')
    const classes = `productCard ${className || ''} ${productStatus}`.trim()
  return (
    <div className={classes}>
      <h3>{product.name}</h3>
      <p className="ingredients">
          {/*String s obsahem surovin*/}
        <strong>Obsahuje:</strong> {product.ingredients.map(i => `${i.name}${i.qty > 1 ? ' x' + i.qty : ''}`).join(', ')}
      </p>
      <div className="cardFooter">
        <span className="price">{product.price} Kč</span>
        <button className="btnAdd" type="button" disabled={isActionDisabled} onClick={() => onClick?.(product)}>
            {actionLabel}
        </button>
      </div>
    </div>
  )
}

