import './IconLabel.css'
export default function IconLabel({text, icon, onclick, id}){

    return (
        <>
            <div id={id} onClick={onclick} className="viewBox">
                <span id="icon">
                    {icon}
                </span>
                <span id="label">
                    {text}
                </span>
            </div>
        </>
    )
}