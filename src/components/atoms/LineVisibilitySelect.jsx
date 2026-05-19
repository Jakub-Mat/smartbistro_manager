import { useState, useRef, useEffect } from 'react'

const lineOptions = [
    { value: '', label: 'Všechny roky' },
    { value: 'year2026', label: '2026', color: '#4F9D69'},
    { value: 'year2025', label: '2025', color: '#EEE82C' },
]

export default function LineVisibilitySelect({ value, onChange }) {
    // Stav pro otevření/zavření dropdown menu
    const [isOpen, setIsOpen] = useState(false)
    // Odkaz na dropdown element pro detekci kliknutí mimo něj
    const dropdownRef = useRef(null)

    // Najde aktuálně vybranou možnost v seznamu podle hodnoty
    const currentOption = lineOptions.find(opt => opt.value === value)

    // Effect pro zavření dropdown menu při kliknutí mimo
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Handler pro výběr možnosti - zavolá onChange callback a zavře menu
    const handleSelect = (optionValue) => {
        onChange(optionValue)
        setIsOpen(false)
    }

    return (
        <div className="filterBlock">
            <span className="filterLabel">Zobrazení prodeje v roce</span>
            <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        width: '100%',
                        padding: '6px 8px',
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}
                >
                    {currentOption?.color && (
                        <span style={{ color: currentOption.color, fontWeight: 'bold', fontSize: '18px' }}>●</span>
                    )}
                    <span>{currentOption?.label || 'Vyberte...'}</span>
                </button>

                {isOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            marginTop: '4px',
                            zIndex: 1000,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        {lineOptions.map((option) => (
                            <div
                                key={option.value || 'all'}
                                onClick={() => handleSelect(option.value)}
                                style={{
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    backgroundColor: value === option.value ? '#f0f0f0' : '#fff',
                                    borderBottom: '1px solid #f0f0f0',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = value === option.value ? '#f0f0f0' : '#fff')}
                            >
                                {option.color && (
                                    <span style={{ color: option.color, fontWeight: 'bold', fontSize: '18px' }}>●</span>
                                )}
                                <span>
                                    {option.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

