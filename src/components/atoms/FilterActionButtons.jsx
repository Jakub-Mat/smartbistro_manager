export default function FilterActionButtons({ onApply, onCancel }) {
    return (
        <div className="filterActions">
            <button type="button" className="btnApply" onClick={onApply}>
                Použít
            </button>
            <button type="button" className="btnCancel" onClick={onCancel}>
                Zrušit
            </button>
        </div>
    )
}

