import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, StarIcon } from "lucide-react";

interface PerfumeCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  description: string;
  onAddToCart: (perfume: any) => void;
}

export const PerfumeCard = ({ 
  id, 
  name, 
  brand, 
  price, 
  originalPrice, 
  image, 
  rating, 
  description, 
  onAddToCart 
}: PerfumeCardProps) => {
  const perfume = { id, name, brand, price, image, rating, description };
  
  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden bg-gradient-elegant">
          <img 
            src={image} 
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {originalPrice && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({rating})</span>
        </div>
        
        <CardTitle className="text-lg mb-1">{name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3">
          {brand}
        </CardDescription>
        
        <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => onAddToCart(perfume)}
          variant="premium" 
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};
