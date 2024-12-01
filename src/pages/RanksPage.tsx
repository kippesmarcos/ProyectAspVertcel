import { useState } from 'react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { Crown, Zap, Clock, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SnowParticles } from '@/components/SnowParticles';
import { ranks } from '../data/ranks';

export function RanksPage() {
  const [selectedRank, setSelectedRank] = useState<null | typeof ranks[0]>(null);
  const [durationType, setDurationType] = useState<'permanent' | 'monthly'>('permanent');
  const { addItem } = useCart();

  const handleAddToCart = (rank: typeof ranks[0]) => {
    addItem({
      id: `${rank.id}-${durationType}`,
      name: rank.name,
      price: rank.price[durationType],
      type: 'rank',
      durationType,
      icon: rank.icon,
      color: rank.color,
      quantity: 1
    });
    setSelectedRank(null);
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
              <Crown className="w-8 h-8 text-beige-400" />
              <h1 className="text-4xl font-bold text-beige-100">Ranks</h1>
            </div>
            <p className="text-beige-300">Mejora tu experiencia con beneficios exclusivos</p>
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
            {ranks.map((rank, index) => (
              <motion.div
                key={rank.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-beige-900/50 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <div 
                  className="p-6 text-center relative cursor-pointer"
                  style={{ backgroundColor: `${rank.color}15` }}
                  onClick={() => setSelectedRank(rank)}
                >
                  <div className="absolute inset-0 opacity-10" 
                    style={{ 
                      backgroundImage: `linear-gradient(to bottom right, ${rank.color}, transparent)` 
                    }} 
                  />
                  <div 
                    className="w-24 h-24 mx-auto mb-4"
                    style={{ color: rank.color }}
                    dangerouslySetInnerHTML={{ __html: decodeURIComponent(rank.icon.split(',')[1]) }}
                  />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: rank.color }}>
                    {rank.name}
                  </h3>
                  <div className="text-3xl font-bold text-beige-100">
                    ${rank.price[durationType]}
                    {durationType === 'monthly' && <span className="text-sm text-beige-400">/mes</span>}
                  </div>
                </div>

                <div className="p-6">
                  <ul className="space-y-3">
                    {rank.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-beige-400 flex-shrink-0" />
                        <span className="text-beige-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => setSelectedRank(rank)}
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

      {selectedRank && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRank(null)}
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
              style={{ backgroundColor: `${selectedRank.color}15` }}
            >
              <div 
                className="w-24 h-24 mx-auto mb-4"
                style={{ color: selectedRank.color }}
                dangerouslySetInnerHTML={{ __html: decodeURIComponent(selectedRank.icon.split(',')[1]) }}
              />
              <h3 className="text-2xl font-bold mb-2" style={{ color: selectedRank.color }}>
                {selectedRank.name}
              </h3>
              <div className="text-3xl font-bold text-beige-100">
                ${selectedRank.price[durationType]}
                {durationType === 'monthly' && <span className="text-sm text-beige-400">/mes</span>}
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold text-beige-100 mb-4">Beneficios incluidos:</h4>
              <ul className="space-y-3 mb-6">
                {selectedRank.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-beige-400 flex-shrink-0" />
                    <span className="text-beige-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => handleAddToCart(selectedRank)}
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