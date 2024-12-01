import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { History, ShoppingBag, ChevronLeft } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export function PurchaseHistory() {
  const { user } = useAuth();
  const { cart } = useCart();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-beige-300 hover:text-beige-100 mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver al inicio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <History className="w-8 h-8 text-beige-400" />
              <h1 className="text-4xl font-bold text-beige-100">Historial de Compras</h1>
            </div>
            <p className="text-beige-300">Revisa todas tus compras realizadas en el servidor</p>
          </motion.div>

          {cart.items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-16 h-16 text-beige-400 mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-medium text-beige-100 mb-2">
                No hay compras realizadas
              </h2>
              <p className="text-beige-400">
                Tus compras aparecerán aquí una vez que hayas realizado alguna transacción.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Purchase history items will be rendered here when available */}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}