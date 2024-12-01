import { Users, ShoppingCart, Trophy } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: Users,
    value: 15000,
    label: "Jugadores Registrados",
    delay: 0.3
  },
  {
    icon: ShoppingCart,
    value: 2500,
    label: "Compras Realizadas",
    delay: 0.4
  },
  {
    icon: Trophy,
    value: 500,
    label: "Facciones Activas",
    delay: 0.5
  }
];

export function Stats() {
  return (
    <div className="bg-black text-beige-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-2"
        >
          Hacemos las cosas mejor.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-beige-400 text-center mb-12"
        >
          Y no te lo decimos nosotros, te lo dicen los números.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay }}
              whileHover={{ scale: 1.05 }}
              className="bg-beige-900/5 p-6 rounded-lg text-center transform transition-all duration-300 hover:bg-beige-900/10"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay + 0.2, type: "spring" }}
              >
                <stat.icon className="w-8 h-8 text-beige-500 mx-auto mb-4" />
              </motion.div>
              <div className="text-3xl font-bold text-beige-500 relative">
                <span className="absolute -left-4">+</span>
                <AnimatedCounter from={0} to={stat.value} duration={2.5} />
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay + 0.4 }}
                className="text-beige-400"
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}