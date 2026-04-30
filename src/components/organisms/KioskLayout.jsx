import { Outlet } from 'react-router-dom'
import TopBar from '../molecules/TopBar.jsx'
import './KioskLayout.css'

export default function KioskLayout() {
  return (
    <div id="kiosk-layout">
      <TopBar/>
      <Outlet/>
    </div>
  )
}


