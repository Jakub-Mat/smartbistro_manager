import './DashboardPage.css'
import LineChart from '../atoms/LineChart.jsx'
import StockTable from '../atoms/StockTable.jsx'
import OrderTable from '../atoms/OrderTable.jsx'
import DialogSlider from '../atoms/DialogSlider.jsx'
import { useState } from 'react'
import ContentTitle from "../atoms/ContentTitle.jsx"
import { readJson, writeJson, STORAGE_KEYS, getPriority } from '../../utils/storage.js'
import { initialIngredients } from '../../utils/dataConfig.js'


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
    const [actionType, setActionType] = useState('plus')

    // Otevře dialog pro upravení množství ingredience
    const openIngredientDialog = (ingredient, nextActionType) => {
        const defaultQty = nextActionType === 'minus'
            ? Math.min(ingredient.qty, Math.max(ingredient.qty - ingredient.min_qty, 1))
            : Math.max(ingredient.min_qty - ingredient.qty, 0)

        setSelectedIngredient(ingredient)
        setActionType(nextActionType)
        setOrderQty(defaultQty)
        setIsOrderDialogOpen(true)
    }

    // Handler pro tlačítko přidání - otevře dialog pro přidání ingredience
    const handlePlusButtonClick = (ingredient) => {
        openIngredientDialog(ingredient, 'plus')
    }

    // Handler pro tlačítko odebrání - otevře dialog pro odebrání ingredience
    const handleMinusButtonClick = (ingredient) => {
        openIngredientDialog(ingredient, 'minus')
    }

    // Zavře dialog a resetuje všechny související stavy
    const handleCloseDialog = () => {
        setIsOrderDialogOpen(false)
        setSelectedIngredient(null)
        setOrderQty(0)
        setActionType('plus')
    }

    // Potvrdí změnu množství ingredience a aktualizuje úložiště
    const handleConfirmOrder = () => {
        if (!selectedIngredient) return

        const updatedIngredients = ingredients.map((ingredient) => {
            if (ingredient.name === selectedIngredient.name) {
                return {
                    ...ingredient,
                    qty: actionType === 'minus'
                        ? Math.max(0, ingredient.qty - orderQty)
                        : ingredient.qty + orderQty,
                }
            }
            return ingredient
        })

        setIngredients(updatedIngredients)
        writeJson(STORAGE_KEYS.ingredients, updatedIngredients)
        handleCloseDialog()
    }

    return (
        <>
            <div id="dashboardContent">
                <DialogSlider
                    open={isOrderDialogOpen}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmOrder}
                    title={actionType === 'minus' ? 'Odstranit surovinu' : 'Přidat surovinu'}
                    label={`${selectedIngredient?.name ?? ''} | Aktuálně: ${selectedIngredient?.qty ?? 0} ks | Minimum: ${selectedIngredient?.min_qty ?? 0} ks`}
                    value={orderQty}
                    onChange={(_, newValue) => setOrderQty(typeof newValue === 'number' ? newValue : 0)}
                    min={0}
                    max={100}
                    confirmText={actionType === 'minus' ? 'Odstranit' : 'Přidat'}
                    cancelText="Zrušit"
                />
                <div id="linechart">
                    <ContentTitle text={"Přehled přijmů za rok 2025 a 2026"}/>
                    <div id="chartWrapper">
                        <LineChart/>
                    </div>
                </div>
                <div id="stockTable">
                    <ContentTitle text="Sklad surovin"/>

                    <div id="stockTableWrapper">
                        <StockTable
                            ingredients={sortedIngredients}
                            onPlusButtonClick={handlePlusButtonClick}
                            onMinusButtonClick={handleMinusButtonClick}
                            showMinusButton={false}
                            actionTitle="Rychlé objednání"
                        />
                    </div>
                </div>
                <section id="orderTable">
                    <ContentTitle text="Aktuální objednávky"/>
                    <div id="orderTableWrapper">
                        <OrderTable onPlusButtonClick={undefined} />
                    </div>
                </section>
            </div>
        </>
    )
}