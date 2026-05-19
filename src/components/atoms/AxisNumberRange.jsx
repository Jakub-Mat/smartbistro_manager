export default function AxisNumberRange({
	title,
	fromValue,
	toValue,
	onFromChange,
	onToChange,
	options = null,
}) {
	// from nesmí být rovno to (ani větší), proto:
	// - z nabídky pro "from" odstraníme max. hodnotu
	// - a navíc "from" filtrujeme tak, aby vždy bylo < aktuálního toValue
	// - pro "to" naopak povolíme pouze hodnoty > aktuálního "fromValue"
	const baseFromOptions = options && options.length > 1 ? options.slice(0, -1) : options
	const fromOptions = options ? baseFromOptions.filter((opt) => opt.value < toValue) : baseFromOptions
	const toOptions = options ? options.filter((opt) => opt.value > fromValue) : options

	// Handlery jen předávají hodnoty rodiči.
	// Validaci vztahu "from < to" řešíme výběrem validních možností výše.
	const handleFromChange = (nextFrom) => {
		onFromChange(nextFrom)
	}

	const handleToChange = (nextTo) => {
		onToChange(nextTo)
	}

	return (
		<div className="filterBlock">
			<span className="filterLabel">{title}</span>
			<div className="filterRangeRow">
				<label>
					Od
					{options ? (
						<select
							value={fromValue}
							onChange={(event) => handleFromChange(Number(event.target.value))}
						>
							{fromOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					) : (
						<input
							type="number"
							min={0}
							value={fromValue}
							onChange={(event) => handleFromChange(Number(event.target.value))}
						/>
					)}
				</label>
				<label>
					Do
					{options ? (
						<select
							value={toValue}
							onChange={(event) => handleToChange(Number(event.target.value))}
						>
							{toOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					) : (
						<input
							type="number"
							min={0}
							value={toValue}
							onChange={(event) => handleToChange(Number(event.target.value))}
						/>
					)}
				</label>
			</div>
		</div>
	)
}

