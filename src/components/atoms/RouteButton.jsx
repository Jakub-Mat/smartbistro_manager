import './RouteButton.css'

export default function RouteButton({label,icon}) {
    return (
        <button>
            <span id="secIcon">
                {icon}
            </span>
            <span id="secName">
                {label}
            </span>

        </button>
    );
}