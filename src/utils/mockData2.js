export const initialIngredients = [
  {
    name: 'Káva',
    qty: 60,
    min_qty: 25,
    price: 4,
  },
  {
    name: 'Mléko',
    qty: 45,
    min_qty: 20,
    price: 12,
  },
  {
    name: 'Smetana',
    qty: 18,
    min_qty: 10,
    price: 9,
  },
  {
    name: 'Cukr',
    qty: 40,
    min_qty: 15,
    price: 2,
  },
  {
    name: 'Kakaový prášek',
    qty: 22,
    min_qty: 8,
    price: 11,
  },
  {
    name: 'Karamelový sirup',
    qty: 16,
    min_qty: 6,
    price: 18,
  },
  {
    name: 'Čokoládový sirup',
    qty: 14,
    min_qty: 6,
    price: 19,
  },
  {
    name: 'Vanilkový sirup',
    qty: 12,
    min_qty: 6,
    price: 17,
  },
  {
    name: 'Jablečný džus',
    qty: 24,
    min_qty: 10,
    price: 15,
  },
  {
    name: 'Led',
    qty: 80,
    min_qty: 30,
    price: 1,
  },
]

export const initialProducts = [
  {
    id: 1,
    name: 'Espresso',
    ingredients: [
      { name: 'Káva', qty: 2 },
      { name: 'Cukr', qty: 1 },
    ],
    price: 45,
    status: 'enabledProduct',
  },
  {
    id: 2,
    name: 'Espresso Macchiato',
    ingredients: [
      { name: 'Káva', qty: 2 },
      { name: 'Mléko', qty: 1 },
    ],
    price: 52,
    status: 'enabledProduct',
  },
  {
    id: 3,
    name: 'Cappuccino',
    ingredients: [
      { name: 'Káva', qty: 2 },
      { name: 'Mléko', qty: 2 },
      { name: 'Smetana', qty: 1 },
    ],
    price: 59,
    status: 'enabledProduct',
  },
  {
    id: 4,
    name: 'Latte',
    ingredients: [
      { name: 'Káva', qty: 2 },
      { name: 'Mléko', qty: 3 },
      { name: 'Cukr', qty: 1 },
    ],
    price: 62,
    status: 'enabledProduct',
  },
  {
    id: 5,
    name: 'Flat White',
    ingredients: [
      { name: 'Káva', qty: 3 },
      { name: 'Mléko', qty: 2 },
    ],
    price: 68,
    status: 'enabledProduct',
  },
  {
    id: 6,
    name: 'Iced Latte',
    ingredients: [
      { name: 'Káva', qty: 2 },
      { name: 'Mléko', qty: 3 },
      { name: 'Led', qty: 2 },
    ],
    price: 70,
    status: 'enabledProduct',
  },
  {
    id: 7,
    name: 'Mocha',
    ingredients: [
      { name: 'Káva', qty: 2 },
      { name: 'Mléko', qty: 2 },
      { name: 'Kakaový prášek', qty: 1 },
      { name: 'Smetana', qty: 1 },
    ],
    price: 72,
    status: 'enabledProduct',
  },
  {
    id: 8,
    name: 'Caramel Latte',
    ingredients: [
      { name: 'Káva', qty: 2 },
      { name: 'Mléko', qty: 3 },
      { name: 'Karamelový sirup', qty: 1 },
    ],
    price: 74,
    status: 'enabledProduct',
  },
  {
    id: 9,
    name: 'Vanilla Latte',
    ingredients: [
      { name: 'Káva', qty: 2 },
      { name: 'Mléko', qty: 3 },
      { name: 'Vanilkový sirup', qty: 1 },
    ],
    price: 74,
    status: 'enabledProduct',
  },
  {
    id: 10,
    name: 'Cold Brew',
    ingredients: [
      { name: 'Káva', qty: 3 },
      { name: 'Led', qty: 2 },
      { name: 'Cukr', qty: 1 },
    ],
    price: 65,
    status: 'enabledProduct',
  },
]

export const initialOrders = [
  { id: 1, products: [{ name: 'Espresso', quantity: 1, unitPrice: 45 }], quantity: 1, totalPrice: 45, isEnabled: true, timestamp: '2025-01-10T08:00:00.000Z' },
  { id: 2, products: [{ name: 'Cappuccino', quantity: 2, unitPrice: 59 }], quantity: 2, totalPrice: 118, isEnabled: true, timestamp: '2025-02-12T09:15:00.000Z' },
  { id: 3, products: [{ name: 'Latte', quantity: 1, unitPrice: 62 }], quantity: 1, totalPrice: 62, isEnabled: true, timestamp: '2025-03-14T10:30:00.000Z' },
  { id: 4, products: [{ name: 'Flat White', quantity: 1, unitPrice: 68 }], quantity: 1, totalPrice: 68, isEnabled: true, timestamp: '2025-04-16T11:45:00.000Z' },
  { id: 5, products: [{ name: 'Iced Latte', quantity: 2, unitPrice: 70 }], quantity: 2, totalPrice: 140, isEnabled: true, timestamp: '2025-05-18T12:00:00.000Z' },
  { id: 6, products: [{ name: 'Mocha', quantity: 1, unitPrice: 72 }], quantity: 1, totalPrice: 72, isEnabled: true, timestamp: '2025-06-20T13:10:00.000Z' },
  { id: 7, products: [{ name: 'Caramel Latte', quantity: 1, unitPrice: 74 }], quantity: 1, totalPrice: 74, isEnabled: true, timestamp: '2025-07-22T14:20:00.000Z' },
  { id: 8, products: [{ name: 'Vanilla Latte', quantity: 2, unitPrice: 74 }], quantity: 2, totalPrice: 148, isEnabled: true, timestamp: '2025-08-24T15:30:00.000Z' },
  { id: 9, products: [{ name: 'Cold Brew', quantity: 1, unitPrice: 65 }], quantity: 1, totalPrice: 65, isEnabled: true, timestamp: '2025-09-26T16:40:00.000Z' },
  { id: 10, products: [{ name: 'Espresso', quantity: 1, unitPrice: 45 }, { name: 'Cappuccino', quantity: 1, unitPrice: 59 }], quantity: 2, totalPrice: 163, isEnabled: true, timestamp: '2025-10-28T17:50:00.000Z' },
  { id: 11, products: [{ name: 'Latte', quantity: 1, unitPrice: 62 }, { name: 'Mocha', quantity: 1, unitPrice: 72 }], quantity: 2, totalPrice: 134, isEnabled: true, timestamp: '2025-11-15T18:00:00.000Z' },
  { id: 12, products: [{ name: 'Caramel Latte', quantity: 1, unitPrice: 74 }], quantity: 1, totalPrice: 74, isEnabled: true, timestamp: '2025-12-18T19:10:00.000Z' },
  { id: 13, products: [{ name: 'Espresso Macchiato', quantity: 1, unitPrice: 52 }], quantity: 1, totalPrice: 52, isEnabled: true, timestamp: '2026-01-11T08:20:00.000Z' },
  { id: 14, products: [{ name: 'Cappuccino', quantity: 1, unitPrice: 59 }], quantity: 1, totalPrice: 59, isEnabled: true, timestamp: '2026-02-13T09:30:00.000Z' },
  { id: 15, products: [{ name: 'Flat White', quantity: 2, unitPrice: 68 }], quantity: 2, totalPrice: 136, isEnabled: true, timestamp: '2026-03-17T10:40:00.000Z' },
  { id: 16, products: [{ name: 'Iced Latte', quantity: 1, unitPrice: 70 }], quantity: 1, totalPrice: 70, isEnabled: true, timestamp: '2026-04-19T11:50:00.000Z' },
  // { id: 17, products: [{ name: 'Mocha', quantity: 1, unitPrice: 72 }], quantity: 1, totalPrice: 72, isEnabled: true, timestamp: '2026-05-21T12:00:00.000Z' },
  // { id: 18, products: [{ name: 'Cold Brew', quantity: 1, unitPrice: 65 }], quantity: 1, totalPrice: 65, isEnabled: true, timestamp: '2026-06-23T13:10:00.000Z' },
  // { id: 19, products: [{ name: 'Latte', quantity: 1, unitPrice: 62 }, { name: 'Vanilla Latte', quantity: 1, unitPrice: 74 }], quantity: 2, totalPrice: 136, isEnabled: true, timestamp: '2026-07-25T14:20:00.000Z' },
  // { id: 20, products: [{ name: 'Caramel Latte', quantity: 1, unitPrice: 74 }], quantity: 1, totalPrice: 74, isEnabled: true, timestamp: '2026-08-27T15:30:00.000Z' },
  // { id: 21, products: [{ name: 'Espresso', quantity: 1, unitPrice: 45 }, { name: 'Espresso Macchiato', quantity: 1, unitPrice: 52 }], quantity: 2, totalPrice: 97, isEnabled: true, timestamp: '2026-09-29T16:40:00.000Z' },
  // { id: 22, products: [{ name: 'Cappuccino', quantity: 1, unitPrice: 59 }, { name: 'Mocha', quantity: 1, unitPrice: 72 }], quantity: 2, totalPrice: 131, isEnabled: true, timestamp: '2026-10-15T17:50:00.000Z' },
  // { id: 23, products: [{ name: 'Flat White', quantity: 1, unitPrice: 68 }], quantity: 1, totalPrice: 68, isEnabled: true, timestamp: '2026-11-18T18:00:00.000Z' },
  // { id: 24, products: [{ name: 'Cold Brew', quantity: 1, unitPrice: 65 }], quantity: 1, totalPrice: 65, isEnabled: true, timestamp: '2026-12-20T19:10:00.000Z' },
]

export const appInfo = {
  storeName: 'Kavárna U Šálku',
  address: 'U Borského Parku 123, Plzeň',
}
