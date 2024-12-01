import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingCart } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import { PaymentSection } from '@/components/checkout/payment-section';

type PaymentMethod = 'card' | 'paypal' | null;

interface FormData {
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  if (cart.items.length === 0) {
    navigate('/');
    return null;
  }

  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.21;
  const finalTotal = total + tax;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'paypal') {
        window.location.href = 'https://www.paypal.com/checkoutnow';
        return;
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('¡Pago procesado con éxito!');
      navigate('/');
    } catch (error) {
      alert('Error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <CreditCard className="w-8 h-8 text-beige-400" />
              <h1 className="text-4xl font-bold text-beige-100">Checkout</h1>
            </div>
            <p className="text-beige-300">Completa tu compra de manera segura</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-beige-100 mb-4">Resumen de la orden</h2>
              <div className="bg-beige-900/30 rounded-lg p-4 space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <img 
                        src={item.icon} 
                        alt={item.name} 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-beige-100">{item.name}</h3>
                      <p className="text-sm text-beige-400">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-beige-100">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-beige-800/30 pt-4 space-y-2">
                  <div className="flex justify-between text-beige-300">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-beige-300">
                    <span>IVA (21%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-beige-100 text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <PaymentSection
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onSubmit={handlePayment}
              isProcessing={isProcessing}
              formData={formData}
              setFormData={setFormData}
              total={finalTotal}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}