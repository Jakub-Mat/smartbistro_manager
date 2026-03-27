import './App.css'
import SideMenu from "./components/SideMenu.jsx";
import TopBar from "./components/TopBar.jsx";
function App() {

  return (
    <>
      <div id="layout-grid">
        <SideMenu/>
        <TopBar/>
        <div id="content">content</div>
      </div>
    </>
  )
}

export default App
