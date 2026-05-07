export default function AxisNumberRange({
	title,
	fromValue,
	toValue,
	onFromChange,
	onToChange,
	options = null,
}) {
	return (
		<div className="filterBlock">
			<span className="filterLabel">{title}</span>
			<div className="filterRangeRow">
				<label>
					Od
					{options ? (
						<select
							value={fromValue}
							onChange={(event) => onFromChange(Number(event.target.value))}
						>
							{options.map((option) => (
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
							onChange={(event) => onFromChange(Number(event.target.value))}
						/>
					)}
				</label>
				<label>
					Do
					{options ? (
						<select
							value={toValue}
							onChange={(event) => onToChange(Number(event.target.value))}
						>
							{options.map((option) => (
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
							onChange={(event) => onToChange(Number(event.target.value))}
						/>
					)}
				</label>
			</div>
		</div>
	)
}

