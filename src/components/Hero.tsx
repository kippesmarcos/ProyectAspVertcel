import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedText } from './AnimatedText';
import { SnowParticles } from './SnowParticles';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
      
      {/* Animated background image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/images/background/hcf-background.webp')`
        }}
      />
      
      {/* Snow particles */}
      <SnowParticles />
      
      {/* Main content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 pt-20">
        <h1 className="text-7xl font-bold text-white mb-4">
          <AnimatedText text="Somos" delay={0.2} />
          <br />
          <AnimatedText text="Aspirados" className="text-beige-400" delay={0.4} />
          <br />
          <AnimatedText text="Somos" delay={0.6} />
          <br />
          <AnimatedText text="HCF" className="text-beige-400" delay={0.8} />
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-beige-300 text-xl mb-8"
        >
          El mejor servidor de Minecraft HardCore Factions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="inline-flex items-center gap-2 bg-beige-400 hover:bg-beige-500 text-black px-6 py-3 rounded-lg transition"
          >
            Conectar al Servidor <ExternalLink className="w-4 h-4" />
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://discord.gg/nXAN3NSQ"
            className="inline-flex items-center gap-2 bg-beige-900/10 hover:bg-beige-900/20 text-beige-100 px-6 py-3 rounded-lg transition"
          >
            Discord <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}