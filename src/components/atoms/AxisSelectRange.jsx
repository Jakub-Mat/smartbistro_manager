export default function AxisSelectRange({
    title,
    fromValue,
    toValue,
    options,
    onFromChange,
    onToChange,
}) {
    return (
        <div className="filterBlock">
            <span className="filterLabel">{title}</span>
            <div className="filterRangeRow">
                <label>
                    Od
                    <select value={fromValue} onChange={(event) => onFromChange(Number(event.target.value))}>
                        {options.map((option) => (
                            <option key={`from-${option.value}`} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Do
                    <select value={toValue} onChange={(event) => onToChange(Number(event.target.value))}>
                        {options.map((option) => (
                            <option key={`to-${option.value}`} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    )
}

