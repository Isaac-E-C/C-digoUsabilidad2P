import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash, Plus, Minus, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export const ShoppingCart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <Card className="bg-gradient-elegant">
        <CardContent className="p-8 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
          <p className="text-muted-foreground">Agrega algunos perfumes para comenzar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Carrito de Compras
          <Badge variant="secondary">{items.length}</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-soft">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            
            <div className="flex-1">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.brand}</p>
              <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              
              <Button
                size="icon"
                variant="outline"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
              
              <Button
                size="icon"
                variant="destructive"
                onClick={() => onRemoveItem(item.id)}
                className="h-8 w-8 ml-2"
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Impuestos:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío:</span>
            <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          onClick={onCheckout}
          variant="premium"
          size="lg"
          className="w-full mt-6"
        >
          Proceder al Pago
        </Button>
      </CardContent>
    </Card>
  );
};
