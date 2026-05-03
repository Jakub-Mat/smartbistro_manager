import { useState } from 'react'
import { readJson, writeJson, STORAGE_KEYS } from '../../utils/storage.js'
import { initialProducts } from '../../utils/mockData.js'
import KioskProductCard from '../atoms/ProductCard.jsx'
import KioskCart from '../molecules/KioskCart.jsx'
import './KioskPage.css'

export default function KioskPage() {
  const [cart, setCart] = useState([])
  const [orderSubmitted, setOrderSubmitted] = useState(false)
    //načtení produktů z localStorage, pokud nejsou, použije se initialProducts
    const [products] = useState(() =>
        readJson(STORAGE_KEYS.products, initialProducts)
    )

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const handleRemoveFromCart = (productId, isIncrease) => {
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === productId)
      if (!item) return prevCart

      if (isIncrease) {
        // Zvýšit množství
        return prevCart.map(i =>
          i.id === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      } else {
        // Snížit množství
        if (item.quantity <= 1) {
          // Odstranit položku
          return prevCart.filter(i => i.id !== productId)
        } else {
          return prevCart.map(i =>
            i.id === productId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
        }
      }
    })
  }

  const handleClearCart = () => {
    setCart([])
  }

  const handleSubmitOrder = () => {
    if (cart.length === 0) return

    const orders = readJson(STORAGE_KEYS.orders, [])
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const newOrder = {
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      products: cart.map(item => item.name),
      quantity: totalQuantity,
      totalPrice: totalPrice,
      isEnabled: true,
      timestamp: new Date().toISOString(),
    }

    writeJson(STORAGE_KEYS.orders, [...orders, newOrder])

    // Zobrazit potvrzení
    setOrderSubmitted(true)
    setCart([])

    // Po 2 sekundách resetovat
    setTimeout(() => {
      setOrderSubmitted(false)
    }, 2000)
  }

  return (
      <div id="kioskContent">
        <div className="productsGrid">
          {products.map(product => (
            <KioskProductCard
              key={product.id}
              product={product}
              onClick={handleAddToCart}
            />
          ))}
        </div>

        <KioskCart
          items={cart}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
          onSubmit={handleSubmitOrder}
        />

          {orderSubmitted && (
              <div className="orderConfirmation">
                  <div className="confirmationContent">
                      <h2>✓ Objednávka odeslána!</h2>
                      <p>Děkujeme za vaši objednávku.</p>
                  </div>
              </div>
          )}
      </div>


  )
}

