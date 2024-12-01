import { useState } from 'react';
import { Header } from '@/components/Header';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { tokens } from '@/data/tokens';
import { useCart } from '@/context/CartContext';
import { SnowParticles } from '@/components/SnowParticles';
import { TokenCard } from '@/components/tokens/TokenCard';
import { TokenModal } from '@/components/tokens/TokenModal';
import { TokensHeader } from '@/components/tokens/TokensHeader';
import { SpecialOffer } from '@/components/tokens/SpecialOffer';
import type { Token } from '@/types/token';

interface SelectedToken extends Token {
  selectedAmount: number;
  selectedPrice: number;
}

export function TokensPage() {
  const [selectedToken, setSelectedToken] = useState<SelectedToken | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = (token: Token, amount: number, price: number) => {
    addItem({
      id: `${token.id}-${amount}`,
      name: `${token.name} x${amount}`,
      price,
      type: 'token', // Changed from 'key' to 'token'
      durationType: 'permanent',
      icon: token.icon,
      color: token.color,
      quantity: 1
    });
    setSelectedToken(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/images/background/hcf-background.webp')",
          filter: "brightness(0.3)"
        }}
      />

      <SnowParticles />
      <Header />

      <div className="relative pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-beige-300 hover:text-beige-100 mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver al inicio
          </Link>

          <TokensHeader />
          <SpecialOffer />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                onSelectToken={(token, amount, price) => 
                  setSelectedToken({ ...token, selectedAmount: amount, selectedPrice: price })
                }
              />
            ))}
          </div>
        </div>
      </div>

      {selectedToken && (
        <TokenModal
          token={selectedToken}
          onClose={() => setSelectedToken(null)}
          onAddToCart={() => handleAddToCart(selectedToken, selectedToken.selectedAmount, selectedToken.selectedPrice)}
        />
      )}
    </div>
  );
}