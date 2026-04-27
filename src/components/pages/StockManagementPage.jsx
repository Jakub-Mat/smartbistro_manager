import { useEffect, useState } from 'react'
import './StockManagementPage.css'
import StockTable from '../atoms/StockTable.jsx'
import ingredientData from '../../assets/suroviny.json'

const STORAGE_KEY = 'smartbistro_ingredients'
const FILTERS_STORAGE_KEY = 'smartbistro_stock_filters'

const DEFAULT_FILTERS = {
    query: '',
    stockState: 'all',
    sortBy: 'priority',
}

export default function StockManagementPage() {

    function loadIngredients() {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : ingredientData
    }

    function loadFilters() {
        const saved = localStorage.getItem(FILTERS_STORAGE_KEY)
        return saved ? JSON.parse(saved) : DEFAULT_FILTERS
    }

    const [ingredients] = useState(loadIngredients)
    const [filters, setFilters] = useState(loadFilters)

    useEffect(() => {
        localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters))
    }, [filters])

    const handleFilterChange = (key, value) => {
        setFilters((previous) => ({
            ...previous,
            [key]: value,
        }))
    }

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS)
    }

    const getPriority = (item) => {
        if (item.pocet_ks < item.min_pocet) return 0
        if (item.pocet_ks === item.min_pocet) return 1
        return 2
    }

    let filteredIngredients = [...ingredients]

    if (filters.query.trim()) {
        const searchText = filters.query.trim().toLowerCase()
        filteredIngredients = filteredIngredients.filter((ingredient) => ingredient.name.toLowerCase().includes(searchText))
    }

    if (filters.stockState === 'belowMin') {
        filteredIngredients = filteredIngredients.filter((ingredient) => ingredient.pocet_ks < ingredient.min_pocet)
    }

    if (filters.stockState === 'atMin') {
        filteredIngredients = filteredIngredients.filter((ingredient) => ingredient.pocet_ks === ingredient.min_pocet)
    }

    if (filters.stockState === 'aboveMin') {
        filteredIngredients = filteredIngredients.filter((ingredient) => ingredient.pocet_ks > ingredient.min_pocet)
    }

    if (filters.sortBy === 'nameAsc') {
        filteredIngredients.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (filters.sortBy === 'stockAsc') {
        filteredIngredients.sort((a, b) => a.pocet_ks - b.pocet_ks)
    }

    if (filters.sortBy === 'stockDesc') {
        filteredIngredients.sort((a, b) => b.pocet_ks - a.pocet_ks)
    }

    if (filters.sortBy === 'priceAsc') {
        filteredIngredients.sort((a, b) => a.cena - b.cena)
    }

    if (filters.sortBy === 'priceDesc') {
        filteredIngredients.sort((a, b) => b.cena - a.cena)
    }

    if (filters.sortBy === 'priority') {
        filteredIngredients.sort((a, b) => getPriority(a) - getPriority(b))
    }

    return (
        <div id="content" className="stockManagementContent">
            <section className="stockPanel">
                <span className="stockTitle">Správa skladu</span>
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
                    <StockTable ingredients={filteredIngredients} onPlusButtonClick={undefined} />
                </div>
            </section>
        </div>
    )
}