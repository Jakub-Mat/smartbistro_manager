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
}) {

    const rows = (ingredients ?? []).map((ingredient, index) => ({
      ...ingredient,
      originalIndex: index, // kvuli stabilnimu razeni
    }))

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
                            <TableCell align="center" sx={{ width: '96px'}}>
                                {showMinusButton && (
                                    <IconButton
                                        disabled={row.qty <= 0}
                                        onClick={() => onMinusButtonClick?.(row)}
                                        className="stockButton"
                                    >
                                        <RemoveIcon style={{color: "#1A1F16", margin: '0'}}/>
                                    </IconButton>
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