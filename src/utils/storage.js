import { initialIngredients, initialProducts, initialOrders } from './mockData.js'

 const PRODUCT_STATUSES = new Set(['enabledProduct', 'disabledProduct', 'hiddenProduct'])

export function normalizeProduct(product) {
  if (!product || typeof product !== 'object') return product

  const normalizedStatus = PRODUCT_STATUSES.has(product.status)
    ? product.status
    : typeof product.enable === 'boolean'
      ? (product.enable ? 'enabledProduct' : 'disabledProduct')
      : 'enabledProduct'

  const { enable: _enable, ...rest } = product
  return {
    ...rest,
    status: normalizedStatus,
  }
}

export function normalizeProducts(products) {
  return Array.isArray(products) ? products.map(normalizeProduct) : products
}

export const STORAGE_KEYS = {
  ingredients: 'smartbistro_ingredients',
  products: 'smartbistro_products',
  orders: 'smartbistro_orders',
  filters: 'smartbistro_filters',
}

export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed = JSON.parse(raw)
    if (key === STORAGE_KEYS.products) {
      return normalizeProducts(parsed)
    }
    return parsed
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function seedLocalStorage() {
  if (localStorage.getItem(STORAGE_KEYS.ingredients) === null) {
    writeJson(STORAGE_KEYS.ingredients, initialIngredients)
  }

  if (localStorage.getItem(STORAGE_KEYS.products) === null) {
    writeJson(STORAGE_KEYS.products, initialProducts)
  } else {
    const normalizedProducts = normalizeProducts(readJson(STORAGE_KEYS.products, initialProducts))
    writeJson(STORAGE_KEYS.products, normalizedProducts)
  }

  if (localStorage.getItem(STORAGE_KEYS.orders) === null) {
    writeJson(STORAGE_KEYS.orders, initialOrders)
  }
}

// ŘAZENÍ PRO TABULKU StockTable
//vypočte prioritu pro řazení: 0 = červená, 1 = oranžová, 2 = ostatní
export const getPriority = (item) => {
  if (item.qty < item.min_qty) return 0
  if (item.qty === item.min_qty) return 1
  return 2
}

// Custom event pro aktualizaci dat po vytvoření nové objednávky pro custom hook useOrders
// Vytvořit custom event
export const ORDER_CREATED_EVENT = 'smartbistro:orderCreated'

export function dispatchOrderCreatedEvent(newOrder) {
  window.dispatchEvent(
    new CustomEvent(ORDER_CREATED_EVENT, { detail: newOrder })
  )
}