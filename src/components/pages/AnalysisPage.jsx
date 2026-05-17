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

const CURRENT_YEAR = 2026
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

const normalizeFilters = (filters, maxYAxisValue) => {
    const nextYFrom = Math.min(Math.max(filters.yFrom, 0), maxYAxisValue)
    const nextYTo = Math.min(Math.max(filters.yTo, nextYFrom), maxYAxisValue)

    return {
        ...filters,
        yFrom: nextYFrom,
        yTo: nextYTo,
    }
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
    const normalizedAppliedFilters = normalizeFilters(appliedFilters, maxYAxisValue)
    const normalizedDraftFilters = normalizeFilters(draftFilters, maxYAxisValue)

    const currentYearFinancialState = orders.reduce((sum, order) => {
        if (!order?.timestamp) return sum
        const orderDate = new Date(order.timestamp)
        if (Number.isNaN(orderDate.getTime())) return sum
        if (orderDate.getUTCFullYear() !== CURRENT_YEAR) return sum
        return sum + (Number.isFinite(order.totalPrice) ? order.totalPrice : 0)
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

    const handleLineVisibilityChange = (value) => {
        setDraftFilters((previous) => ({
            ...previous,
            hiddenLine: value,
        }))
    }

    const handleApply = () => {
        setAppliedFilters(normalizedDraftFilters)
    }

    const handleCancel = () => {
        setDraftFilters(normalizedAppliedFilters)
    }

    return (
        <div id="content" className="analysisContent">
            <div className="analysisMainColumn">
                <section className="analysisChartSection">
                    <div className="analysisChartContent">
                        <ContentTitle text={"Přehled přijmů za rok 2025 a 2026"}/>
                        <div className="analysisChartContainer">
                            <LineChart
                                xFrom={normalizedAppliedFilters.xFrom}
                                xTo={normalizedAppliedFilters.xTo}
                                yFrom={normalizedAppliedFilters.yFrom}
                                yTo={normalizedAppliedFilters.yTo}
                                hiddenLine={normalizedAppliedFilters.hiddenLine}
                            />
                        </div>
                    </div>
                    <AnalysisFiltersPanel
                        draftFilters={normalizedDraftFilters}
                        monthOptions={monthOptions}
                        yAxisOptions={yAxisOptions}
                        onXFromChange={handleXFromChange}
                        onXToChange={handleXToChange}
                        onYFromChange={handleYFromChange}
                        onYToChange={handleYToChange}
                        lineVisibilityValue={normalizedDraftFilters.hiddenLine}
                        onLineVisibilityChange={handleLineVisibilityChange}
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