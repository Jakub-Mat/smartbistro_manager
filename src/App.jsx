import './App.css'
import SideMenu from "./components/SideMenu.jsx";
import TopBar from "./components/TopBar.jsx";
import Content from "./components/Content.jsx"
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
