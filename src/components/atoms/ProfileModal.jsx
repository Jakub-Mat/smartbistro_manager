import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import './ProfileModal.css'

export default function ProfileModal({ isOpen, onClose }) {
    const location = useLocation()
    const navigate = useNavigate()
    const modalContentRef = useRef(null)
    const isKioskRoute = location.pathname.startsWith('/kiosk')
    const switchButtonLabel = isKioskRoute ? 'Přepnout na manažera' : 'Přepnout na kiosk'
    const switchTargetRoute = isKioskRoute ? '/dashboard' : '/kiosk'
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

    useEffect(() => {
        if (!isOpen) return

        const handleOutsideClick = (event) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [isOpen, onClose])

    if (!isOpen) return null;
    return (
        <div className="profileModalOverlay">
            <div ref={modalContentRef} className="profileModalContent" onClick={(e) => e.stopPropagation()}>
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
                    <button
                        className="buttonKiosk"
                        onClick={() => {
                            onClose()
                            navigate(switchTargetRoute)
                        }}
                    >
                        {switchButtonLabel}
                    </button>
                    <button className="buttonLogout">Odhlášení</button>
                </div>
            </div>
        </div>
    );
}