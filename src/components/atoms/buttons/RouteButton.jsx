import './RouteButton.css'

export default function RouteButton({label,icon,onClick}) {
    return (
        <button onClick={onClick}>
            <span id="secIcon">
                {icon}
            </span>
            <span id="secName">
                {label}
            </span>

        </button>
    );
}