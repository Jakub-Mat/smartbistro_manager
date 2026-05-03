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
    enable: true
  },
  {
    id: 2,
    name: 'Hamburger',
    ingredients: ['Houska', 'Kečup', 'Kyselá okurka', 'Hovězí maso (porce)'],
    price: 120,
    enable: true
  },
  {
    id: 3,
    name: 'Baconburger',
    ingredients: ['Houska', 'Hovězí maso (porce)', 'Slanina (plátek)', 'Kečup', 'Červená cibule'],
    price: 155,
    enable: true
  },
  {
    id: 4,
    name: 'Bacon & Cheese Burger',
    ingredients: ['Houska', 'Hovězí maso (porce)', 'Sýr Cheddar (plátek)', 'Slanina (plátek)', 'Hořčice', 'Kečup', 'Kyselá okurka'],
    price: 165,
    enable: true
  },
  {
    id: 5,
    name: 'Fresh Burger',
    ingredients: ['Houska', 'Hovězí maso (porce)', 'Ledový salát', 'Rajče', 'Červená cibule', 'Kečup'],
    price: 150,
    enable: true
  },
  {
    id: 6,
    name: 'Royal Deluxe',
    ingredients: ['Houska', 'Hovězí maso (porce)', 'Sýr Cheddar (plátek)', 'Slanina (plátek)', 'Ledový salát', 'Rajče', 'Červená cibule', 'Kyselá okurka', 'Kečup', 'Hořčice'],
    price: 210,
    enable: true
  },
  {
    id: 7,
    name: 'Onion Burger',
    ingredients: ['Houska', 'Hovězí maso (porce)', 'Červená cibule', 'Hořčice', 'Sýr Cheddar (plátek)'],
    price: 145,
    enable: true
  },
  {
    id: 8,
    name: 'Salad Cheese Burger',
    ingredients: ['Houska', 'Hovězí maso (porce)', 'Sýr Cheddar (plátek)', 'Ledový salát', 'Rajče'],
    price: 155,
    enable: true
  },
  {
    id: 9,
    name: 'Farmer Burger',
    ingredients: ['Houska', 'Hovězí maso (porce)', 'Slanina (plátek)', 'Červená cibule', 'Ledový salát', 'Hořčice'],
    price: 170,
    enable: true
  },
  {
    id: 10,
    name: 'Classic Standard',
    ingredients: ['Houska', 'Hovězí maso (porce)', 'Kečup', 'Hořčice', 'Kyselá okurka', 'Červená cibule'],
    price: 135,
    enable: true
  }
]

export const initialOrders = [
  // 2025 - January to December (monthly, increment ~5000)
  { id: 1, products: ['Chessburger'], quantity: 1, totalPrice: 5000, isEnabled: true, timestamp: '2025-01-15T10:00:00.000Z' },
  { id: 2, products: ['Hamburger'], quantity: 1, totalPrice: 8000, isEnabled: true, timestamp: '2025-02-15T10:00:00.000Z' },
  { id: 3, products: ['Baconburger'], quantity: 1, totalPrice: 15000, isEnabled: true, timestamp: '2025-03-15T10:00:00.000Z' },
  { id: 4, products: ['Bacon & Cheese Burger'], quantity: 1, totalPrice: 20000, isEnabled: true, timestamp: '2025-04-15T10:00:00.000Z' },
  { id: 5, products: ['Fresh Burger'], quantity: 1, totalPrice: 23000, isEnabled: true, timestamp: '2025-05-15T10:00:00.000Z' },
  { id: 6, products: ['Royal Deluxe'], quantity: 1, totalPrice: 30000, isEnabled: true, timestamp: '2025-06-15T10:00:00.000Z' },
  { id: 7, products: ['Onion Burger'], quantity: 1, totalPrice: 35000, isEnabled: true, timestamp: '2025-07-15T10:00:00.000Z' },
  { id: 8, products: ['Salad Cheese Burger'], quantity: 1, totalPrice: 43000, isEnabled: true, timestamp: '2025-08-15T10:00:00.000Z' },
  { id: 9, products: ['Farmer Burger'], quantity: 1, totalPrice: 45000, isEnabled: true, timestamp: '2025-09-15T10:00:00.000Z' },
  { id: 10, products: ['Classic Standard'], quantity: 1, totalPrice: 50000, isEnabled: true, timestamp: '2025-10-15T10:00:00.000Z' },
  { id: 11, products: ['Chessburger', 'Hamburger'], quantity: 2, totalPrice: 55000, isEnabled: true, timestamp: '2025-11-15T10:00:00.000Z' },
  { id: 12, products: ['Royal Deluxe'], quantity: 1, totalPrice: 60000, isEnabled: true, timestamp: '2025-12-15T10:00:00.000Z' },

  // 2026 - January to December (similar increments but offset so values differ from 2025)
  { id: 13, products: ['Hamburger'], quantity: 1, totalPrice: 7000, isEnabled: true, timestamp: '2026-01-15T10:00:00.000Z' },
  { id: 14, products: ['Baconburger'], quantity: 1, totalPrice: 12000, isEnabled: true, timestamp: '2026-02-15T10:00:00.000Z' },
  { id: 15, products: ['Bacon & Cheese Burger'], quantity: 1, totalPrice: 17000, isEnabled: true, timestamp: '2026-03-15T10:00:00.000Z' },
  { id: 16, products: ['Fresh Burger'], quantity: 2, totalPrice: 19000, isEnabled: true, timestamp: '2026-04-15T10:00:00.000Z' },
  { id: 17, products: ['Royal Deluxe'], quantity: 1, totalPrice: 20000, isEnabled: true, timestamp: '2026-05-15T10:00:00.000Z' },
  { id: 18, products: ['Onion Burger'], quantity: 1, totalPrice: 28000, isEnabled: true, timestamp: '2026-06-15T10:00:00.000Z' },
  { id: 19, products: ['Salad Cheese Burger'], quantity: 2, totalPrice: 35000, isEnabled: true, timestamp: '2026-07-15T10:00:00.000Z' },
  { id: 20, products: ['Farmer Burger'], quantity: 1, totalPrice: 40000, isEnabled: true, timestamp: '2026-08-15T10:00:00.000Z' },
  { id: 21, products: ['Classic Standard'], quantity: 1, totalPrice: 47000, isEnabled: true, timestamp: '2026-09-15T10:00:00.000Z' },
  { id: 22, products: ['Chessburger'], quantity: 1, totalPrice: 49000, isEnabled: true, timestamp: '2026-10-15T10:00:00.000Z' },
  { id: 23, products: ['Hamburger', 'Baconburger'], quantity: 2, totalPrice: 57000, isEnabled: true, timestamp: '2026-11-15T10:00:00.000Z' },
  { id: 24, products: ['Royal Deluxe'], quantity: 1, totalPrice: 63000, isEnabled: true, timestamp: '2026-12-15T10:00:00.000Z' },
]