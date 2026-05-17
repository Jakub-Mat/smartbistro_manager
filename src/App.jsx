import './App.css'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { seedLocalStorage } from './utils/storage.js'
import AppLayout from "./components/organisms/AppLayout.jsx";
import KioskLayout from "./components/organisms/KioskLayout.jsx";
import DashboardPage from "./components/pages/DashboardPage.jsx";
import AnalysisPage from "./components/pages/AnalysisPage.jsx";
import MenuPage from "./components/pages/MenuPage.jsx";
import StockManagementPage from "./components/pages/StockManagementPage.jsx";
import KioskPage from "./components/pages/KioskPage.jsx";

// TODO: RESPONSIBILITA

// TODO: Debugging: - DONE
// ⦁	Aktualizovat finační stav - DONE
// ⦁	Špatně zobrazené PDF - DONE
// ⦁	Aktualizovat po přidání objednávky věci (graf,tabulky) - DONE
// ⦁	V jídelním lístku minus at odebere produkt v burgru - DONE
// ⦁	Pod=červená - DONE
// ⦁	Na=orandžová -DONE
// ⦁	Nad=zelená - DONE
// ⦁	Řadit objednávky od nejnovějších - DONE
// ⦁	Upravit nadpis grafu - DONE

function App() {
  // Seed localStorage s mock daty při prvním spuštění aplikace
  useEffect(() => {
    seedLocalStorage()
  }, [])

  return (
    <Routes>
      {/* Admin panel */}
      <Route element={<AppLayout/>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/analysis" element={<AnalysisPage/>} />
          <Route path="/menu" element={<MenuPage/>} />
          <Route path="/stock" element={<StockManagementPage/>} />
      </Route>

      {/* Kiosk - customer ordering */}
      <Route element={<KioskLayout/>}>
          <Route path="/kiosk" element={<KioskPage/>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
