import { motion } from 'framer-motion';
import { Crown, Sparkles, Key, Coins, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StaffSection } from './StaffSection';
import { Container } from './ui/container';

const categories = [
  { icon: Crown, label: 'Ranks', href: '/ranks', isRoute: true },
  { icon: Sparkles, label: 'Kits', href: '/kits', isRoute: true },
  { icon: Key, label: 'Keys', href: '/keys', isRoute: true },
  { icon: Coins, label: 'Tokens', href: '/tokens', isRoute: true }
];

const paymentMethods = [
  { 
    name: 'PayPal',
    icon: '/images/payments/paypal.svg'
  },
  { 
    name: 'Visa',
    icon: '/images/payments/visa.svg'
  },
  { 
    name: 'Mastercard',
    icon: '/images/payments/mastercard.svg'
  },
  { 
    name: 'American Express',
    icon: '/images/payments/amex.svg'
  }
];

export function Store() {
  return (
    <>
      <div id="store" className="bg-black text-beige-100 py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {categories.map((category, index) => {
              const CategoryWrapper = category.isRoute ? Link : 'a';
              
              return (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CategoryWrapper
                    to={category.href}
                    href={!category.isRoute ? category.href : undefined}
                    className="group block bg-beige-900/50 backdrop-blur-lg p-6 rounded-xl hover:bg-beige-800/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-beige-800/50 p-3 rounded-lg group-hover:bg-beige-700/50 transition-all duration-300">
                        <category.icon className="w-6 h-6 text-beige-100" />
                      </div>
                      <div>
                        <span className="text-lg font-medium block">{category.label}</span>
                      </div>
                    </div>
                  </CategoryWrapper>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-beige-900/30 to-black backdrop-blur-lg rounded-xl p-8 mb-16"
          >
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '50px' }} />
            </div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ShieldCheck className="w-6 h-6 text-beige-400" />
                  <h3 className="text-2xl font-bold text-beige-100">Pagos Seguros</h3>
                </div>
                <p className="text-beige-300">Aceptamos múltiples métodos de pago para tu comodidad</p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-beige-900/20 rounded-lg transform -skew-x-12 group-hover:bg-beige-900/30 transition-all duration-300" />
                    <div className="relative px-6 py-4">
                      <img 
                        src={method.icon} 
                        alt={method.name}
                        className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter brightness-0 invert"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
      <StaffSection />
    </>
  );
}