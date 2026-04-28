import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { FaRegFilePdf as AddIcon} from "react-icons/fa6";
import { initialOrders } from '../../utils/mockData.js'
import { STORAGE_KEYS, readJson } from '../../utils/storage.js'

export default function OrderTable({ onPlusButtonClick }) {
    const orders = readJson(STORAGE_KEYS.orders, initialOrders)

    return (
        <TableContainer component={Paper}  sx={{backgroundColor: "inherit"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID objednávky </TableCell>
                        <TableCell align="right">čas objednávky</TableCell>
                        <TableCell align="right">Počet ks</TableCell>
                        <TableCell align="right">Cena</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">
                                {new Date(order.timestamp).toLocaleString('cs-CZ',
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </TableCell>
                            <TableCell align="right">{order.quantity}</TableCell>
                            <TableCell align="right">{order.totalPrice} Kč</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    aria-label={`add ${order.id}`}
                                    onClick={() => onPlusButtonClick?.(order.id)}
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