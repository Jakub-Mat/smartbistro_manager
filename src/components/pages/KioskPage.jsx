import { useState } from 'react'
import { readJson, writeJson, STORAGE_KEYS } from '../../utils/storage.js'
import { initialProducts, initialIngredients } from '../../utils/mockData.js'
import KioskProductCard from '../atoms/ProductCard.jsx'
import KioskCart from '../molecules/KioskCart.jsx'
import './KioskPage.css'

export default function KioskPage() {
  const getSyncedProductsOnLoad = () => {
    const currentProducts = readJson(STORAGE_KEYS.products, initialProducts)
    const currentIngredients = readJson(STORAGE_KEYS.ingredients, initialIngredients)

    const updatedProducts = currentProducts.map((product) => {
      const hasEnough = (product.ingredients || []).every((ingredient) => {
        const stock = currentIngredients.find((i) => i.name === ingredient.name)
        return stock && stock.qty >= (ingredient.qty || 1)
      })
      return { ...product, enable: !!hasEnough }
    })

    writeJson(STORAGE_KEYS.products, updatedProducts)
    return updatedProducts
  }

  const [cart, setCart] = useState([])
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  // Načtení produktů z localStorage pokud už tam nejsou
  const [products, setProducts] = useState(getSyncedProductsOnLoad)

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

  const disableProductIfNeeded = (product, quantity = 1) => {
    const currentProducts = readJson(STORAGE_KEYS.products, initialProducts)
    const currentIngredients = readJson(STORAGE_KEYS.ingredients, initialIngredients)
    const productToCheck = currentProducts.find((p) => p.id === product.id) || product
    const requiredIngredients = getRequiredIngredients(productToCheck, quantity)

    const hasEnough = Array.from(requiredIngredients.entries()).every(([name, needed]) => {
      const stock = currentIngredients.find((i) => i.name === name)
      return stock && stock.qty >= needed
    })

    if (hasEnough) return true

    const updatedProducts = currentProducts.map((p) =>
      p.id === product.id ? { ...p, enable: false } : p,
    )
    setProducts(updatedProducts)
    writeJson(STORAGE_KEYS.products, updatedProducts)
    return false
  }

  const enableProductIfPossible = (product) => {
    const currentProducts = readJson(STORAGE_KEYS.products, initialProducts)
    const currentIngredients = readJson(STORAGE_KEYS.ingredients, initialIngredients)
    const productToCheck = currentProducts.find((p) => p.id === product.id) || product
    const requiredIngredients = getRequiredIngredients(productToCheck, 1)

    const hasEnough = Array.from(requiredIngredients.entries()).every(([name, needed]) => {
      const stock = currentIngredients.find((i) => i.name === name)
      return stock && stock.qty >= needed
    })

    if (!hasEnough) return false

    const updatedProducts = currentProducts.map((p) =>
      p.id === product.id ? { ...p, enable: true } : p,
    )
    setProducts(updatedProducts)
    writeJson(STORAGE_KEYS.products, updatedProducts)
    return true
  }

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id)
    const nextQuantity = existing ? existing.quantity + 1 : 1

    if (!disableProductIfNeeded(product, nextQuantity)) return

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
      if (!disableProductIfNeeded(product, item.quantity + 1)) return
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
        const product = products.find((p) => p.id === productId) || item
        enableProductIfPossible(product)
        return prevCart.filter((i) => i.id !== productId)
      }

      const product = products.find((p) => p.id === productId) || item
      enableProductIfPossible(product)
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
    const currentProducts = readJson(STORAGE_KEYS.products, initialProducts)
    const currentIngredients = readJson(STORAGE_KEYS.ingredients, initialIngredients)
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
