import { useState } from 'react'
import LineChart, { LINE_CHART_LABELS } from '../atoms/LineChart.jsx'
import AnalysisFiltersPanel from '../molecules/AnalysisFiltersPanel.jsx'
import './AnalysisPage.css'
import ContentTitle from "../atoms/ContentTitle.jsx";

// TODO: Dodělat a zobrazit aktuální finanční stav => SUM ze všech cen z orders
// TODO: Dodělat tabulku s orders

const DEFAULT_FILTERS = {
    xFrom: 0,
    xTo: LINE_CHART_LABELS.length - 1,
    yFrom: 0,
    yTo: 70_000,
    hiddenLine: '',
}

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
            <section className="analysisChartSection">
                <ContentTitle text={"Přehled přijmů za rok 2024 a 2025"}/>
                <div className="analysisChartContainer">
                    <LineChart
                        xFrom={appliedFilters.xFrom}
                        xTo={appliedFilters.xTo}
                        yFrom={appliedFilters.yFrom}
                        yTo={appliedFilters.yTo}
                        hiddenLine={appliedFilters.hiddenLine}
                    />
                </div>
            </section>

            <AnalysisFiltersPanel
                draftFilters={draftFilters}
                monthOptions={monthOptions}
                onXFromChange={handleXFromChange}
                onXToChange={handleXToChange}
                onYFromChange={handleYFromChange}
                onYToChange={handleYToChange}
                onHiddenLineChange={(value) => setDraftFilters((previous) => ({ ...previous, hiddenLine: value }))}
                onApply={handleApply}
                onCancel={handleCancel}
            />
        </div>
    )
}