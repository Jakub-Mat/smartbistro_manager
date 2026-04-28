import { initialIngredients, initialProducts, initialOrders } from './mockData.js'

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
    return JSON.parse(raw)
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