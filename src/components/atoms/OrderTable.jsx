import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FaRegFilePdf as AddIcon} from "react-icons/fa6";
import useOrders from '../../hooks/useOrders'
import './OrderTable.css'

export default function OrderTable() {
    const orders = useOrders()

    const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )

    // Načte font s podporou češtiny, aby se PDF správně zobrazovalo.
    const loadUnicodeFont = async (doc) => {
        const response = await fetch('/fonts/arial.ttf')
        if (!response.ok) {
            throw new Error('Nepodařilo se načíst font pro PDF')
        }

        const buffer = await response.arrayBuffer()

        let binary = ''
        const bytes = new Uint8Array(buffer)
        const chunkSize = 0x8000

        for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
        }

        const base64 = btoa(binary)
        doc.addFileToVFS('Arial.ttf', base64)
        doc.addFont('Arial.ttf', 'ArialUnicode', 'normal')
        doc.setFont('ArialUnicode')
    }

    // Převádí položky objednávky do řádků pro PDF tabulku.
    const getProductRows = (products = []) => {
        const rows = products.map((product, index) => {
            const productName = product?.name ?? (typeof product === 'string' ? product : `Produkt ${index + 1}`)
            const productQuantity = Number(product?.quantity ?? product?.qty ?? 1)
            const unitPrice = Number(product?.unitPrice ?? 0)
            const lineTotal = unitPrice * productQuantity
            return [productName, `${productQuantity}x`, `${lineTotal} Kč`]
        })

        if (rows.length === 0) {
            return [['Bez položek', '-', '-']]
        }

        return rows
    }

    // Vytvoří PDF, zapíše základní údaje o objednávce, doplní tabulku položek
    // a nakonec otevře výsledný soubor v nové kartě prohlížeče.
    const handlePdfClick = async (order) => {
        const doc = new jsPDF()
    
        await loadUnicodeFont(doc)

        doc.setFontSize(16)
        doc.text(`Objednávka #${order.id}`, 14, 16)
    
        doc.setFontSize(11)
        doc.text(`Datum: ${new Date(order.timestamp).toLocaleString('cs-CZ')}`, 14, 26)
        doc.text(`Počet ks: ${order.quantity}`, 14, 33)
        doc.text(`Celková cena: ${order.totalPrice} Kč`, 14, 40)
    
        autoTable(doc, {
            startY: 48,
            head: [['Produkt', 'Množství','Cena']],
                styles: {
                    font: 'ArialUnicode',
                    fontStyle: 'normal',
                },
                headStyles: {
                    font: 'ArialUnicode',
                    fontStyle: 'normal',
                },
            body: getProductRows(order.products),
        })
    
        const pdfBlob = doc.output('blob')
        const url = URL.createObjectURL(pdfBlob)
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <TableContainer id="orderTableContainer">
            <Table>
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell>ID objednávky </TableCell>
                        <TableCell align="right">Čas objednávky</TableCell>
                        <TableCell align="right">Počet ks</TableCell>
                        <TableCell align="right">Cena</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                    {sortedOrders.map((order) => (
                        <TableRow
                            key={order.id}
                        >
                            <TableCell component="th" scope="row" align="center">
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
                                    className="orderButton"
                                    onClick={() => handlePdfClick(order)}
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