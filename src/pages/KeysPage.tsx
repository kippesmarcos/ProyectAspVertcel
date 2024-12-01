import { useState } from 'react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { Zap, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { keys } from '../data/keys';
import { useCart } from '../context/CartContext';
import { SnowParticles } from '@/components/SnowParticles';
import { StoreModal } from '@/components/ui/store-modal';
import type { Key } from '../types/key';

export function KeysPage() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = (key: Key) => {
    addItem({
      id: key.id,
      name: key.name,
      price: key.price,
      type: 'key',
      durationType: 'permanent',
      icon: key.icon,
      color: key.color,
      quantity: 1
    });
    setSelectedKey(null);
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
              <Zap className="w-8 h-8 text-beige-400" />
              <h1 className="text-4xl font-bold text-beige-100">Perk Keys</h1>
            </div>
            <p className="text-beige-300">Activa beneficios y poderes temporales</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keys.map((key, index) => (
              <motion.div
                key={key.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-black/50 backdrop-blur-lg rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
              >
                <div 
                  className="p-6 text-center relative cursor-pointer"
                  style={{ backgroundColor: `${key.color}10` }}
                  onClick={() => setSelectedKey(key)}
                >
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-white/10 to-transparent" />
                  <img 
                    src={key.icon} 
                    alt={key.name} 
                    className="w-20 h-20 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: key.color }}>
                    {key.name}
                  </h3>
                  <div className="text-3xl font-bold text-beige-100">
                    ${key.price}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-beige-300 mb-4">{key.description}</p>
                  <ul className="space-y-3">
                    {key.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-beige-400 flex-shrink-0" />
                        <span className="text-beige-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => setSelectedKey(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-gradient-to-r from-beige-400 to-beige-500 hover:from-beige-500 hover:to-beige-600 text-black py-3 rounded-lg transition-all duration-300 font-medium"
                  >
                    Ver más detalles
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selectedKey && (
        <StoreModal
          isOpen={true}
          onClose={() => setSelectedKey(null)}
          onAddToCart={() => handleAddToCart(selectedKey)}
          item={selectedKey}
        />
      )}
    </div>
  );
}