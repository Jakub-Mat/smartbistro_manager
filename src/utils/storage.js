import { initialIngredients, initialProducts, initialOrders } from './dataConfig.js'

// Povolené stavy produktu v aplikaci.
const PRODUCT_STATUSES = new Set(['enabledProduct', 'disabledProduct', 'hiddenProduct'])

// Převede jeden produkt do jednotného tvaru.
// Podporuje i starší formát s `enable` místo `status`.
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

// Převede pole produktů přes normalizaci jednotlivých položek.
export function normalizeProducts(products) {
  return Array.isArray(products) ? products.map(normalizeProduct) : products
}

// Klíče, pod kterými aplikace ukládá data do localStorage.
export const STORAGE_KEYS = {
  ingredients: 'smartbistro_ingredients',
  products: 'smartbistro_products',
  orders: 'smartbistro_orders',
  filters: 'smartbistro_filters',
}

// Načte JSON z localStorage.
// U produktů navíc zajistí jejich normalizaci na aktuální strukturu.
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

// Zapíše hodnotu do localStorage jako JSON.
export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// Při prvním spuštění doplní do localStorage výchozí mock data.
// U produktů zároveň migruje starší uložený formát na nový.
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

// Pomocná priorita pro řazení skladové tabulky.
// 0 = pod minimem, 1 = přesně minimum, 2 = ostatní.
export const getPriority = (item) => {
  if (item.qty < item.min_qty) return 0
  if (item.qty === item.min_qty) return 1
  return 2
}

// Custom event, který oznamuje vytvoření nové objednávky.
export const ORDER_CREATED_EVENT = 'smartbistro:orderCreated'

// Vyvolá event pro ostatní části aplikace, aby si mohly obnovit data.
export function dispatchOrderCreatedEvent(newOrder) {
  window.dispatchEvent(
    new CustomEvent(ORDER_CREATED_EVENT, { detail: newOrder })
  )
}