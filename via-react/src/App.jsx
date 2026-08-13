import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import NewArrivals from './pages/NewArrivals'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Shipping from './pages/Shipping'
import Exchange from './pages/Exchange'
import CareGuide from './pages/CareGuide'
import TrackOrder from './pages/TrackOrder'
import FAQs from './pages/FAQs'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/care-guide" element={<CareGuide />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
