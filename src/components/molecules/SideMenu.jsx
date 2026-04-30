import LogoPic from '../atoms/LogoPic.jsx';
import RouteButton from "../atoms/RouteButton.jsx";
import { MdGridView, MdBarChart, MdAssignment} from "react-icons/md";
import './SideMenu.css';
import { LuPackage } from 'react-icons/lu';
import {NavLink} from "react-router-dom";

export default function SideMenu(){

    return (
        <>
            <div id="sideMenu">
                <LogoPic/>
                <NavLink to={"/dashboard"} id="navLink" className={({isActive}) => isActive ? "active" : "inactive"}>
                    <RouteButton label="Přehled" icon={MdGridView(undefined)}/>
                </NavLink>
                <NavLink to={"/analysis"} id="navLink" className={({isActive}) => isActive ? "active" : "inactive"}>
                    <RouteButton label="Analýza" icon={MdAssignment(undefined)}/>
                </NavLink>
                <NavLink to={"/menu"} id="navLink" className={({isActive}) => isActive ? "active" : "inactive"}>
                    <RouteButton label="Jídelní lístek" icon={MdBarChart(undefined)}/>
                </NavLink>
                <NavLink to={"/stock"} id="navLink" className={({isActive}) => isActive ? "active" : "inactive"}>
                    <RouteButton label="Správa skladu" icon={LuPackage(undefined)}/>
                </NavLink>
            </div>
        </>
    )
}