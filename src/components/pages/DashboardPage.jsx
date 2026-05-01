import './DashboardPage.css'
import LineChart from '../atoms/LineChart.jsx'
import StockTable from '../atoms/StockTable.jsx'
import OrderTable from '../atoms/OrderTable.jsx'
import DialogSlider from '../atoms/DialogSlider.jsx'
import { useState } from 'react'
import ContentTitle from "../atoms/ContentTitle.jsx"
import { readJson, writeJson, STORAGE_KEYS, getPriority } from '../../utils/storage.js'
import { initialIngredients } from '../../utils/mockData.js'

export default function DashboardPage() {

    // Zkopírování z StockManagement


    // Načti ingredience z localStorage
    const [ingredients, setIngredients] = useState(() =>
        readJson(STORAGE_KEYS.ingredients, initialIngredients)
    )

    const sortedIngredients = [...ingredients].sort((a, b) => {
        const p = getPriority(a) - getPriority(b)
        if(p !== 0) return p
        return (a.qty - a.min_qty) <= (b.qty - b.min_qty) ? -1 : 1
    })


    //--------------pro dialog slider-----------------
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState(null)
    const [orderQty, setOrderQty] = useState(0)

    // Otevře dialog objednávky a nastaví výchozí množství na dorovnání minima
    const handlePlusButtonClick = (ingredient) => {
        const defaultQty = Math.max(ingredient.min_qty - ingredient.qty, 0)
        setSelectedIngredient(ingredient)
        setOrderQty(defaultQty)
        setIsOrderDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsOrderDialogOpen(false)
        setSelectedIngredient(null)
        setOrderQty(0)
    }

    const handleConfirmOrder = () => {
        if (!selectedIngredient) return

        const updatedIngredients = ingredients.map((ingredient) => {
            if (ingredient.name === selectedIngredient.name) {
                return { ...ingredient, qty: ingredient.qty + orderQty }
            }
            return ingredient
        })

        setIngredients(updatedIngredients)
        writeJson(STORAGE_KEYS.ingredients, updatedIngredients)
        handleCloseDialog()
    }

    //---------zobrazení obsahu dashboardu: graf, tabulka skladu a tabulka objednávek----------------
    return (
        <>
            <div id="dashboardContent">
                <DialogSlider
                    open={isOrderDialogOpen}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmOrder}
                    title="Objednat surovinu"
                    label={`${selectedIngredient?.name ?? ''} | Aktuálně: ${selectedIngredient?.qty ?? 0} ks | Minimum: ${selectedIngredient?.min_qty ?? 0} ks`}
                    value={orderQty}
                    onChange={(_, newValue) => setOrderQty(typeof newValue === 'number' ? newValue : 0)}
                    min={0}
                    max={100}
                    confirmText="Potvrdit objednávku"
                    cancelText="Zrušit"
                />
                {/* Graf přehledů zisku */}
                <div id="linechart">
                    <ContentTitle text={"Přehled přijmů za rok 2024 a 2025"}/>
                    <div id="chartWrapper">
                        <LineChart/>
                    </div>

                </div>
                {/*Tabulka položek ve skladu s tlačítkem rychlého objednání*/}
                <div id="stockTable">
                    <ContentTitle text="Sklad surovin"/>

                    <div id="stockTableWrapper">
                        <StockTable
                            ingredients={sortedIngredients}
                            onPlusButtonClick={handlePlusButtonClick}
                        />
                    </div>
                </div>
                <div id="orderTable">
                    <ContentTitle text="Aktuální objednávky"/>
                    <div id="orderTableWrapper">
                        <OrderTable onPlusButtonClick={undefined}/>
                    </div>
                </div>
            </div>
        </>
    )
}