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

const LineChart = () => {
    const data = {
        labels: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen'],
        datasets: [
            {
                label: 'Prodej za aktuální rok',
                data: [4_300, 10_800, 15_000,19_500, 20_100, 24_500, 40_000],
                fill: false, // Pokud true, oblast pod čárou bude vybarvená
                borderColor: '#4F9D69', // primary definováná v index.css
                backgroundColor: '#4F9D69',
                tension: 0.3, // Zakřivení čáry (0 = ostré úhly, vyšší číslo = hladší křivka)
                pointRadius: 4, // Velikost bodů
                pointHoverRadius: 8, // Velikost bodů při najetí myší
            },
            {
                label: 'Prodej za minulý rok',
                data: [5_000, 10_000, 14_000, 16_000, 18_000, 20_000, 23_000],
                fill: false,
                borderColor: '#EEE82C',
                backgroundColor: '#EEE82C',
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 8,
            }
        ],
    };

    const options = {
        responsive: true,
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
                beginAtZero: true, // Osa Y začne od nuly
            }
        }
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;