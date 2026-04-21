import './App.css'
import SideMenu from "./components/molecules/SideMenu.jsx";
import TopBar from "./components/molecules/TopBar.jsx";
import Content from "./components/molecules/Content.jsx"



function App() {

  return (
    <>
      <div id="layout-grid">
        <SideMenu/>
        <TopBar/>
        <Content/>
      </div>
    </>
  )
}

export default App
