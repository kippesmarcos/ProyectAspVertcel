import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';

export function SpecialOffer() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center gap-3 mb-8 bg-gradient-to-r from-beige-400/10 to-beige-900/10 p-4 rounded-lg border border-beige-400/10"
    >
      <div className="bg-beige-400/10 p-2 rounded-full">
        <Timer className="w-5 h-5 text-beige-400" />
      </div>
      <div>
        <h3 className="font-medium text-beige-100 mb-0.5">¡Oferta especial!</h3>
        <p className="text-beige-300 text-sm">
          Aprovecha los descuentos por tiempo limitado en todos los tokens
        </p>
      </div>
    </motion.div>
  );
}