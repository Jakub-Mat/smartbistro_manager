import './Content.css'
import LineChart from "../../atoms/other/LineChart.jsx";


export default function Content() {
    return (
        <>
            <div id="content">
                <div id="linechart">
                    <span>
                        Analýza zisku
                    </span>
                    <LineChart/>
                </div>

            </div>
        </>
    );
}