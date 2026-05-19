import { useState } from 'react'
import LineChart, { LINE_CHART_LABELS } from '../atoms/LineChart.jsx'
import OrderTable from '../atoms/OrderTable.jsx'
import AnalysisFiltersPanel from '../molecules/AnalysisFiltersPanel.jsx'
import './AnalysisPage.css'
import ContentTitle from "../atoms/ContentTitle.jsx"
import useOrders from '../../hooks/useOrders.js'

const DEFAULT_FILTERS = {
    xFrom: 0,
    xTo: LINE_CHART_LABELS.length - 1,
    yFrom: 0,
    hiddenLine: '',
}

const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})


const getMaxOrderPrice = (orders) => {
    return orders.reduce((max, order) => {
        const price = Number.isFinite(order.totalPrice) ? order.totalPrice : 0
        return Math.max(max, price)
    }, 0)
}

const getYAxisStep = (maxValue) => {
    if (maxValue <= 100) return 10
    if (maxValue <= 500) return 25
    if (maxValue <= 1_000) return 50
    if (maxValue <= 5_000) return 250
    if (maxValue <= 10_000) return 500
    if (maxValue <= 50_000) return 2_500
    if (maxValue <= 100_000) return 5_000
    return 10_000
}

const generateYAxisOptions = (maxValue) => {
    const step = getYAxisStep(maxValue)
    const roundedMax = Math.ceil(maxValue / step) * step
    const options = []
    for (let i = 0; i <= roundedMax; i += step) {
        options.push({
            label: `${i.toLocaleString('cs-CZ')} Kč`,
            value: i,
        })
    }
    return options
}

export default function AnalysisPage() {

    const orders = useOrders()

    const maxOrderPrice = getMaxOrderPrice(orders)
    const yAxisOptions = generateYAxisOptions(maxOrderPrice)
    const maxYAxisValue = yAxisOptions.at(-1)?.value ?? 0

    const [appliedFilters, setAppliedFilters] = useState(() => ({
        ...DEFAULT_FILTERS,
        yTo: maxYAxisValue,
    }))
    const [draftFilters, setDraftFilters] = useState(() => ({
        ...DEFAULT_FILTERS,
        yTo: maxYAxisValue,
    }))

    // Součet příjmů podle aktuálně aplikovaných filtrů (stejné jako v grafu).
    const filteredFinancialState = orders.reduce((sum, order) => {
        if (!order?.timestamp) return sum
        const orderDate = new Date(order.timestamp)
        if (Number.isNaN(orderDate.getTime())) return sum
        
        // Check month range
        const monthIndex = orderDate.getUTCMonth()
        if (monthIndex < appliedFilters.xFrom || monthIndex > appliedFilters.xTo) {
            return sum
        }
        
        // Check price range
        const price = Number.isFinite(order.totalPrice) ? order.totalPrice : 0
        if (price < appliedFilters.yFrom || price > appliedFilters.yTo) {
            return sum
        }
        
        // Check hidden line (year)
        const year = orderDate.getUTCFullYear()
        if (appliedFilters.hiddenLine === `year${year}`) {
            return sum
        }
        
        return sum + price
    }, 0)

    const monthOptions = LINE_CHART_LABELS.map((label, index) => ({
        label,
        value: index,
    }))

    const handleXFromChange = (value) => {
        setDraftFilters((previous) => ({
            ...previous,
            xFrom: value,
            xTo: Math.max(value, previous.xTo),
        }))
    }

    const handleXToChange = (value) => {
        setDraftFilters((previous) => ({
            ...previous,
            xFrom: Math.min(previous.xFrom, value),
            xTo: value,
        }))
    }

    // Nastaví pouze "yFrom" (už nepropaguje změnu do `yTo`).
    // Zároveň zabrání, aby "yFrom" bylo >= "yTo" (rovnost rozbíjela graf).
    const handleYFromChange = (value) => {
        setDraftFilters((previous) => {
            const v = Math.max(value, 0)
            const adjusted = v >= previous.yTo ? Math.max(0, previous.yTo - 1) : v
            return {
                ...previous,
                yFrom: adjusted,
            }
        })
    }

    // Nastaví pouze "yTo" (už nepropaguje změnu do "yFrom").
    // Zároveň zabrání, aby "yTo" bylo <= "yFrom".
    const handleYToChange = (value) => {
        setDraftFilters((previous) => {
            const v = Math.max(value, 0)
            const adjusted = v <= previous.yFrom ? previous.yFrom + 1 : v
            return {
                ...previous,
                yTo: adjusted,
            }
        })
    }

    // Handler pro změnu viditelnosti let - když se vybere jeden rok, skryje se druhý
    // Příklad: vybere-li se 2026, skryje se 2025 (hiddenLine = 'year2025')
    const handleLineVisibilityChange = (value) => {
        // `value` je hodnota vybraná v `LineVisibilitySelect` a reprezentuje
        // který rok uživatel CHCE VIDĚT ('' = všechny roky, 'year2026' = zobrazit
        // pouze 2026, 'year2025' = zobrazit pouze 2025). Interně ale ukládáme
        // do filtru `hiddenLine` ID datasetu, který má být SKRYT. Abychom tedy
        // při výběru roku zobrazili jen ten rok, nastavíme `hiddenLine` na
        // opačný dataset. Např. když uživatel zvolí 'year2026', skryjeme
        // 'year2025' — tím zůstane viditelný pouze 2026.
        let hiddenLine = ''
        if (value === 'year2026') {
            hiddenLine = 'year2025'
        } else if (value === 'year2025') {
            hiddenLine = 'year2026'
        }
        // Pokud je vybráno '', necháme `hiddenLine` prázdné (zobrazí se oba roky)
        setDraftFilters((previous) => ({
            ...previous,
            hiddenLine: hiddenLine,
        }))
    }

    const handleApply = () => {
        setAppliedFilters(draftFilters)
    }

    const handleCancel = () => {
        setDraftFilters(appliedFilters)
    }

    return (
        <div id="content" className="analysisContent">
            <div className="analysisMainColumn">
                <section className="analysisChartSection">
                    <div className="analysisChartContent">
                        <ContentTitle text={"Přehled přijmů za rok 2025 a 2026"}/>
                        <div className="analysisChartContainer">
                            <LineChart
                                xFrom={appliedFilters.xFrom}
                                xTo={appliedFilters.xTo}
                                yFrom={appliedFilters.yFrom}
                                yTo={appliedFilters.yTo}
                                hiddenLine={appliedFilters.hiddenLine}
                            />
                        </div>
                    </div>
                    <AnalysisFiltersPanel
                        draftFilters={draftFilters}
                        monthOptions={monthOptions}
                        yAxisOptions={yAxisOptions}
                        onXFromChange={handleXFromChange}
                        onXToChange={handleXToChange}
                        onYFromChange={handleYFromChange}
                        onYToChange={handleYToChange}
                        lineVisibilityValue={
                            // V `draftFilters.hiddenLine` ukládáme ID řádku, který má být
                            // skryt (např. 'year2025'). Komponenta `LineVisibilitySelect`
                            // ale očekává hodnotu reprezentující vybraný viditelný rok
                            // ('' | 'year2026' | 'year2025'). Proto zde mapujeme uložené
                            // ID skrytého řádku zpět na hodnotu, která odpovídá tomu,
                            // co má být v selektu zobrazeno (tj. opačný rok nebo
                            // prázdná hodnota pro "Všechny roky").
                            draftFilters.hiddenLine === ''
                                ? ''
                                : draftFilters.hiddenLine === 'year2025'
                                ? 'year2026'
                                : 'year2025'
                        }
                        onLineVisibilityChange={handleLineVisibilityChange}
                        onApply={handleApply}
                        onCancel={handleCancel}
                    />
                </section>

                <div className="analysisFinancialPanel">
                    <span className="analysisFinancialLabel">Finanční příjem:</span>
                    <strong className="analysisFinancialValue">
                        {currencyFormatter.format(filteredFinancialState)}
                    </strong>
                </div>

                <section className="analysisOrdersSection">
                    <ContentTitle text="Aktuální objednávky" />
                    <div className="analysisOrdersTable">
                        <OrderTable />
                    </div>
                </section>
            </div>
        </div>
    )
}