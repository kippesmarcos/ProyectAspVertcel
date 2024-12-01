import { ShoppingCart, Trash2, CreditCard, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';
import { CartItem } from './CartItem';
import { PaymentMethods } from './PaymentMethods';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function CartSheet() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.21; // 21% IVA
  const finalTotal = total + tax;
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.items.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-beige-400 text-xs flex items-center justify-center text-black font-medium"
            >
              {itemCount}
            </motion.span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 overflow-hidden bg-black border-l border-beige-900/50">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-beige-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-beige-900/30 p-2 rounded-xl">
                  <ShoppingCart className="w-5 h-5 text-beige-400" />
                </div>
                <div>
                  <SheetTitle className="text-lg font-semibold text-beige-100">Tu Carrito</SheetTitle>
                  <p className="text-sm text-beige-400">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <SheetClose className="rounded-lg p-2 hover:bg-beige-900/30 transition-colors">
                <svg className="w-5 h-5 text-beige-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </SheetClose>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-beige-900/20 p-8 rounded-2xl"
                >
                  <Package className="h-16 w-16 text-beige-400 mx-auto mb-4" />
                  <p className="text-beige-100 text-lg font-medium">Tu carrito está vacío</p>
                  <p className="text-beige-400 text-sm mt-2">
                    Agrega algunos items para comenzar
                  </p>
                </motion.div>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                <AnimatePresence>
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                    >
                      <CartItem item={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-beige-900/50">
              {/* Payment Methods */}
              <PaymentMethods />

              {/* Summary */}
              <div className="p-6 bg-beige-900/20 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-beige-400">Subtotal</span>
                    <span className="text-beige-100">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-beige-400">IVA (21%)</span>
                    <span className="text-beige-100">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-beige-900/50 flex justify-between">
                    <span className="text-beige-100 font-medium">Total</span>
                    <span className="text-xl font-bold text-beige-100">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={clearCart}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vaciar
                  </Button>
                  <SheetClose asChild>
                    <Button 
                      className="w-full bg-beige-400 hover:bg-beige-500 text-black"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagar
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}