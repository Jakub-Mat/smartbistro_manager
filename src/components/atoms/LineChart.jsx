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

const BASE_LABELS = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec'];

const BASE_DATASETS = [
    {
        id: 'currentYear',
        label: 'Prodej za aktuální rok',
        data: [4_300, 10_800, 15_000, 19_500, 20_100, 24_500, 40_000],
        fill: false,
        borderColor: '#4F9D69',
        backgroundColor: '#4F9D69',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 8,
    },
    {
        id: 'previousYear',
        label: 'Prodej za minulý rok',
        data: [5_000, 10_000, 14_000, 16_000, 18_000, 20_000, 23_000],
        fill: false,
        borderColor: '#EEE82C',
        backgroundColor: '#EEE82C',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 8,
    }
];

export const LINE_CHART_LABELS = BASE_LABELS;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const LineChart = ({
    xFrom = 0,
    xTo = BASE_LABELS.length - 1,
    yFrom = 0,
    yTo,
    hiddenLine,
    height = 260,
}) => {
    const maxIndex = BASE_LABELS.length - 1;
    const safeFrom = clamp(Number.isFinite(xFrom) ? xFrom : 0, 0, maxIndex);
    const safeTo = clamp(Number.isFinite(xTo) ? xTo : maxIndex, safeFrom, maxIndex);
    const visibleLabels = BASE_LABELS.slice(safeFrom, safeTo + 1);

    const visibleDatasets = BASE_DATASETS
        .filter((dataset) => dataset.id !== hiddenLine)
        .map((dataset) => ({
            ...dataset,
            data: dataset.data.slice(safeFrom, safeTo + 1),
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
            },
            title: {
                display: false,
                text: 'Zisk za aktuální půl rok',
            },
        },
        scales: {
            y: {
                min: Number.isFinite(yFrom) ? yFrom : 0,
                max: Number.isFinite(yTo) ? yTo : undefined,
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