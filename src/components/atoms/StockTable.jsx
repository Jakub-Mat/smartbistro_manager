import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { MdAdd as AddIcon } from 'react-icons/md';

// TODO: dodělat cteni ingredienci z JSON souboru
import ingredientData from "../../assets/suroviny.json"

export default function StockTable({ onPlusButtonClick }) {
    function createData(
        name,
        pocet_ks,
        min_pocet,
        cena,
    ) {
        return { name, calories: pocet_ks, fat: min_pocet, carbs: cena }
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ]


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Surovina</TableCell>
                        <TableCell align="right">Počet ks</TableCell>
                        <TableCell align="right">Minimální počet</TableCell>
                        <TableCell align="right">Cena</TableCell>
                        <TableCell align="center">Actions</TableCell>
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
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    aria-label={`add ${row.name}`}
                                    onClick={() => onPlusButtonClick(row.name)}
                                >
                                    <AddIcon style={{color: "#1A1F16"}}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}