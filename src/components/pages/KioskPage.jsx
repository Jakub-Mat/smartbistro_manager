import { useState } from 'react'
import { readJson, writeJson, STORAGE_KEYS, dispatchOrderCreatedEvent } from '../../utils/storage.js'
import { initialProducts, initialIngredients } from '../../utils/dataConfig.js'
import KioskProductCard from '../atoms/ProductCard.jsx'
import KioskCart from '../molecules/KioskCart.jsx'
import './KioskPage.css'

export default function KioskPage() {
  const [cart, setCart] = useState([])
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [products] = useState(() => readJson(STORAGE_KEYS.products, initialProducts))
  const [ingredients, setIngredients] = useState(() => readJson(STORAGE_KEYS.ingredients, initialIngredients))

  // Spočítá suroviny potřebné pro jeden produkt v daném množství
  const getRequiredIngredients = (product, quantity = 1) => {
    const required = new Map()

    // Sečte všechny suroviny se zohledněním jejich počtu
    ;(product.ingredients || []).forEach((ingredient) => {
      required.set(
        ingredient.name,
        (required.get(ingredient.name) || 0) + (ingredient.qty || 1) * quantity,
      )
    })

    return required
  }

  // Spočítá celkové suroviny rezervované aktuálním obsahem košíku
  const getCartRequiredIngredients = (cartItems = cart) => {
    const requiredIngredients = new Map()

    // Projde všechny položky v košíku a sečte jejich suroviny
    cartItems.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id)
      if (!product || !product.ingredients) return

      product.ingredients.forEach((ingredient) => {
        const needed = (ingredient.qty || 1) * cartItem.quantity
        requiredIngredients.set(
          ingredient.name,
          (requiredIngredients.get(ingredient.name) || 0) + needed,
        )
      })
    })

    return requiredIngredients
  }

  // Ověří, zda je možné produkt přidat bez překročení skladových zásob
  const canFulfillProductWithCart = (product, quantity = 1, excludedProductId = null) => {
    // Ověří, že je produkt dostupný
    if (product.status !== 'enabledProduct') return false

    const requiredIngredients = getRequiredIngredients(product, quantity)
    // Vylučuje aktuální produkt, aby se nepočítaly jeho stávající zásoby
    const cartReservedIngredients = getCartRequiredIngredients(
      cart.filter((item) => item.id !== excludedProductId),
    )

    // Kontroluje, zda je pro každou surovinu dostatek skladu
    return Array.from(requiredIngredients.entries()).every(([name, needed]) => {
      const stock = ingredients.find((i) => i.name === name)
      const reserved = cartReservedIngredients.get(name) || 0
      return stock && stock.qty >= reserved + needed
    })
  }

  // Přidá produkt do košíku s validací dostupnosti surovin
  const handleAddToCart = (product) => {
    // Zjistí, zda je produkt již v košíku a vypočítá nové množství
    const existing = cart.find((item) => item.id === product.id)
    const nextQuantity = existing ? existing.quantity + 1 : 1

    // Ověří, zda je možné zvýšit množství bez překročení zásob
    if (!canFulfillProductWithCart(product, nextQuantity, product.id)) {
      alert('Produkt není dostupný nebo na něj nejsou dostatečné zásoby.')
      return
    }

    // Aktualizuje stav košíku
    setCart((prevCart) => {
      const prevItem = prevCart.find((item) => item.id === product.id)
      if (prevItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Zvýší nebo sníží množství položky v košíku (nebo ji úplně odebere)
  const handleRemoveFromCart = (productId, isIncrease) => {
    const item = cart.find((i) => i.id === productId)

    // Při zvýšení ověří, zda jsou suroviny dostupné
    if (isIncrease && item) {
      const product = products.find((p) => p.id === productId) || item
      if (!canFulfillProductWithCart(product, item.quantity + 1, productId)) {
        alert('Produkt není dostupný nebo na něj nejsou dostatečné zásoby.')
        return
      }
    }

    // Aktualizuje množství nebo odebere položku
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

      if (prevItem.quantity <= 1) {
        return prevCart.filter((i) => i.id !== productId)
      }

      return prevCart.map((i) =>
        i.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      )
    })
  }

  // Vyprázdní košík bez jakýchkoli dalších akcí
  const handleClearCart = () => {
    setCart([])
  }

  // Zpracuje a uloží objednávku - validuje suroviny, aktualizuje sklad a vytvoří záznam
  const handleSubmitOrder = () => {
    if (cart.length === 0) return

    const orders = readJson(STORAGE_KEYS.orders, [])
    const requiredIngredients = getCartRequiredIngredients(cart)

    // Kontroluje dostupnost všech surovin
    const insufficientIngredients = []
    requiredIngredients.forEach((needed, ingredientName) => {
      const stock = ingredients.find((i) => i.name === ingredientName)
      if (!stock || stock.qty < needed) {
        insufficientIngredients.push(ingredientName)
      }
    })

    if (insufficientIngredients.length > 0) {
      alert('Nelze dokončit objednávku. Nedostatek surovin: ' + Array.from(new Set(insufficientIngredients)).join(', '))
      return
    }

    // Aktualizuje stav surovin v úložišti
    const updatedIngredients = ingredients.map((ing) => {
      const needed = requiredIngredients.get(ing.name) || 0
      return { ...ing, qty: ing.qty - needed }
    })
    writeJson(STORAGE_KEYS.ingredients, updatedIngredients)
    setIngredients(updatedIngredients)

    // Vytvoří nový záznam objednávky s metadaty
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const newOrder = {
      id: Math.max(...orders.map((o) => o.id), 0) + 1,
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price ?? 0,
      })),
      quantity: totalQuantity,
      totalPrice,
      isEnabled: true,
      timestamp: new Date().toISOString(),
    }

    // Uloží objednávku a notifikuje ostatní komponenty
    writeJson(STORAGE_KEYS.orders, [...orders, newOrder])
    dispatchOrderCreatedEvent(newOrder)

    // Zobrazí potvrzení a resetuje stav
    setOrderSubmitted(true)
    setCart([])

    // Skryje potvrzení po 2 sekundách
    setTimeout(() => {
      setOrderSubmitted(false)
    }, 2000)
  }

  return (
    <div id="kioskContent">
      <div className="productsGrid">
        {products
          .filter((product) => product.status !== 'hiddenProduct')
          .map((product) => {
            const cartItem = cart.find((item) => item.id === product.id)
            const nextQuantity = cartItem ? cartItem.quantity + 1 : 1
            const isActionDisabled = !canFulfillProductWithCart(product, nextQuantity, product.id)

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
