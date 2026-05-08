import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { initialOrders } from '../../utils/mockData.js'
import useOrders from '../../hooks/useOrders';

// Registrace prvků potřebných pro spojnicový graf
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const MONTH_LABELS = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];




export const LINE_CHART_LABELS = MONTH_LABELS;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const trimTrailingZeros = (values) => {
    const lastDataIndex = values.reduce((lastIndex, value, index) => (value > 0 ? index : lastIndex), -1);

    return values.map((value, index) => (index <= lastDataIndex ? value : null));
};

const LineChart = ({
    xFrom = 0,
    xTo = MONTH_LABELS.length - 1,
    yFrom = 0,
    yTo,
    hiddenLine,
}) => {
    const maxIndex = MONTH_LABELS.length - 1;
    const safeFrom = clamp(Number.isFinite(xFrom) ? xFrom : 0, 0, maxIndex);
    const safeTo = clamp(Number.isFinite(xTo) ? xTo : maxIndex, safeFrom, maxIndex);
    const visibleLabels = MONTH_LABELS.slice(safeFrom, safeTo + 1);
    
    
    const liveOrders = useOrders()
    const orders = Array.isArray(liveOrders) && liveOrders.length > 0
      ? liveOrders
      : initialOrders

    // Sčítání totalPrice za jednotlivé měsíce pro konkrétní rok (UTC)
    const getMonthlyTotals = (orders, year) => {
        const totals = new Array(12).fill(0);
        orders.forEach((o) => {
            if (!o || !o.timestamp) return;
            const d = new Date(o.timestamp);
            if (Number.isNaN(d)) return;
            const y = d.getUTCFullYear();
            const m = d.getUTCMonth(); // 0..11
            if (y === year) {
                const price = Number.isFinite(o.totalPrice) ? o.totalPrice : 0;
                totals[m] += price;
            }
        });
        return totals;
    };

    const DATA_2025 = getMonthlyTotals(orders, 2025);
    const DATA_2026 = getMonthlyTotals(orders, 2026);

    const ALL_DATASETS = [
        {
            id: 'year2026',
            label: 'Prodej 2026',
            data: trimTrailingZeros(DATA_2026),
            fill: false,
            borderColor: '#4F9D69',
            backgroundColor: '#4F9D69',
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 8,
        },
        {
            id: 'year2025',
            label: 'Prodej 2025',
            data: trimTrailingZeros(DATA_2025),
            fill: false,
            borderColor: '#EEE82C',
            backgroundColor: '#EEE82C',
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 8,
        },
    ];

    const visibleDatasets = ALL_DATASETS
        .filter((dataset) => dataset.id !== hiddenLine)
        .map((dataset) => ({
            ...dataset,
            data: (dataset.data || []).slice(safeFrom, safeTo + 1),
        }));

    const data = {
        labels: visibleLabels,
        datasets: visibleDatasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#1e221b',
                    font: {
                        size: 14,
                        weight: '600',
                    },
                },
            },
            title: {
                display: false,
                text: 'Zisk za aktuální půl rok',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'var(--fontColor)',
                }
            },
            y: {
                min: Number.isFinite(yFrom) ? yFrom : 0,
                max: Number.isFinite(yTo) ? yTo : undefined,
                ticks: {
                    color: 'var(--fontColor)',
                },
            }
        }
    };

    return (
                <div style={{height: '100%',width: '100%'}}>
                <Line data={data} options={options} />
            </div>
    );
};

export default LineChart;