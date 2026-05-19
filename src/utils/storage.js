import { initialIngredients, initialProducts, initialOrders } from './dataConfig.js'

// Utility pro práci s `localStorage`.
// Tento modul poskytuje:
// - čtení/zápis JSON (`readJson`, `writeJson`)
// - inicializaci lokálního úložiště s výchozími mocky (`seedLocalStorage`)
// - zachované kompatibilní funkce `normalizeProduct(s)` (no-op)
// - pomocné utilitky jako `getPriority` a event pro nové objednávky

// No-op: funkce je zachována pro kompatibilitu s existujícími importy.
export function normalizeProduct(product) {
  return product
}

// No-op verze pro kompatibilitu (vrací vstup bez změn).
export function normalizeProducts(products) {
  return products
}

// Klíče, pod kterými aplikace ukládá data do localStorage.
// Konstanta s klíči používanými pro ukládání v localStorage.
// Použíj tyto klíče konzistentně v celé aplikaci.
export const STORAGE_KEYS = {
  ingredients: 'smartbistro_ingredients',
  products: 'smartbistro_products',
  orders: 'smartbistro_orders',
  filters: 'smartbistro_filters',
}

// Načte JSON z `localStorage` a vrátí `fallback` v případě chyby nebo neexistence.
// Neprovádí migrace ani normalizace — pouze parsuje uložená data.
export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (e) {
    console.warn(`readJson(${key}) failed, using fallback`, e)
    return fallback
  }
}

// Zapíše hodnotu do localStorage jako JSON.
// Zapíše hodnotu do localStorage jako JSON (bez validace).
export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// Při prvním spuštění doplní do `localStorage` výchozí mock data.
// Pokud již existují data v `localStorage`, nechává je beze změny.
export function seedLocalStorage() {
  if (localStorage.getItem(STORAGE_KEYS.ingredients) === null) {
    writeJson(STORAGE_KEYS.ingredients, initialIngredients)
  }

  // Pokud products chybí, zapiš výchozí produkty. Pokud již existují, nic neměň.
  if (localStorage.getItem(STORAGE_KEYS.products) === null) {
    writeJson(STORAGE_KEYS.products, initialProducts)
  }

  if (localStorage.getItem(STORAGE_KEYS.orders) === null) {
    writeJson(STORAGE_KEYS.orders, initialOrders)
  }
}

// Pomocná priorita pro řazení skladové tabulky.
// 0 = pod minimem, 1 = přesně minimum, 2 = ostatní.
// Vrátí číselnou prioritu pro položku skladu (používá se při řazení).
// 0 = pod minimem, 1 = přesně na minimu, 2 = ostatní.
export const getPriority = (item) => {
  if (item.qty < item.min_qty) return 0
  if (item.qty === item.min_qty) return 1
  return 2
}

// Custom event, který oznamuje vytvoření nové objednávky.
// Event vysílaný když je vytvořena nová objednávka (posluchače můžete registrovat v hooku např. `useOrders`).
export const ORDER_CREATED_EVENT = 'smartbistro:orderCreated'

// Vysílá CustomEvent s detailem nově vytvořené objednávky.
// Ostatní části aplikace (např. hooky) mohou naslouchat tomuto eventu a aktualizovat data.
export function dispatchOrderCreatedEvent(newOrder) {
  window.dispatchEvent(
    new CustomEvent(ORDER_CREATED_EVENT, { detail: newOrder })
  )
}