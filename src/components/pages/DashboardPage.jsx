import './DashboardPage.css'
import LineChart from '../atoms/LineChart.jsx'
import StockTable from '../atoms/StockTable.jsx'
import OrderTable from '../atoms/OrderTable.jsx'
import DialogSlider from '../atoms/DialogSlider.jsx'
import { useState } from 'react'
import ingredientData from '../../assets/suroviny.json'
import ContentTitle from "../atoms/ContentTitle.jsx";
const STORAGE_KEY = 'smartbistro_ingredients'

export default function DashboardPage() {

    //render ingredient data z localStorage nebo json file jestli je localStorage prázdný
    function loadIngredients() {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : ingredientData
    }

    //pro přidání ingredience
    const [ingredients, setIngredients] = useState(loadIngredients)

    //--------------pro dialog slider-----------------
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState(null)
    const [orderQty, setOrderQty] = useState(0)

    //otevře dialog objednávky a nastaví výchozí množství na dorovnání minima
    const handlePlusButtonClick = (ingredient) => {
        const defaultQty = Math.max(ingredient.min_pocet - ingredient.pocet_ks, 0)
        setSelectedIngredient(ingredient)
        setOrderQty(defaultQty)
        setIsOrderDialogOpen(true)
    }

    const maxQty = selectedIngredient
        ? Math.max(selectedIngredient.min_pocet * 2 - selectedIngredient.pocet_ks, 0)
        : 0

    const handleCloseDialog = () => {
        setIsOrderDialogOpen(false)
        setSelectedIngredient(null)
        setOrderQty(0)
    }

    const handleConfirmOrder = () => {
        if (!selectedIngredient) return

        const updatedIngredients = ingredients.map((ingredient) => {
            if (ingredient.name === selectedIngredient.name) {
                return { ...ingredient, pocet_ks: ingredient.pocet_ks + orderQty }
            }
            return ingredient
        })

        setIngredients(updatedIngredients)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIngredients))
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
                    label={`${selectedIngredient?.name ?? ''} | Aktuálně: ${selectedIngredient?.pocet_ks ?? 0} ks | Minimum: ${selectedIngredient?.min_pocet ?? 0} ks`}
                    value={orderQty}
                    onChange={(_, newValue) => setOrderQty(typeof newValue === 'number' ? newValue : 0)}
                    min={0}
                    max={maxQty}
                    confirmText="Potvrdit objednávku"
                    cancelText="Zrušit"
                />
                {/* Graf přehledů zisku */}
                <div id="linechart">
                    <ContentTitle text={"Přehled přijmů za rok 2024 a 2025"}/>
                    <LineChart/>
                </div>
                {/*Tabulka položek ve skladu s tlačítkem rychlého objednání*/}
                <div id="stockTable">
                    <ContentTitle text="Sklad surovin"/>

                    <div id="stockTableWrapper">
                        <StockTable
                            ingredients={ingredients}
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