import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "./components/organisms/AppLayout.jsx";
import DashboardPage from "./components/pages/DashboardPage.jsx";
import AnalysisPage from "./components/pages/AnalysisPage.jsx";
import MenuPage from "./components/pages/MenuPage.jsx";
import StockManagementPage from "./components/pages/StockManagementPage.jsx";


// TODO(storage-refactor):
// 1) Přesunout localStorage keys do src/utils/storage.js
// 2) Přidat safe JSON parse helper
// 3) Nahradit přímé localStorage.getItem/setItem ve stránkách helper funkcemi

function App() {

  return (
    <Routes>
      <Route element={<AppLayout/>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/analysis" element={<AnalysisPage/>} />
          <Route path="/menu" element={<MenuPage/>} />
          <Route path="/stock" element={<StockManagementPage/>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
