import './Content.css'
import LineChart from "../../atoms/LineChart.jsx";
import StockTable from "../../atoms/StockTable.jsx";
import OrderTable from "../../atoms/OrderTable.jsx"

export default function Content() {
    return (
        <>
            <div id="content">
                {/* Graf přehledů zisku */}
                <div id="linechart">
                    <span id="chartTitle">
                        Přehled přijmů za rok 2024 a 2025
                    </span>
                    <div id="chartWrapper">
                        <LineChart/>
                    </div>
                </div>
                {/*Tabulka položek ve skladu s tlačítkem rychlého objednání*/}
                <div id="stockTable">
                    <span>
                        Zboží ve skladu
                    </span>
                    <div id="stockTableWrapper">
                        <StockTable onPlusButtonClick={undefined}/>
                    </div>
                </div>
                <div id="orderTable">
                    <span>
                        Objednávky za dnešní den
                    </span>
                    <div id="orderTableWrapper">
                        <OrderTable onPlusButtonClick={undefined}/>
                    </div>
                </div>


            </div>
        </>
    );
}