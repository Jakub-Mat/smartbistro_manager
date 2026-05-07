import { useState } from 'react'
import { readJson, writeJson, STORAGE_KEYS } from '../../utils/storage.js'
import { initialProducts, initialIngredients } from '../../utils/mockData.js'
import KioskProductCard from '../atoms/ProductCard.jsx'
import KioskCart from '../molecules/KioskCart.jsx'
import './KioskPage.css'

export default function KioskPage() {
  const [cart, setCart] = useState([])
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [products] = useState(() => readJson(STORAGE_KEYS.products, initialProducts))
  const [ingredients, setIngredients] = useState(() => readJson(STORAGE_KEYS.ingredients, initialIngredients))

  const getRequiredIngredients = (product, quantity = 1) => {
    const required = new Map()
    ;(product.ingredients || []).forEach((ingredient) => {
      required.set(
        ingredient.name,
        (required.get(ingredient.name) || 0) + (ingredient.qty || 1) * quantity,
      )
    })
    return required
  }

  const canFulfillProduct = (product, quantity = 1) => {
    if (product.status !== 'enabledProduct') return false
    const requiredIngredients = getRequiredIngredients(product, quantity)
    return Array.from(requiredIngredients.entries()).every(([name, needed]) => {
      const stock = ingredients.find((i) => i.name === name)
      return stock && stock.qty >= needed
    })
  }

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id)
    const nextQuantity = existing ? existing.quantity + 1 : 1

    if (!canFulfillProduct(product, nextQuantity)) {
      alert('Produkt není dostupný nebo na něj nejsou dostatečné zásoby.')
      return
    }

    setCart((prevCart) => {
      const prevItem = prevCart.find((item) => item.id === product.id)
      if (prevItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (productId, isIncrease) => {
    const item = cart.find((i) => i.id === productId)

    if (isIncrease && item) {
      const product = products.find((p) => p.id === productId) || item
      if (!canFulfillProduct(product, item.quantity + 1)) {
        alert('Produkt není dostupný nebo na něj nejsou dostatečné zásoby.')
        return
      }
    }

    setCart((prevCart) => {
      const prevItem = prevCart.find((i) => i.id === productId)
      if (!prevItem) return prevCart

      if (isIncrease) {
        return prevCart.map((i) =>
          i.id === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      }

      if (item.quantity <= 1) {
        return prevCart.filter((i) => i.id !== productId)
      }

      return prevCart.map((i) =>
        i.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      )
    })
  }

  const handleClearCart = () => {
    setCart([])
  }

  const handleSubmitOrder = () => {
    if (cart.length === 0) return

    // Načíst aktuální zásoby a produkty
    const currentProducts = products
    const currentIngredients = ingredients
    const orders = readJson(STORAGE_KEYS.orders, [])

    // Spočítat potřebu surovin na základě košíku
    const requiredIngredients = new Map()
    cart.forEach(cartItem => {
      const product = currentProducts.find(p => p.id === cartItem.id)
      if (!product || !product.ingredients) return

      product.ingredients.forEach(ingredient => {
        const needed = (ingredient.qty || 1) * cartItem.quantity
        const key = ingredient.name
        requiredIngredients.set(key, (requiredIngredients.get(key) || 0) + needed)
      })
    })

    // Kontrola dostupnosti surovin
    let insufficientIngredients = []
    requiredIngredients.forEach((needed, ingredientName) => {
      const stock = currentIngredients.find(i => i.name === ingredientName)
      if (!stock || stock.qty < needed) {
        insufficientIngredients.push(ingredientName)
      }
    })

    // Pokud chybí suroviny, zablokovat objednávku
    if (insufficientIngredients.length > 0) {
      alert('Nelze dokončit objednávku. Nedostatek surovin: ' + Array.from(new Set(insufficientIngredients)).join(', '))
      return
    }

    // Pokud vše OK, odečíst suroviny a uložit objednávku
    const updatedIngredients = currentIngredients.map(ing => {
      const needed = requiredIngredients.get(ing.name) || 0
      return { ...ing, qty: ing.qty - needed }
    })
    writeJson(STORAGE_KEYS.ingredients, updatedIngredients)
    setIngredients(updatedIngredients)

    // Vytvořit objednávku
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const newOrder = {
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      products: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity
      })),
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
          {products
            .filter((product) => product.status !== 'hiddenProduct')
            .map(product => {
              const cartItem = cart.find((item) => item.id === product.id)
              const nextQuantity = cartItem ? cartItem.quantity + 1 : 1
              const isActionDisabled = !canFulfillProduct(product, nextQuantity)

              return (
            <KioskProductCard
              key={product.id}
              product={product}
              onClick={handleAddToCart}
              actionLabel="+"
              isActionDisabled={isActionDisabled}
            />
              )
            })}
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
