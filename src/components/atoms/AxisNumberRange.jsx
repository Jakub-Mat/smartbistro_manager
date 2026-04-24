export default function AxisNumberRange({
	title,
	fromValue,
	toValue,
	onFromChange,
	onToChange,
}) {
	return (
		<div className="filterBlock">
			<span className="filterLabel">{title}</span>
			<div className="filterRangeRow">
				<label>
					Od
					<input
						type="number"
						min={0}
						value={fromValue}
						onChange={(event) => onFromChange(Number(event.target.value))}
					/>
				</label>
				<label>
					Do
					<input
						type="number"
						min={0}
						value={toValue}
						onChange={(event) => onToChange(Number(event.target.value))}
					/>
				</label>
			</div>
		</div>
	)
}

