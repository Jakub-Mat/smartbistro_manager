import { useState, useEffect } from 'react'
import { readJson, STORAGE_KEYS, ORDER_CREATED_EVENT } from '../utils/storage.js'

function useOrders() {
  const [orders, setOrders] = useState(() => 
    readJson(STORAGE_KEYS.orders, [])
  )

  useEffect(() => {
    // Naslouch na custom event - když se nová objednávka vytvoří
    const handleOrderCreated = () => {
      const updatedOrders = readJson(STORAGE_KEYS.orders, [])
      setOrders(updatedOrders)
    }

    window.addEventListener(ORDER_CREATED_EVENT, handleOrderCreated)
    
    // Cleanup
    return () => window.removeEventListener(ORDER_CREATED_EVENT, handleOrderCreated)
  }, [])

  return orders
}

export default useOrders