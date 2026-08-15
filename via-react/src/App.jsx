import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Shop = lazy(() => import('./pages/Shop'))
const NewArrivals = lazy(() => import('./pages/NewArrivals'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Product = lazy(() => import('./pages/Product'))
const Checkout = lazy(() => import('./pages/Checkout'))
const BuyNowCheckout = lazy(() => import('./pages/BuyNowCheckout'))
const Shipping = lazy(() => import('./pages/Shipping'))
const Exchange = lazy(() => import('./pages/Exchange'))
const CareGuide = lazy(() => import('./pages/CareGuide'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))
const FAQs = lazy(() => import('./pages/FAQs'))

function PageFallback() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid rgba(197, 160, 89, 0.2)',
          borderTopColor: 'var(--secondary, #c5a059)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/buy-now/:productId" element={<BuyNowCheckout />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/care-guide" element={<CareGuide />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
