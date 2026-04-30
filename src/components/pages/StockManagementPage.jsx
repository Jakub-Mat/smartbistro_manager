import { useEffect, useState } from 'react'
import './StockManagementPage.css'
import StockTable from '../atoms/StockTable.jsx'
import { readJson, writeJson, STORAGE_KEYS } from '../../utils/storage.js'
import { initialIngredients } from '../../utils/mockData.js'
import { getPriority } from '../../utils/storage.js'
import ContentTitle from "../atoms/ContentTitle.jsx";

const DEFAULT_FILTERS = {
    query: '',
    stockState: 'all',
    sortBy: 'priority',
}

// TODO: Remove plus icons and functionality for adding stock and removing from stock
export default function StockManagementPage() {
    const [ingredients] = useState(() =>
        readJson(STORAGE_KEYS.ingredients, initialIngredients)
    )
    const [filters, setFilters] = useState(() =>
        readJson(STORAGE_KEYS.filters || 'smartbistro_stock_filters', DEFAULT_FILTERS)
    )

    useEffect(() => {
        writeJson('smartbistro_stock_filters', filters)
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


    let filteredIngredients = [...ingredients]

    if (filters.query.trim()) {
        const searchText = filters.query.trim().toLowerCase()
        filteredIngredients = filteredIngredients.filter((ingredient) => ingredient.name.toLowerCase().includes(searchText))
    }

    if (filters.stockState === 'belowMin') {
        filteredIngredients = filteredIngredients.filter((ingredient) => ingredient.qty < ingredient.min_qty)
    }

    if (filters.stockState === 'atMin') {
        filteredIngredients = filteredIngredients.filter((ingredient) => ingredient.qty === ingredient.min_qty)
    }

    if (filters.stockState === 'aboveMin') {
        filteredIngredients = filteredIngredients.filter((ingredient) => ingredient.qty > ingredient.min_qty)
    }

    if (filters.sortBy === 'nameAsc') {
        filteredIngredients.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (filters.sortBy === 'stockAsc') {
        filteredIngredients.sort((a, b) => a.qty - b.qty)
    }

    if (filters.sortBy === 'stockDesc') {
        filteredIngredients.sort((a, b) => b.qty - a.qty)
    }

    if (filters.sortBy === 'priceAsc') {
        filteredIngredients.sort((a, b) => a.price - b.price)
    }

    if (filters.sortBy === 'priceDesc') {
        filteredIngredients.sort((a, b) => b.price - a.price)
    }

    if (filters.sortBy === 'priority') {
        filteredIngredients.sort((a, b) => getPriority(a) - getPriority(b))
    }

    return (
        <div id="content" className="stockManagementContent">
            <section className="stockPanel">
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
                    <StockTable ingredients={filteredIngredients} onPlusButtonClick={undefined} />
                </div>
            </section>
        </div>
    )
}