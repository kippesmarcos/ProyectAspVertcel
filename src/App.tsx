import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { RanksPage } from './pages/RanksPage';
import { KitsPage } from './pages/KitsPage';
import { KeysPage } from './pages/KeysPage';
import { TokensPage } from './pages/TokensPage';
import { PurchaseHistory } from './pages/PurchaseHistory';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ranks" element={<RanksPage />} />
            <Route path="/kits" element={<KitsPage />} />
            <Route path="/keys" element={<KeysPage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}