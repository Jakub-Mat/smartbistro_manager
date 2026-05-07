import { useState } from 'react'
import LineChart, { LINE_CHART_LABELS } from '../atoms/LineChart.jsx'
import OrderTable from '../atoms/OrderTable.jsx'
import AnalysisFiltersPanel from '../molecules/AnalysisFiltersPanel.jsx'
import './AnalysisPage.css'
import ContentTitle from "../atoms/ContentTitle.jsx";
import { initialOrders } from '../../utils/mockData.js'

const DEFAULT_FILTERS = {
    xFrom: 0,
    xTo: LINE_CHART_LABELS.length - 1,
    yFrom: 0,
    yTo: 70_000,
}

const CURRENT_YEAR = 2026
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

const currentYearFinancialState = initialOrders.reduce((sum, order) => {
    if (!order?.timestamp) return sum

    const orderDate = new Date(order.timestamp)
    if (Number.isNaN(orderDate.getTime())) return sum

    if (orderDate.getUTCFullYear() !== CURRENT_YEAR) return sum

    return sum + (Number.isFinite(order.totalPrice) ? order.totalPrice : 0)
}, 0)

//Dynamické generování možností pro osu Y na základě maximální ceny objednávky, zaokrouhlené na nejbližší vyšší 10 000 Kč
const maxOrderPrice = initialOrders.reduce((max, order) => {
    const price = Number.isFinite(order.totalPrice) ? order.totalPrice : 0
    return Math.max(max, price)
}, 0)

const generateYAxisOptions = (maxValue, step = 10000) => {
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

const yAxisOptions = generateYAxisOptions(maxOrderPrice)

export default function AnalysisPage() {

    const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS)
    const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS)

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

    const handleYFromChange = (value) => {
        setDraftFilters((previous) => ({
            ...previous,
            yFrom: Math.max(value, 0),
            yTo: Math.max(Math.max(value, 0), previous.yTo),
        }))
    }

    const handleYToChange = (value) => {
        setDraftFilters((previous) => ({
            ...previous,
            yFrom: Math.min(previous.yFrom, value),
            yTo: Math.max(value, 0),
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
                        <ContentTitle text={"Přehled přijmů za rok 2024 a 2025"}/>
                        <div className="analysisChartContainer">
                            <LineChart
                                xFrom={appliedFilters.xFrom}
                                xTo={appliedFilters.xTo}
                                yFrom={appliedFilters.yFrom}
                                yTo={appliedFilters.yTo}
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
                        onApply={handleApply}
                        onCancel={handleCancel}
                    />
                </section>

                <div className="analysisFinancialPanel">
                    <span className="analysisFinancialLabel">Aktuální finanční stav:</span>
                    <strong className="analysisFinancialValue">
                        {currencyFormatter.format(currentYearFinancialState)}
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