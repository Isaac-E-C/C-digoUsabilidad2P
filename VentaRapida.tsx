
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Search, Plus, Minus, ShoppingCart, Trash2, User } from "lucide-react";
import { Link } from "react-router-dom";

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  stock: number;
  codigo: string;
}

interface ProductoVenta {
  producto: Producto;
  cantidad: number;
}

interface Cliente {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
}

export default function VentaRapida() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCliente, setSelectedCliente] = useState("");
  const [carrito, setCarrito] = useState<ProductoVenta[]>([]);

  // Datos simulados
  const productos: Producto[] = [
    { id: 1, nombre: "Chanel No. 5", marca: "Chanel", precio: 120.00, stock: 15, codigo: "CH-001" },
    { id: 2, nombre: "Sauvage", marca: "Dior", precio: 85.00, stock: 8, codigo: "DI-002" },
    { id: 3, nombre: "Black Orchid", marca: "Tom Ford", precio: 150.00, stock: 5, codigo: "TF-003" },
    { id: 4, nombre: "Versace Eros", marca: "Versace", precio: 75.00, stock: 12, codigo: "VE-004" },
    { id: 5, nombre: "La Vie Est Belle", marca: "Lancôme", precio: 95.00, stock: 7, codigo: "LA-005" },
  ];

  const clientes: Cliente[] = [
    { id: 1, nombre: "Juan Pérez", cedula: "1234567890", email: "juan@email.com" },
    { id: 2, nombre: "María González", cedula: "0987654321", email: "maria@email.com" },
    { id: 3, nombre: "Carlos López", cedula: "1122334455", email: "carlos@email.com" },
  ];

  // Filtrar productos por búsqueda
  const productosFiltered = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones del carrito
  const agregarAlCarrito = (producto: Producto) => {
    const existeEnCarrito = carrito.find(item => item.producto.id === producto.id);
    
    if (existeEnCarrito) {
      if (existeEnCarrito.cantidad >= producto.stock) {
        toast({
          title: "Stock insuficiente",
          description: `Solo hay ${producto.stock} unidades disponibles`,
          variant: "destructive"
        });
        return;
      }
      
      setCarrito(prev => prev.map(item =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito(prev => [...prev, { producto, cantidad: 1 }]);
    }

    toast({
      title: "Producto agregado",
      description: `${producto.nombre} agregado al carrito`
    });
  };

  const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }

    const producto = productos.find(p => p.id === productoId);
    if (producto && nuevaCantidad > producto.stock) {
      toast({
        title: "Stock insuficiente",
        description: `Solo hay ${producto.stock} unidades disponibles`,
        variant: "destructive"
      });
      return;
    }

    setCarrito(prev => prev.map(item =>
      item.producto.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const eliminarDelCarrito = (productoId: number) => {
    setCarrito(prev => prev.filter(item => item.producto.id !== productoId));
  };

  // Cálculos
  const subtotal = carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
  const iva = subtotal * 0.15; // 15% IVA
  const total = subtotal + iva;

  const procesarVenta = () => {
    if (carrito.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos al carrito antes de procesar la venta",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCliente) {
      toast({
        title: "Cliente requerido",
        description: "Selecciona un cliente para procesar la venta",
        variant: "destructive"
      });
      return;
    }

    // Simular procesamiento de venta
    console.log("Procesando venta:", { cliente: selectedCliente, productos: carrito, total });
    
    toast({
      title: "¡Venta procesada!",
      description: `Venta por $${total.toFixed(2)} procesada exitosamente`
    });

    // Limpiar carrito
    setCarrito([]);
    setSelectedCliente("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Venta Rápida</h1>
          <p className="text-muted-foreground">Procesa ventas de manera ágil y eficiente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de productos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Búsqueda de productos */}
          <Card>
            <CardHeader>
              <CardTitle>Buscar Productos</CardTitle>
              <CardDescription>Encuentra productos por nombre, marca o código</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lista de productos */}
          <Card>
            <CardHeader>
              <CardTitle>Productos Disponibles</CardTitle>
              <CardDescription>
                Mostrando {productosFiltered.length} productos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {productosFiltered.map((producto) => (
                  <div key={producto.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{producto.nombre}</h3>
                        <Badge variant="secondary" className="text-xs">{producto.codigo}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{producto.marca}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="font-medium">${producto.precio.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground">Stock: {producto.stock}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={producto.stock === 0}
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel del carrito */}
        <div className="space-y-6">
          {/* Selección de cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedCliente} onValueChange={setSelectedCliente}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id.toString()}>
                      {cliente.nombre} - {cliente.cedula}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cliente
              </Button>
            </CardContent>
          </Card>

          {/* Carrito de compras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Carrito de Compras
              </CardTitle>
            </CardHeader>
            <CardContent>
              {carrito.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  El carrito está vacío.<br />
                  Agrega productos para comenzar.
                </p>
              ) : (
                <div className="space-y-4">
                  {carrito.map((item) => (
                    <div key={item.producto.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.producto.nombre}</h4>
                          <p className="text-xs text-muted-foreground">{item.producto.marca}</p>
                          <p className="text-sm">${item.producto.precio.toFixed(2)} c/u</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => eliminarDelCarrito(item.producto.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => actualizarCantidad(item.producto.id, item.cantidad - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => actualizarCantidad(item.producto.id, parseInt(e.target.value) || 0)}
                          className="w-16 text-center"
                          min="1"
                          max={item.producto.stock}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => actualizarCantidad(item.producto.id, item.cantidad + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-medium ml-auto">
                          ${(item.producto.precio * item.cantidad).toFixed(2)}
                        </span>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumen de venta */}
          {carrito.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Venta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (15%):</span>
                  <span>${iva.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={procesarVenta}
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Procesar Venta
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
