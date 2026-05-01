import './ProductCard.css'
import {useLocation} from "react-router-dom";


export default function ProductCard({ product, onClick, className }) {
    const location = useLocation();

    const classes = `kiosk-product-card ${className || ''} ${!product.enable ? 'disabled' : 'enable'}`.trim()
  return (
    <div className={classes}>
      <h3>{product.name}</h3>
      <p className="ingredients">
        <strong>Obsahuje:</strong> {product.ingredients.join(', ')}
      </p>
      <div className="card-footer">
        <span className="price">{product.price} Kč</span>
        <button className="btn-add" onClick={() => onClick(product)}>
            {location.pathname === '/kiosk' ? '+' : (product.enable ? 'Deaktivovat' : 'Aktivovat')}
        </button>
      </div>
    </div>
  )
}

