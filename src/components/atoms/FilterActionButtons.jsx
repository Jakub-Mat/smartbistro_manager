export default function FilterActionButtons({ onApply, onCancel }) {
    return (
        <div className="filterActions">
            <button type="button" className="analysisApplyButton" onClick={onApply}>
                Použít
            </button>
            <button type="button" className="analysisCancelButton" onClick={onCancel}>
                Zrušit
            </button>
        </div>
    )
}

