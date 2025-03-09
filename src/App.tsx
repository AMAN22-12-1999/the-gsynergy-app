import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../src/components/Layout'
import StoresPage from '../src/pages/StoresPage'
import SKUsPage from '../src/pages/SKUsPage'
import PlanningPage from '../src/pages/PlanningPage'
import ChartPage from '../src/pages/ChartPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/stores" />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/skus" element={<SKUsPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Layout>
  )
}

export default App
