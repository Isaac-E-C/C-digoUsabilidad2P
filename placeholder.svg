import { useState } from "react";
import { PerfumeCard } from "@/components/PerfumeCard";
import { ShoppingCart } from "@/components/ShoppingCart";
import { BillingForm } from "@/components/BillingForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import perfume images
import perfume1 from "@/assets/perfume1.jpg";
import perfume2 from "@/assets/perfume2.jpg";  
import perfume3 from "@/assets/perfume3.jpg";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

const perfumes = [
  {
    id: 1,
    name: "Elegancia Dorada",
    brand: "Luxury Scents",
    price: 89.99,
    originalPrice: 129.99,
    image: perfume1,
    rating: 5,
    description: "Una fragancia sofisticada con notas florales y cítricas, perfecta para ocasiones especiales."
  },
  {
    id: 2,
    name: "Rosa Diamante",
    brand: "Premium Collection",
    price: 75.50,
    originalPrice: 99.99,
    image: perfume2,
    rating: 4,
    description: "Fragancia femenina y elegante con esencia de rosa búlgara y toques de vainilla."
  },
  {
    id: 3,
    name: "Noir Luxe",
    brand: "Elite Fragrances",
    price: 125.00,
    image: perfume3,
    rating: 5,
    description: "Perfume unisex con notas amaderadas y especiadas, ideal para personalidades fuertes."
  },
  {
    id: 4,
    name: "Amanecer Dorado",
    brand: "Luxury Scents",
    price: 95.75,
    originalPrice: 120.00,
    image: perfume1,
    rating: 4,
    description: "Fragancia fresca y energizante con cítricos y notas marinas."
  },
  {
    id: 5,
    name: "Jardín Secreto",
    brand: "Premium Collection",
    price: 68.99,
    image: perfume2,
    rating: 5,
    description: "Combinación perfecta de flores primaverales y frutas tropicales."
  },
  {
    id: 6,
    name: "Medianoche",
    brand: "Elite Fragrances",
    price: 110.50,
    originalPrice: 140.00,
    image: perfume3,
    rating: 4,
    description: "Fragancia misteriosa con notas de oud, ámbar y especias orientales."
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<'products' | 'cart' | 'billing'>('products');
  const { toast } = useToast();

  const addToCart = (perfume: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === perfume.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...perfume, quantity: 1 }];
    });
    
    toast({
      title: "Producto agregado",
      description: `${perfume.name} se agregó al carrito`,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó del carrito",
    });
  };

  const handleCheckout = () => {
    setCurrentView('billing');
  };

  const handleBillingSubmit = (billingData: any) => {
    console.log('Billing data:', billingData);
    toast({
      title: "¡Pedido procesado!",
      description: "Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación.",
    });
    setCartItems([]);
    setCurrentView('products');
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 15;
    return subtotal + tax + shipping;
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-elegant shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Perfumería Elegante
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant={currentView === 'products' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('products')}
              >
                Productos
              </Button>
              
              <Button
                variant={currentView === 'cart' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('cart')}
                className="relative"
              >
                <ShoppingBag className="h-4 w-4" />
                Carrito
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'products' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Colección Premium</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Descubre nuestra exclusiva selección de fragancias de lujo, 
                cuidadosamente seleccionadas para tu elegancia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {perfumes.map((perfume) => (
                <PerfumeCard
                  key={perfume.id}
                  {...perfume}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Tu Selección</h2>
            <ShoppingCart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onCheckout={handleCheckout}
            />
          </div>
        )}

        {currentView === 'billing' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h2>
            <BillingForm
              total={getTotalPrice()}
              onSubmit={handleBillingSubmit}
              onBack={() => setCurrentView('cart')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-elegant mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Perfumería Elegante. Fragancias de lujo para momentos especiales.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
