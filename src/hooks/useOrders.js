import { useState, useEffect } from 'react'
import { readJson, STORAGE_KEYS, ORDER_CREATED_EVENT } from '../utils/storage.js'
import { initialOrders } from '../utils/dataConfig.js'

/**
 * Hook pro správu objednávek
 * 
 * Načítá objednávky z lokálního úložiště při inicializaci a 
 * poslouchá na custom event ORDER_CREATED_EVENT. Když se nová 
 * objednávka vytvoří, automaticky aktualizuje seznam objednávek.
 * 
 * @returns {Array} Pole všech objednávek
 */

function useOrders() {
  const [orders, setOrders] = useState(() => 
    readJson(STORAGE_KEYS.orders, initialOrders)
  )

  useEffect(() => {
    // Naslouch na custom event - když se nová objednávka vytvoří
    const handleOrderCreated = () => {
      const updatedOrders = readJson(STORAGE_KEYS.orders, initialOrders)
      setOrders(updatedOrders)
    }

    window.addEventListener(ORDER_CREATED_EVENT, handleOrderCreated)
    
    // Cleanup
    return () => window.removeEventListener(ORDER_CREATED_EVENT, handleOrderCreated)
  }, [])

  return orders
}

export default useOrders