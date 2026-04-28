export const initialIngredients = [
  {
    name: 'Houska',
    qty: 30,
    min_qty: 40,
    price: 9,
  },
  {
    name: 'Hovězí maso (porce)',
    qty: 85,
    min_qty: 30,
    price: 35,
  },
  {
    name: 'Kečup',
    qty: 15,
    min_qty: 5,
    price: 45,
  },
  {
    name: 'Hořčice',
    qty: 12,
    min_qty: 4,
    price: 38,
  },
  {
    name: 'Sýr Cheddar (plátek)',
    qty: 45,
    min_qty: 50,
    price: 5,
  },
  {
    name: 'Slanina (plátek)',
    qty: 20,
    min_qty: 40,
    price: 6,
  },
  {
    name: 'Ledový salát',
    qty: 8,
    min_qty: 3,
    price: 25,
  },
  {
    name: 'Rajče',
    qty: 15,
    min_qty: 15,
    price: 7,
  },
  {
    name: 'Červená cibule',
    qty: 30,
    min_qty: 10,
    price: 6,
  },
  {
    name: 'Kyselá okurka',
    qty: 80,
    min_qty: 20,
    price: 3,
  },
]

export const initialProducts = [
  {
    id: 1,
    name: 'Chessburger',
    ingredients: ['Houska', 'Kečup', 'Kyselá okurka', 'Hovězí maso (porce)', 'Hořčice'],
    price: 150,
  },
  {
    id: 2,
    name: 'Hamburger',
    ingredients: ['Houska', 'Kečup', 'Kyselá okurka', 'Hovězí maso (porce)'],
    price: 120,
  },
]

export const initialOrders = [
  {
    id: 1,
    products: ['Chessburger', 'Hamburger'],
    quantity: 2,
    totalPrice: 270,
    isEnabled: true,
    timestamp: '2026-04-28T10:00:00.000Z',
  },
  {
    id: 2,
    products: ['Hamburger'],
    quantity: 1,
    totalPrice: 120,
    isEnabled: true,
    timestamp: '2026-04-28T11:00:00.000Z',
  },
]