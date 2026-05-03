import './KioskCart.css'

export default function KioskCart({ items, onRemove, onClear, onSubmit }) {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="kioskCart">
      <h2>Košík:</h2>

      <div className="cartItems">
        {items.length === 0 ? (
          <p className="emptyMessage">Košík je prázdný</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="cartItem">
              <div className="itemInfo">
                <span className="itemName">{item.name}</span>
                <div className="itemControls">
                  <button
                    className="btnDecrease"
                    onClick={() => onRemove(item.id, false)}
                  >
                    −
                  </button>
                  <span className="itemQuantity">{item.quantity}x</span>
                  <button
                    className="btnIncrease"
                    onClick={() => onRemove(item.id, true)}
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="itemPrice">{item.price * item.quantity} Kč</span>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="cartTotal">
            <strong>Celkem: {totalPrice} Kč</strong>
          </div>

          <div className="cartActions">
            <button className="kioskCartCancelButton" onClick={onClear}>
              Zrušit
            </button>
            <button className="btnSubmit" onClick={onSubmit}>
              Zaplatit
            </button>
          </div>
        </>
      )}
    </div>
  )
}

