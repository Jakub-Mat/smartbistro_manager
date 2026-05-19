import { useEffect, useState } from 'react'
import './StockManagementPage.css'
import StockTable from '../atoms/StockTable.jsx'
import DialogSlider from '../atoms/DialogSlider.jsx'
import { readJson, writeJson, STORAGE_KEYS } from '../../utils/storage.js'
import { initialIngredients } from '../../utils/dataConfig.js'
import { getPriority } from '../../utils/storage.js'
import ContentTitle from "../atoms/ContentTitle.jsx";

const LEGACY_FILTERS_KEY = 'smartbistro_stock_filters'

const DEFAULT_FILTERS = {
    query: '',
    stockState: 'all',
    sortBy: 'priority',
}

export default function StockManagementPage() {
    const [ingredients, setIngredients] = useState(() =>
        readJson(STORAGE_KEYS.ingredients, initialIngredients)
    )
    const [filters, setFilters] = useState(() =>
        readJson(STORAGE_KEYS.filters, readJson(LEGACY_FILTERS_KEY, DEFAULT_FILTERS))
    )
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [actionType, setActionType] = useState('plus')

    useEffect(() => {
        writeJson(STORAGE_KEYS.ingredients, ingredients)
    }, [ingredients])

    useEffect(() => {
        writeJson(STORAGE_KEYS.filters, filters)
    }, [filters])

    // Aktualizuje jeden klíč ve stavu `filters` (např. query, stockState, sortBy)
    const handleFilterChange = (key, value) => {
        setFilters((previous) => ({
            ...previous,
            [key]: value,
        }))
    }

    // Resetuje filtry na výchozí hodnoty
    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS)
    }

    // Otevře dialog pro úpravu množství dané ingredience
    const openIngredientDialog = (ingredient, nextActionType) => {
        setSelectedIngredient(ingredient)
        setActionType(nextActionType)
        setQuantity(1)
        setIsDialogOpen(true)
    }

    // Otevře dialog pro přidání - pomocná funkce volající `openIngredientDialog`
    const handlePlusButtonClick = (ingredient) => {
        openIngredientDialog(ingredient, 'plus')
    }

    // Otevře dialog pro odebrání - pomocná funkce volající `openIngredientDialog`
    const handleMinusButtonClick = (ingredient) => {
        openIngredientDialog(ingredient, 'minus')
    }

    // Přímo nastaví konkrétní množství v inline inputu tabulky (bez dialogu)
    const handleSetInputQty = (ingredient, newQty) => {
        setIngredients((previousIngredients) =>
            previousIngredients.map((ing) =>
                ing.name === ingredient.name ? { ...ing, qty: Math.max(0, Number(newQty) || 0) } : ing
            )
        )
    }

    // Zavře dialog a resetuje dialog-related stav
    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setSelectedIngredient(null)
        setQuantity(0)
        setActionType('plus')
    }

    // Potvrdí akci z dialogu - přidá nebo odebere množství podle actionType
    const handleConfirmAction = () => {
        if (!selectedIngredient) return

        setIngredients((previousIngredients) =>
            previousIngredients.map((ingredient) =>
                ingredient.name === selectedIngredient.name
                    ? {
                        ...ingredient,
                        qty: actionType === 'minus' ? Math.max(0, ingredient.qty - quantity) 
                        : ingredient.qty + quantity,
                    }: ingredient
            )
        )

        handleCloseDialog()
    }

    // Aplikuje vyhledávání, filtrování a řazení na ingredience
    const getProcessedIngredients = (items) => {
        let result = [...items]

        // Filtr: vyhledávání podle textu
        if (filters.query.trim()) {
            const searchText = filters.query.trim().toLowerCase()
            result = result.filter((ingredient) => ingredient.name.toLowerCase().includes(searchText))
        }

        // Filtr: stav zásoby (pod/na/nad minimem)
        if (filters.stockState === 'belowMin') {
            result = result.filter((ingredient) => ingredient.qty < ingredient.min_qty)
        } else if (filters.stockState === 'atMin') {
            result = result.filter((ingredient) => ingredient.qty === ingredient.min_qty)
        } else if (filters.stockState === 'aboveMin') {
            result = result.filter((ingredient) => ingredient.qty > ingredient.min_qty)
        }

        // Řazení: podle vybraného kritéria
        if (filters.sortBy === 'nameAsc') {
            result.sort((a, b) => a.name.localeCompare(b.name))
        } else if (filters.sortBy === 'stockAsc') {
            result.sort((a, b) => a.qty - b.qty)
        } else if (filters.sortBy === 'stockDesc') {
            result.sort((a, b) => b.qty - a.qty)
        } else if (filters.sortBy === 'priceAsc') {
            result.sort((a, b) => a.price - b.price)
        } else if (filters.sortBy === 'priceDesc') {
            result.sort((a, b) => b.price - a.price)
        } else if (filters.sortBy === 'priority') {
            result.sort((a, b) => getPriority(a) - getPriority(b))
        }

        return result
    }

    const filteredIngredients = getProcessedIngredients(ingredients)

    return (
        <div id="content" className="stockManagementContent">
            <section className="stockPanel">
                <DialogSlider
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmAction}
                    title={actionType === 'minus' ? 'Odebrat surovinu' : 'Přidat surovinu'}
                    label={`${selectedIngredient?.name ?? ''} | Aktuálně: ${selectedIngredient?.qty ?? 0} ks | Minimum: ${selectedIngredient?.min_qty ?? 0} ks`}
                    value={quantity}
                    onChange={(_, newValue) => setQuantity(typeof newValue === 'number' ? newValue : 0)}
                    min={1}
                    max={actionType === 'minus' ? (selectedIngredient?.qty ?? 1) : 100}
                    confirmText={actionType === 'minus' ? 'Odebrat' : 'Přidat'}
                    cancelText="Zrušit"
                />
                <ContentTitle text="Správa skladu" />
                <span className="stockSubtitle">Celkem položek: {filteredIngredients.length}</span>

                <div className="stockFilterBar">
                    <div className="stockFilterField">
                        <label htmlFor="stock-search">Vyhledávání</label>
                        <input
                            id="stock-search"
                            type="text"
                            value={filters.query}
                            placeholder="Název suroviny"
                            onChange={(event) => handleFilterChange('query', event.target.value)}
                        />
                    </div>

                    <div className="stockFilterField">
                        <label htmlFor="stock-state">Stav zásoby</label>
                        <select
                            id="stock-state"
                            value={filters.stockState}
                            onChange={(event) => handleFilterChange('stockState', event.target.value)}
                        >
                            <option value="all">Vše</option>
                            <option value="belowMin">Pod minimem</option>
                            <option value="atMin">Na minimu</option>
                            <option value="aboveMin">Nad minimem</option>
                        </select>
                    </div>

                    <div className="stockFilterField">
                        <label htmlFor="stock-sort">Řazení</label>
                        <select
                            id="stock-sort"
                            value={filters.sortBy}
                            onChange={(event) => handleFilterChange('sortBy', event.target.value)}
                        >
                            <option value="priority">Priorita doplnění</option>
                            <option value="nameAsc">Název A-Z</option>
                            <option value="stockAsc">Počet ks vzestupně</option>
                            <option value="stockDesc">Počet ks sestupně</option>
                            <option value="priceAsc">Cena vzestupně</option>
                            <option value="priceDesc">Cena sestupně</option>
                        </select>
                    </div>

                    <button className="stockFilterReset" type="button" onClick={handleResetFilters}>
                        Reset filtrů
                    </button>
                </div>

                <div className="stockTableWrapper">
                    <StockTable
                        ingredients={filteredIngredients}
                        onPlusButtonClick={handlePlusButtonClick}
                        onMinusButtonClick={handleMinusButtonClick}
                        onSetQuantity={handleSetInputQty}
                        actionTitle="Úprava skladu"
                    />
                </div>
            </section>
        </div>
    )
}