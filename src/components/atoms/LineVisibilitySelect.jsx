const lineOptions = [
    { value: '', label: 'Zobrazit obě linky' },
    { value: 'year2026', label: 'Skrýt aktuální rok' },
    { value: 'year2025', label: 'Skrýt minulý rok' },
]

export default function LineVisibilitySelect({ value, onChange }) {
    return (
        <div className="filterBlock">
            <span className="filterLabel">Viditelnost linek</span>
            <label>
                Linka
                <select value={value} onChange={(event) => onChange(event.target.value)}>
                    {lineOptions.map((option) => (
                        <option key={option.value || 'all'} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

