import { useState } from 'react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { Sword, ChevronLeft, Clock, Crown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { kits } from '../data/kits';
import type { Kit } from '../types/kit';
import { useCart } from '../context/CartContext';
import { SnowParticles } from '@/components/SnowParticles';

export function KitsPage() {
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [durationType, setDurationType] = useState<'permanent' | 'monthly'>('permanent');
  const { addItem } = useCart();

  const handleAddToCart = (kit: Kit) => {
    addItem({
      id: `${kit.id}-${durationType}`,
      name: kit.name,
      price: kit.price[durationType],
      type: 'kit',
      durationType,
      icon: kit.icon,
      color: kit.color,
      quantity: 1
    });
    setSelectedKit(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/background/hcf-background.webp')",
          filter: "brightness(0.3)"
        }}
      />

      <SnowParticles />

      <Header />

      <div className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
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
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sword className="w-8 h-8 text-beige-400" />
              <h1 className="text-4xl font-bold text-beige-100">Kits</h1>
            </div>
            <p className="text-beige-300">Equípate con los mejores kits del servidor</p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setDurationType('permanent')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                durationType === 'permanent'
                  ? 'bg-beige-400 text-black'
                  : 'bg-beige-900/50 text-beige-300'
              }`}
            >
              <Crown className="w-5 h-5" />
              Permanente
            </button>
            <button
              onClick={() => setDurationType('monthly')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                durationType === 'monthly'
                  ? 'bg-beige-400 text-black'
                  : 'bg-beige-900/50 text-beige-300'
              }`}
            >
              <Clock className="w-5 h-5" />
              Mensual
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kits.map((kit, index) => (
              <motion.div
                key={kit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-beige-900/50 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <div 
                  className="p-6 text-center relative cursor-pointer"
                  style={{ backgroundColor: `${kit.color}15` }}
                  onClick={() => setSelectedKit(kit)}
                >
                  <div className="absolute inset-0 opacity-10" 
                    style={{ 
                      backgroundImage: `linear-gradient(to bottom right, ${kit.color}, transparent)` 
                    }} 
                  />
                  <img 
                    src={kit.icon} 
                    alt={kit.name} 
                    className="w-24 h-24 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: kit.color }}>
                    {kit.name}
                  </h3>
                  <div className="text-3xl font-bold text-beige-100">
                    ${kit.price[durationType]}
                    {durationType === 'monthly' && <span className="text-sm text-beige-400">/mes</span>}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-beige-300 mb-4">{kit.description}</p>
                  <ul className="space-y-3">
                    {kit.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-beige-400 flex-shrink-0" />
                        <span className="text-beige-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => setSelectedKit(kit)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-beige-400 hover:bg-beige-500 text-black py-3 rounded-lg transition-all duration-300 font-medium"
                  >
                    Ver más detalles
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selectedKit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedKit(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-beige-900/90 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div 
              className="p-6 text-center relative border-b border-beige-800"
              style={{ backgroundColor: `${selectedKit.color}15` }}
            >
              <img 
                src={selectedKit.icon} 
                alt={selectedKit.name} 
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold mb-2" style={{ color: selectedKit.color }}>
                {selectedKit.name}
              </h3>
              <div className="text-3xl font-bold text-beige-100">
                ${selectedKit.price[durationType]}
                {durationType === 'monthly' && <span className="text-sm text-beige-400">/mes</span>}
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold text-beige-100 mb-4">Contenido del kit:</h4>
              <ul className="space-y-3 mb-6">
                {selectedKit.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-beige-400 flex-shrink-0" />
                    <span className="text-beige-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => handleAddToCart(selectedKit)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-beige-400 hover:bg-beige-500 text-black py-3 rounded-lg transition-all duration-300 font-medium"
              >
                Agregar al carrito
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}