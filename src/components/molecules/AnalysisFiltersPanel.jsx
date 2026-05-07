import AxisSelectRange from '../atoms/AxisSelectRange.jsx'
import AxisNumberRange from '../atoms/AxisNumberRange.jsx'
import FilterActionButtons from '../atoms/FilterActionButtons.jsx'
import './AnalysisFiltersPanel.css'

export default function AnalysisFiltersPanel({
    draftFilters,
    monthOptions,
    yAxisOptions,
    onXFromChange,
    onXToChange,
    onYFromChange,
    onYToChange,
    onApply,
    onCancel,
}) {
    return (
        <aside className="analysisFiltersPanel">
            <h3>Filtrace grafu</h3>

            <AxisSelectRange
                title="Rozsah osy X"
                options={monthOptions}
                fromValue={draftFilters.xFrom}
                toValue={draftFilters.xTo}
                onFromChange={onXFromChange}
                onToChange={onXToChange}
            />

            <AxisNumberRange
                title="Rozsah osy Y"
                options={yAxisOptions}
                fromValue={draftFilters.yFrom}
                toValue={draftFilters.yTo}
                onFromChange={onYFromChange}
                onToChange={onYToChange}
            />

            <FilterActionButtons onApply={onApply} onCancel={onCancel} />
        </aside>
    )
}

