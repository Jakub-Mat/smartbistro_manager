import './App.css'
import SideMenu from "./components/molecules/layout/SideMenu.jsx";
import TopBar from "./components/molecules/layout/TopBar.jsx";
import Content from "./components/molecules/layout/Content.jsx"
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
