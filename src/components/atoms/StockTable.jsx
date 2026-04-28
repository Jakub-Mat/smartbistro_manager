import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { MdAdd as AddIcon } from 'react-icons/md'

export default function StockTable({ ingredients, onPlusButtonClick }) {

    const rows = (ingredients ?? []).map((ingredient, index) => ({
      ...ingredient,
      originalIndex: index, // kvuli stabilnimu razeni
    }))

    return (
        <TableContainer component={Paper} sx={{backgroundColor: "inherit"}}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Surovina</TableCell>
                        <TableCell align="right">Počet (ks)</TableCell>
                        <TableCell align="right">Minimální počet (ks)</TableCell>
                        <TableCell align="right">Cena (Kč)</TableCell>
                        <TableCell align="center">Rychlé objednání</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
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
                                    row.qty === row.min_qty ? 'var(--betterOrange)' : 'inherit',
                                    fontWeight: row.qty <= row.min_qty ? 700 : 400
                            }}>
                                {row.qty}
                            </TableCell>

                            <TableCell align="right">{row.min_qty}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="center" sx={{ width: '50px'}}>
                                <IconButton
                                    aria-label={`add ${row.name}`}
                                    onClick={() => onPlusButtonClick?.(row)}
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