import './MenuPage.css'
import { useState } from 'react'
import { Card } from '@mui/material'
import ProductDialog from '../atoms/ProductDialog'
import { readJson, writeJson, STORAGE_KEYS } from '../../utils/storage.js'
import { initialIngredients, initialProducts } from '../../utils/mockData.js'
import ProductCard from "../atoms/ProductCard.jsx";

// TODO: Zprovoznit enable disable button
// TODO: Předělat a sjednotit ProductCard a ProductDialog pro KioskPage a MenuPage, aby se předešlo duplikaci kódu a zjednodušilo se přidávání nových funkcí (např. editace produktu).

export default function MenuPage() {
  const [ingredients] = useState(() =>
    readJson(STORAGE_KEYS.ingredients, initialIngredients)
  )
  const [products, setProducts] = useState(() =>
    readJson(STORAGE_KEYS.products, initialProducts)
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Otevře dialog pro vytvoření nového produktu.
  const openDialog = () => {
    setIsDialogOpen(true)
  }

  // Zavře dialog; vyčištění formuláře řeší samotná komponenta dialogu.
  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  // Přidá nově vytvořený produkt do seznamu a uloží do storage
  const handleCreateProduct = (product) => {
    const normalizedProduct = {
      ...product,
      price: Math.round(product.price),
    }
    const newProducts = [...products, normalizedProduct]
    setProducts(newProducts)
    writeJson(STORAGE_KEYS.products, newProducts)
  }

  //Deaktivuje objekt v seznamu produktů a uloží změnu do storage
  const handleToggleProduct = (product) => {
    const updatedProducts = products.map(p =>
        p.id === product.id ? { ...p, enable: !p.enable } : p
    )
    setProducts(updatedProducts)
    writeJson(STORAGE_KEYS.products, updatedProducts)
}

  return (
    <div id="content" className="menu-page">
      <div className="menuPageLayout" role="list">
        {products.map((product) => (
            <ProductCard product={product} key={product.id} onClick={handleToggleProduct} className="menuPageProduct"/>
        ))}

        <Card
          className="productCardAdd"
          component="button"
          type="button"
          aria-label="Přidat nový produkt"
          elevation={0}
          onClick={openDialog}
        >
          <span className="productCardAddIcon">+</span>
        </Card>
      </div>

      <ProductDialog
        open={isDialogOpen}
        onClose={closeDialog}
        ingredients={ingredients}
        onCreateProduct={handleCreateProduct}
      />
    </div>
  )
}