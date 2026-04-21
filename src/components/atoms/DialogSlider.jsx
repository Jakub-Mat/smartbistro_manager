import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

export default function DialogSlider({
    open,
    onClose,
    onConfirm,
    title,
    label,
    value,
    onChange,
    min,
    max,
    confirmText = 'Potvrdit',
    cancelText = 'Zavřít',
}) {

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>{label}</Typography>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={1}
                    valueLabelDisplay="on"
                />
            </DialogContent>
            <DialogActions>
                {/*tlačítka pro uzavření nebo potrvzení: */}
                <Button onClick={onClose}>{cancelText}</Button>
                <Button variant="contained" onClick={onConfirm}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}