import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Games from './pages/Games'
import GameDetail from './pages/GameDetail'
import Controllers from './pages/Controllers'
import ControllerDetail from './pages/ControllerDetail'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Admin from './pages/Admin'
import Library from './pages/Library'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Bundles from './pages/Bundles'
import BundleDetail from './pages/BundleDetail'
import Book from './pages/Book'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <div className="flex min-h-screen flex-col bg-surface-900 text-gray-100">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/bundles" element={<Bundles />} />
                <Route path="/bundles/:id" element={<BundleDetail />} />
                <Route path="/book" element={<Book />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:id" element={<GameDetail />} />
                <Route path="/controllers" element={<Controllers />} />
                <Route path="/controllers/:id" element={<ControllerDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:id" element={<OrderSuccess />} />
                <Route path="/library" element={<Library />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
