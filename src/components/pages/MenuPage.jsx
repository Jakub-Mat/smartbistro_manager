import './MenuPage.css'
import { useState } from 'react'
import { Card } from '@mui/material'
import ProductDialog from '../atoms/ProductDialog'
import { normalizeProduct, readJson, writeJson, STORAGE_KEYS } from '../../utils/storage.js'
import { initialIngredients, initialProducts } from '../../utils/dataConfig.js'
import ProductCard from "../atoms/ProductCard.jsx";

export default function MenuPage() {
  const [ingredients] = useState(() =>
    readJson(STORAGE_KEYS.ingredients, initialIngredients)
  )
  const [products, setProducts] = useState(() =>
    readJson(STORAGE_KEYS.products, initialProducts)
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Otevře dialog pro vytvoření nového produktu
  const openCreateDialog = () => {
    setSelectedProduct(null)
    setIsDialogOpen(true)
  }

  // Otevře dialog pro úpravu vybraného produktu
  const openEditDialog = (product) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  // Zavře dialog; vyčištění formuláře řeší samotná komponenta dialogu.
  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedProduct(null)
  }

  // Uloží vytvořený nebo upravený produkt do seznamu a do storage.
  const handleSaveProduct = (product) => {
    const normalizedProduct = normalizeProduct({
      ...product,
      price: Math.round(product.price),
    })

    const exists = products.some((item) => item.id === normalizedProduct.id)
    const newProducts = exists
      ? products.map((item) => (item.id === normalizedProduct.id ? normalizedProduct : item))
      : [...products, normalizedProduct]

    setProducts(newProducts)
    writeJson(STORAGE_KEYS.products, newProducts)
  }

  return (
    <div id="content" className="menuPage">
      <div className="menuPageLayout" role="list">
        {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              onClick={openEditDialog}
              actionLabel="Upravit"
              className="menuPageProduct"
            />
        ))}

        <Card
          className="productCardAdd"
          component="button"
          type="button"
          aria-label="Přidat nový produkt"
          elevation={0}
          onClick={openCreateDialog}
        >
          <span className="productCardAddIcon">+</span>
        </Card>
      </div>

      <ProductDialog
        key={`${isDialogOpen ? 'open' : 'closed'}-${selectedProduct?.id ?? 'new'}`}
        open={isDialogOpen}
        onClose={closeDialog}
        ingredients={ingredients}
        product={selectedProduct}
        onSaveProduct={handleSaveProduct}
      />
    </div>
  )
}