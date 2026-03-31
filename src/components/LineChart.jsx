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
} from 'chart.js';

// Registrace prvků potřebných pro spojnicový graf
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const data = {
        labels: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'],
        datasets: [
            {
                label: 'Návštěvnost webu',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false, // Pokud true, oblast pod čárou bude vybarvená
                borderColor: 'rgb(75, 192, 192)', // Barva čáry
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // Barva bodů
                tension: 0.3, // Zakřivení čáry (0 = ostré úhly, vyšší číslo = hladší křivka)
                pointRadius: 5, // Velikost bodů
                pointHoverRadius: 8, // Velikost bodů při najetí myší
            },
            {
                label: 'Prodeje',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.3,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Týdenní statistiky',
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Osa Y začne od nuly
            }
        }
    };

    return (
        <div style={{ width: '800px', margin: '0 auto' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;