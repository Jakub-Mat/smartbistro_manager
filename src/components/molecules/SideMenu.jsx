import LogoPic from '../atoms/LogoPic.jsx';
import RouteButton from "../atoms/RouteButton.jsx";
import { MdGridView, MdBarChart, MdAssignment} from "react-icons/md";
import { LuPackage } from 'react-icons/lu';

export default function SideMenu(){

    return (
        <>
            <div id="sideMenu">
                <LogoPic/>
                <RouteButton label="Dashboard" icon={MdGridView(undefined)} onClick={null}/>
                <RouteButton label="Analýza" icon={MdAssignment(undefined)} onClick={null}/>
                <RouteButton label="Jídelní lístek" icon={MdBarChart(undefined)} onClick={null}/>
                <RouteButton label="Správa skladu" icon={LuPackage(undefined)} onClick={null}/>
            </div>
        </>
    )
}