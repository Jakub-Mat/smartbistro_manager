import LogoPic from '../atoms/LogoPic.jsx';
import RouteButton from "../atoms/RouteButton.jsx";
import { MdGridView, MdBarChart, MdAssignment} from "react-icons/md";
import { LuPackage } from 'react-icons/lu';
import {NavLink} from "react-router-dom";

export default function SideMenu(){

    return (
        <>
            <div id="sideMenu">
                <LogoPic/>
                <NavLink to={"/dashboard"} className={({isActive}) => isActive ? "active" : ""}>
                    <RouteButton label="Dashboard" icon={MdGridView(undefined)}/>
                </NavLink>
                <NavLink to={"/analysis"} className={({isActive}) => isActive ? "active" : ""}>
                    <RouteButton label="Analýza" icon={MdAssignment(undefined)}/>
                </NavLink>
                <NavLink to={"/menu"} className={({isActive}) => isActive ? "active" : ""}>
                    <RouteButton label="Jídelní lístek" icon={MdBarChart(undefined)}/>
                </NavLink>
                <NavLink to={"/stock"} className={({isActive}) => isActive ? "active" : ""}>
                    <RouteButton label="Správa skladu" icon={LuPackage(undefined)}/>
                </NavLink>
            </div>
        </>
    )
}