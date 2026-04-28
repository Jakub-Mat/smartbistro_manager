import IconLabel from "../atoms/IconLabel.jsx";
import { MdStore, MdLocationOn, MdAccountCircle} from "react-icons/md";
import {useState} from "react";
import ProfileModal from "../atoms/ProfileModal.jsx";

export default function TopBar(){
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    function handleProfileClick() {
        if(isProfileOpen){
            setIsProfileOpen(false);
        }else {
            setIsProfileOpen(true);
        }
    }

    return (
        <>
            <div id="topBar" style={{display: "inline-flex"}}>
                <IconLabel text="Best Bistro Burger" icon={MdStore(undefined)}/>
                <IconLabel text="Jateční 26, Plzeň" icon={MdLocationOn(undefined)}/>
                <div style={{display: "flex", position: "relative" }}>
                    <IconLabel
                        text="Jakub M."
                        icon={MdAccountCircle(undefined)}
                        id="account"
                        onclick={() => handleProfileClick()}/>
                    <ProfileModal isOpen={isProfileOpen} />
                </div>

            </div>
        </>
    )
}