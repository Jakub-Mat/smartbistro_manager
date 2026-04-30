import './ProductCard.css'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="kiosk-product-card">
      <h3>{product.name}</h3>
      <p className="ingredients">
        <strong>Obsahuje:</strong> {product.ingredients.join(', ')}
      </p>
      <div className="card-footer">
        <span className="price">{product.price} Kč</span>
        <button className="btn-add" onClick={() => onAdd(product)}>
          +
        </button>
      </div>
    </div>
  )
}

