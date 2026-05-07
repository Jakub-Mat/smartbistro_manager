import './ProductDialog.css'
import { useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'

const DEFAULT_STATUS = 'enabledProduct'

const createEmptyForm = () => ({
  name: '',
  price: '',
  selectedIngredients: [],
  status: DEFAULT_STATUS,
})

const buildFormFromProduct = (product) => {
  if (!product) return createEmptyForm()

  return {
    name: product.name ?? '',
    price: product.price ?? '',
    selectedIngredients: (product.ingredients || []).map((ingredient) => ({
      name: ingredient.name,
      qty: ingredient.qty || 1,
    })),
    status: product.status || DEFAULT_STATUS,
  }
}

// Dialog pro vytvoření i úpravu produktu zobrazený v MenuPage.
export default function ProductDialog({
  open,
  onClose,
  ingredients = [],
  product,
  onSaveProduct,
}) {
  const [form, setForm] = useState(() => buildFormFromProduct(product))
  const [draggedItem, setDraggedItem] = useState(null)

  const availableIngredients = useMemo(() => ingredients, [ingredients])

  const resetForm = () => {
    setForm(createEmptyForm())
    setDraggedItem(null)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleDragStart = (ingredient, source) => {
    setDraggedItem({ ingredient, source })
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDropToSelected = (event) => {
    event.preventDefault()
    if (!draggedItem || draggedItem.source !== 'available') return

    setForm((previous) => {
      const existing = previous.selectedIngredients.find(
        (item) => item.name === draggedItem.ingredient.name,
      )

      if (existing) {
        return {
          ...previous,
          selectedIngredients: previous.selectedIngredients.map((item) =>
            item.name === draggedItem.ingredient.name
              ? { ...item, qty: item.qty + 1 }
              : item,
          ),
        }
      }

      return {
        ...previous,
        selectedIngredients: [
          ...previous.selectedIngredients,
          { name: draggedItem.ingredient.name, qty: 1 },
        ],
      }
    })

    setDraggedItem(null)
  }

  const handleDropToAvailable = (event) => {
    event.preventDefault()
    if (!draggedItem || draggedItem.source !== 'selected') return

    setForm((previous) => ({
      ...previous,
      selectedIngredients: previous.selectedIngredients.filter(
        (item) => item.name !== draggedItem.ingredient.name,
      ),
    }))

    setDraggedItem(null)
  }

  const handleIncreaseQty = (ingredientName) => {
    setForm((previous) => ({
      ...previous,
      selectedIngredients: previous.selectedIngredients.map((item) =>
        item.name === ingredientName ? { ...item, qty: item.qty + 1 } : item,
      ),
    }))
  }

  const handleDecreaseQty = (ingredientName) => {
    setForm((previous) => ({
      ...previous,
      selectedIngredients: previous.selectedIngredients.map((item) =>
        item.name === ingredientName && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item,
      ),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const numericPrice = Number(form.price)
    const isValid =
      form.name.trim() !== '' &&
      Number.isFinite(numericPrice) &&
      numericPrice >= 0 &&
      form.selectedIngredients.length > 0 &&
      ['enabledProduct', 'disabledProduct', 'hiddenProduct'].includes(form.status)

    if (!isValid) return

    onSaveProduct({
      id: product?.id ?? Date.now(),
      name: form.name.trim(),
      price: Math.round(numericPrice),
      status: form.status,
      ingredients: form.selectedIngredients.map((ingredient) => ({
        name: ingredient.name,
        qty: ingredient.qty || 1,
      })),
    })

    handleClose()
  }

  const isFormValid =
    form.name.trim() !== '' &&
    Number.isFinite(Number(form.price)) &&
    Number(form.price) >= 0 &&
    form.selectedIngredients.length > 0 &&
    ['enabledProduct', 'disabledProduct', 'hiddenProduct'].includes(form.status)

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{product ? 'Upravit produkt' : 'Přidat nový produkt'}</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className="product-dialog__content">
          <TextField
            label="Název produktu"
            value={form.name}
            onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
            required
            fullWidth
          />

          <TextField
            label="Cena (Kč)"
            type="number"
            value={form.price}
            onChange={(event) => setForm((previous) => ({ ...previous, price: event.target.value }))}
            required
            fullWidth
            slotProps={{ htmlInput: { min: 0, step: 1, inputMode: 'numeric' } }}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Stav produktu</FormLabel>
            <RadioGroup
              row
              value={form.status}
              onChange={(event) => setForm((previous) => ({ ...previous, status: event.target.value }))}
            >
              <FormControlLabel value="enabledProduct" control={<Radio />} label="Aktivovat" />
              <FormControlLabel value="disabledProduct" control={<Radio />} label="Deaktivovat" />
              <FormControlLabel value="hiddenProduct" control={<Radio />} label="Skrýt" />
            </RadioGroup>
          </FormControl>

          <div className="product-dialog__columns">
              <section
                    className="product-dialog__availablezone"
                    onDrop={handleDropToAvailable}
                    onDragOver={handleDragOver}
              >
                  <h4 className="product-dialog__section-title">Dostupné suroviny</h4>
                  <div className="product-dialog__ingredients">
                      {availableIngredients.map((ingredient) => (
                          <div
                              key={ingredient.name}
                              className="product-dialog__ingredient"
                              draggable
                              onDragStart={() => handleDragStart(ingredient, 'available')}
                          >
                              <div className="product-dialog__ingredient-name">
                                  {ingredient.name}
                              </div>
                              <div className="product-dialog__ingredient-meta">
                                    {ingredient.qty} ks · {ingredient.price} Kč
                              </div>
                          </div>
                      ))}
                  </div>
              </section>

              <section
                  className="product-dialog__selectedzone"
                  onDrop={handleDropToSelected}
                  onDragOver={handleDragOver}
              >
                  <h4 className="product-dialog__section-title">Vybrané suroviny</h4>
                  {/*<p className="product-dialog__hint">*/}
                  {/*    Přetáhni suroviny sem a kliknutím na štítek je zase odebereš.*/}
                  {/*</p>*/}

                  <div className="product-dialog__ingredients">
                      {form.selectedIngredients.length === 0 ? (
                      <span className="product-dialog__empty">
                          Zatím nejsou vybrané žádné suroviny.
                      </span>
                      ) : (
                          form.selectedIngredients.map((ingredient) => (
                              <div
                                  key={ingredient.name}
                                  className="product-dialog__ingredient"
                                  draggable
                                  onDragStart={() => handleDragStart(ingredient, 'selected')}
                              >
                                  <div className="product-dialog__ingredient-name">
                                      {ingredient.name}
                                  </div>
                                  <div className="product-dialog__ingredient-meta">
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <button
                                              type="button"
                                              onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleDecreaseQty(ingredient.name)
                                              }}
                                              style={{ padding: '2px 6px', fontSize: '12px' }}
                                          >
                                              −
                                          </button>
                                          <span style={{ minWidth: '30px', textAlign: 'center' }}>
                                              {ingredient.qty}x
                                          </span>
                                          <button
                                              type="button"
                                              onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleIncreaseQty(ingredient.name)
                                              }}
                                              style={{ padding: '2px 6px', fontSize: '12px' }}
                                          >
                                              +
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))
                      )}
                  </div>
              </section>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Zavřít
          </Button>
          <Button type="submit" variant="contained" disabled={!isFormValid}>
            Uložit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
