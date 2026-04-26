import './MenuPage.css'
import { useState } from 'react'
import { Card, CardContent } from '@mui/material'
import ProductDialog from '../atoms/ProductDialog'
import suroviny from '../../assets/suroviny.json'

const menuProducts = [
  {
    id: 1,
    name: 'Chessburger',
    ingredients: ['Houska', 'Kečup', 'Kyselá okurka', 'Hovězí maso (porce)','Hořčice'],
    price: 150,
  },
  {
    id: 2,
    name: 'Hamburger',
    ingredients: ['Houska', 'Kečup', 'Kyselá okurka', 'Hovězí maso (porce)'],
    price: 120,
  }
]

export default function MenuPage() {
  const [products, setProducts] = useState(menuProducts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Otevře dialog pro vytvoření nového produktu.
  const openDialog = () => {
    setIsDialogOpen(true)
  }

  // Zavře dialog; vyčištění formuláře řeší samotná komponenta dialogu.
  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  // Přidá nově vytvořený produkt do seznamu.
  const handleCreateProduct = (product) => {
    setProducts((previous) => [...previous, product])
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
        ingredients={suroviny}
        onCreateProduct={handleCreateProduct}
      />
    </div>
  )
}