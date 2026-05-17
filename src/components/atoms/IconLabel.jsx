import './IconLabel.css'
export default function IconLabel({text, icon, onclick, id}){

    return (
        <>
            <div id={id} onClick={onclick} className="viewBox iconLabel">
                <span className="iconLabelIcon">
                    {icon}
                </span>
                <span className="iconLabelLabel">
                    {text}
                </span>
            </div>
        </>
    )
}