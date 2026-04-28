import './MenuPage.css'
import { useState } from 'react'
import { Card, CardContent } from '@mui/material'
import ProductDialog from '../atoms/ProductDialog'
import { readJson, writeJson, STORAGE_KEYS } from '../../utils/storage.js'
import { initialIngredients, initialProducts } from '../../utils/mockData.js'

// TODO: make working disable/enable button
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

  return (
    <div id="content" className="menu-page">
      <div className="menu-page__grid" role="list">
        {products.map((product) => (
          <Card
            className="product-card"
            key={product.id}
            role="listitem"
            elevation={0}
            sx={{ borderRadius: '20px' }}
          >
            <CardContent className="product-card__body" sx={{ padding: 0 }}>
              <h3 className="product-card__name">{product.name}</h3>
              <p>
                <strong>Obsahuje:</strong> {product.ingredients.join(', ')}
              </p>
              <p>{product.price} Kč</p>
              <button type="button" className="product-card__disable-button">
                Disable
              </button>
            </CardContent>
          </Card>
        ))}

        <Card
          className="product-card product-card--add"
          component="button"
          type="button"
          aria-label="Přidat nový produkt"
          elevation={0}
          onClick={openDialog}
        >
          <span className="product-card__add-icon">+</span>
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