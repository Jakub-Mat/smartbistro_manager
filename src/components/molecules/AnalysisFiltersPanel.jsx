import AxisSelectRange from '../atoms/AxisSelectRange.jsx'
import AxisNumberRange from '../atoms/AxisNumberRange.jsx'
import FilterActionButtons from '../atoms/FilterActionButtons.jsx'
import LineVisibilitySelect from '../atoms/LineVisibilitySelect.jsx'
import './AnalysisFiltersPanel.css'

export default function AnalysisFiltersPanel({
    draftFilters,
    monthOptions,
    yAxisOptions,
    onXFromChange,
    onXToChange,
    onYFromChange,
    onYToChange,
    lineVisibilityValue,
    onLineVisibilityChange,
    onApply,
    onCancel,
}) {
    return (
        <div className="analysisFiltersPanel">
            <h3>Filtrace grafu</h3>

            <AxisSelectRange
                title="Rozsah měsíců"
                options={monthOptions}
                fromValue={draftFilters.xFrom}
                toValue={draftFilters.xTo}
                onFromChange={onXFromChange}
                onToChange={onXToChange}
            />

            <AxisNumberRange
                title="Finanční rozsah (Kč)"
                options={yAxisOptions}
                fromValue={draftFilters.yFrom}
                toValue={draftFilters.yTo}
                onFromChange={onYFromChange}
                onToChange={onYToChange}
            />

            <LineVisibilitySelect value={lineVisibilityValue} onChange={onLineVisibilityChange} />

            <FilterActionButtons onApply={onApply} onCancel={onCancel} />
        </div>
    )
}

