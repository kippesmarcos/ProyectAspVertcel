import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { addItem, removeItem } = useCart();

  const handleIncreaseQuantity = () => {
    addItem({ ...item });
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      addItem({ ...item, quantity: item.quantity - 1 });
    } else {
      removeItem(item.id);
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'token':
        return 'Tokens';
      case 'key':
        return 'Keys';
      case 'kit':
        return 'Kit';
      case 'rank':
        return 'Rank';
      default:
        return type;
    }
  };

  return (
    <div className="flex items-center gap-4 bg-beige-900/30 rounded-lg p-3">
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
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-beige-100 text-sm truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span 
            className="px-1.5 py-0.5 rounded-full"
            style={{ 
              backgroundColor: `${item.color}20`,
              color: item.color 
            }}
          >
            {getItemTypeLabel(item.type)}
          </span>
          {item.type !== 'key' && item.type !== 'token' && (
            <span className="text-beige-400">
              {item.durationType === 'monthly' ? 'Mensual' : 'Permanente'}
            </span>
          )}
        </div>
      </div>

      <div className="text-right">
        <p className="font-medium text-beige-100 text-sm">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleDecreaseQuantity}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-beige-300 text-xs min-w-[16px] text-center">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleIncreaseQuantity}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-400 hover:text-red-300"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}