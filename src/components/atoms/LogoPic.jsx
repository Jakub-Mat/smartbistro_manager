import logo from '../../assets/LogoSmarBistro.png'
export default function logoPic() {
    return (
        <>
            <div style={{textAlign: "center"}}>
                <img
                    src={logo}
                    alt="Logo fiktivní společnosti"
                    style={{width: "auto", height: "125px", paddingTop: "10px", paddingBottom: "10px"}}
                />
            </div>
        </>
    );
}