import './KioskCart.css'

export default function KioskCart({ items, onRemove, onClear, onSubmit }) {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="kiosk-cart">
      <h2>Košík:</h2>

      <div className="cart-items">
        {items.length === 0 ? (
          <p className="empty-message">Košík je prázdný</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <div className="item-controls">
                  <button
                    className="btn-decrease"
                    onClick={() => onRemove(item.id, false)}
                  >
                    −
                  </button>
                  <span className="item-quantity">{item.quantity}x</span>
                  <button
                    className="btn-increase"
                    onClick={() => onRemove(item.id, true)}
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="item-price">{item.price * item.quantity} Kč</span>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="cart-total">
            <strong>Celkem: {totalPrice} Kč</strong>
          </div>

          <div className="cart-actions">
            <button className="btn-cancel" onClick={onClear}>
              Zrušit
            </button>
            <button className="btn-submit" onClick={onSubmit}>
              Zaplatit
            </button>
          </div>
        </>
      )}
    </div>
  )
}

