import './ProductDialog.css'
import { useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

export default function ProductDialog({
  open,
  onClose,
  ingredients = [],
  onCreateProduct,
}) {

  //příprava konstant
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState([])

  //const [draggedIngredient, setDraggedIngredient] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)



  //načte jména ingrediencí, které ještě nebyly přidány do produktu, aby se nenabízely k výběru.
  const availableIngredients = useMemo(() => {
    return ingredients.filter(
      (ingredient) =>
        !selectedIngredients.some(
          (selected) => selected.name === ingredient.name,
        ),
    )
  }, [ingredients, selectedIngredients])

  // Vrátí formulář do výchozího stavu.
  const resetForm = () => {
    setName('')
    setPrice('')
    setSelectedIngredients([])
    setDraggedItem(null)
  }

  // Zavře dialog a zároveň smaže rozpracovaný obsah.
  const handleClose = () => {
    resetForm()
    onClose()
  }

  // Uloží aktuálně přetaženou surovinu do lokálního stavu.
  const handleDragStart = (ingredient,source) => {
    setDraggedItem({ingredient, source})
  }

  // Povolení dropu je nutné, jinak prohlížeč přetažení odmítne.
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  // Přidá surovinu do vybraných, pokud už tam není.
  const handleDropToSelected = (event) => {
      console.log('Drop to selected:', draggedItem)
        event.preventDefault()
        if (!draggedItem || draggedItem.source !== 'available') return

        setSelectedIngredients((previous) => {
            const exists = previous.some(
                (item) => item.name === draggedItem.ingredient.name
            )
            if (exists) return previous
            return [...previous, draggedItem.ingredient]
        })

        setDraggedItem(null)
  }

  const handleDropToAvailable = (event) => {
        event.preventDefault()
        if (!draggedItem || draggedItem.source !== 'selected') return

        setSelectedIngredients((previous) =>
            previous.filter((item) => item.name !== draggedItem.ingredient.name)
        )

        setDraggedItem(null)
  }


  // Odeslání vytvořeného produktu rodičovské komponentě.
  const handleSubmit = (event) => {
    event.preventDefault()

    const numericPrice = Number(price)
    const isValid =
      name.trim() !== '' &&
      Number.isFinite(numericPrice) &&
      numericPrice >= 0 &&
      selectedIngredients.length > 0

    if (!isValid) return

    onCreateProduct({
      id: Date.now(),
      name: name.trim(),
      price: numericPrice,
      ingredients: selectedIngredients.map((ingredient) => ingredient.name),
    })

    handleClose()
  }

  const isFormValid =
    name.trim() !== '' &&
    Number.isFinite(Number(price)) &&
    Number(price) >= 0 &&
    selectedIngredients.length > 0

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Přidat nový produkt</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className="product-dialog__content">
          <TextField
            label="Název produktu"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Cena (Kč)"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            fullWidth
            slotProps={{ htmlInput: { min: 0 } }}
          />
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
                                  {ingredient.pocet_ks} ks · {ingredient.cena} Kč
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
                      {selectedIngredients.length === 0 ? (
                      <span className="product-dialog__empty">
                          Zatím nejsou vybrané žádné suroviny.
                      </span>
                      ) : (
                          selectedIngredients.map((ingredient) => (
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
                                      {ingredient.pocet_ks} ks · {ingredient.cena} Kč
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
            Zrušit
          </Button>
          <Button type="submit" variant="contained" disabled={!isFormValid}>
            Přidat
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
