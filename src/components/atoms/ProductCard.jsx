import './ProductCard.css'
import {useLocation} from "react-router-dom";


export default function ProductCard({ product, onClick, className }) {
    const location = useLocation();

    const classes = `productCard ${className || ''} ${!product.enable ? 'disabled' : 'enable'}`.trim()
  return (
    <div className={classes}>
      <h3>{product.name}</h3>
      <p className="ingredients">
          {/*String s obsahem surovin*/}
        <strong>Obsahuje:</strong> {product.ingredients.map(i => `${i.name}${i.qty > 1 ? ' x' + i.qty : ''}`).join(', ')}
      </p>
      <div className="cardFooter">
        <span className="price">{product.price} Kč</span>
        <button className="btnAdd" onClick={() => onClick(product)}>
            {location.pathname === '/kiosk' ? '+' : (product.enable ? 'Deaktivovat' : 'Aktivovat')}
        </button>
      </div>
    </div>
  )
}

