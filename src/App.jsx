import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Login from './components/Login'
import Banner from './pages/Banner'
import BannerTable from './pages/BannerTable'
import Notification from './pages/Notification'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="notification" element={<Notification />} />

                    <Route path="products" element={<Products />} />
                    <Route path="banner" element={<Banner />} />
                    <Route path="bannerList" element={<BannerTable />} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
