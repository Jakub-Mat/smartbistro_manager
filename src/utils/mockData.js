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