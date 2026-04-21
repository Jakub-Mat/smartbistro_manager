import { Outlet } from 'react-router-dom'
import SideMenu from '../molecules/SideMenu.jsx'
import TopBar from '../molecules/TopBar.jsx'
import '../pages/Content.css'


export default function AppLayout() {
  return (
      <>
          <div id="layout-grid">
              <SideMenu/>
              <TopBar/>
              <Outlet/>
          </div>
      </>
  )
}