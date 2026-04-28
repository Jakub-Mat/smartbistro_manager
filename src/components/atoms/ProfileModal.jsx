import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import './ProfileModal.css'

export default function ProfileModal({ isOpen }) {
    const [userName, setUserName] = useState('jakubm@smartbistro.cz')
    const [password, setPassword] = useState('user1234')
    const [isEmailEditing, setIsEmailEditing] = useState(false)
    const [isPasswordEditing, setIsPasswordEditing] = useState(false)

    const handleEmailToggle = () => {
        setIsEmailEditing((prev) => !prev)
    }

    const handlePasswordToggle = () => {
        setIsPasswordEditing((prev) => !prev)
    }

    if (!isOpen) return null;
    return (
        <div className="profileModalOverlay">
            <div className="profileModalContent" onClick={(e) => e.stopPropagation()}>
                <div className="profileModalHeader">
                    <h2>Správa profilu</h2>
                </div>

                <div className="profileModalBody">
                    <div className="profileField">
                        <div className="profileFieldHeader">
                            <label>Email:</label>
                            <button
                                type="button"
                                className={`editButton ${isEmailEditing ? "editButtonActive" : ""}`}
                                onClick={handleEmailToggle}
                            >
                                <FaEdit />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            disabled={!isEmailEditing}
                        />
                    </div>

                    <div className="profileField">
                        <div className="profileFieldHeader">
                            <label>Heslo:</label>
                            <button
                                type="button"
                                className={`editButton ${isPasswordEditing ? "editButtonActive" : ""}`}
                                onClick={handlePasswordToggle}
                            >
                                <FaEdit />
                            </button>
                        </div>
                        <input
                            type={isPasswordEditing ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={isPasswordEditing ? "editableInput" : ""}
                            disabled={!isPasswordEditing}
                        />
                    </div>
                </div>

                <div className="profileModalFooter">
                    <button className="buttonKiosk">Přepnout na kiosk</button>
                    <button className="buttonLogout">Odhlášení</button>
                </div>
            </div>
        </div>
    );
}