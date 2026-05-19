import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { MdAdd as AddIcon } from 'react-icons/md'
import { MdRemove as RemoveIcon } from 'react-icons/md'
import './StockTable.css'

export default function StockTable({
    ingredients,
    onPlusButtonClick,
    onMinusButtonClick,
    showMinusButton = true,
    actionTitle = 'Úprava skladu',
    onSetQuantity,
}) {

    const rows = (ingredients ?? []).map((ingredient, index) => ({
      ...ingredient,
      originalIndex: index, // kvuli stabilnimu razeni
    }))

    const [quantities, setQuantities] = useState({})

    useEffect(() => {
        const map = {}
        ;(ingredients ?? []).forEach((ing) => {
            map[ing.name] = ing.qty
        })
        // update state asynchronously to avoid synchronous setState in effect
        const t = setTimeout(() => setQuantities(map), 0)
        return () => clearTimeout(t)
    }, [ingredients])

    const isStockRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/stock')

    return (
        <TableContainer component={Paper} sx={{backgroundColor: "inherit"}} id="stockTableContainer">
            <Table id="mainTable">
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell>Surovina</TableCell>
                        <TableCell align="right">Počet (ks)</TableCell>
                        <TableCell align="right">Minimální počet (ks)</TableCell>
                        <TableCell align="right">Cena (Kč)</TableCell>
                        <TableCell align="center">{actionTitle}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>

                            <TableCell
                                align="right"
                                //obarvení počtu ks pro lepší přehlednost
                                sx={{
                                    color: row.qty < row.min_qty ? 'var(--highlightRed)' :
                                    row.qty === row.min_qty ? 'var(--betterOrange)' : 'var(--primary)',
                                    fontWeight: row.qty <= row.min_qty ? 700 : 400
                            }}>
                                {row.qty}
                            </TableCell>

                            <TableCell align="right">{row.min_qty}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="center" className="stockTableRightCell">
                                {showMinusButton && (
                                    <IconButton
                                        disabled={row.qty <= 0}
                                        onClick={() => onMinusButtonClick?.(row)}
                                        className="stockButton"
                                    >
                                        <RemoveIcon style={{color: "#1A1F16", margin: '0'}}/>
                                    </IconButton>
                                )}

                                {isStockRoute && (
                                    <input
                                        type="number"
                                        min={0}
                                        value={quantities[row.name] ?? row.qty}
                                        onChange={(e) => {
                                            const raw = e.target.value
                                            setQuantities((prev) => ({ ...prev, [row.name]: raw }))
                                        }}
                                        onBlur={(e) => {
                                            const raw = e.target.value
                                            const parsed = Number(raw)
                                            if (Number.isFinite(parsed) && parsed >= 0) {
                                                const normalized = Math.round(parsed)
                                                setQuantities((prev) => ({ ...prev, [row.name]: normalized }))
                                                onSetQuantity?.(row, normalized)
                                            } else {
                                                setQuantities((prev) => ({ ...prev, [row.name]: row.qty }))
                                            }
                                        }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
                                        className="stockQuantityInput"
                                        style={{ width: '56px' }}
                                    />
                                )}

                                <IconButton
                                    aria-label={`add ${row.name}`}
                                    onClick={() => onPlusButtonClick?.(row)}
                                    className="stockButton"
                                >
                                    <AddIcon style={{color: "#1A1F16", margin: '0'}}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}