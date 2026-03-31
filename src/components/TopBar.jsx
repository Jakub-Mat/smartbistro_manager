import IconLabel from "./IconLabel.jsx";
import { MdStore, MdLocationOn, MdAccountCircle} from "react-icons/md";

export default function TopBar(){

    return (
        <>
            <div id="topBar" style={{display: "inline-flex"}}>
                <IconLabel text="Best Bistro Burger" icon={MdStore(undefined)}/>
                <IconLabel text="Jateční 26, Plzeň" icon={MdLocationOn(undefined)}/>
                <IconLabel text="User name" icon={MdAccountCircle(undefined)} id="account" onclick={null}/>
            </div>
        </>
    )
}