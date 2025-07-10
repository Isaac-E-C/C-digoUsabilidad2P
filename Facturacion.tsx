
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Search, Plus, Minus, FileText, Printer, Download, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  stock: number;
  codigo: string;
}

interface ProductoFactura {
  producto: Producto;
  cantidad: number;
}

interface Cliente {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  direccion: string;
}

export default function Facturacion() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCliente, setSelectedCliente] = useState("");
  const [productos, setProductos] = useState<ProductoFactura[]>([]);
  const [numeroFactura, setNumeroFactura] = useState("FAC-001234");
  const [showPreview, setShowPreview] = useState(false);

  // Datos simulados
  const productosDisponibles: Producto[] = [
    { id: 1, nombre: "Chanel No. 5", marca: "Chanel", precio: 120.00, stock: 15, codigo: "CH-001" },
    { id: 2, nombre: "Sauvage", marca: "Dior", precio: 85.00, stock: 8, codigo: "DI-002" },
    { id: 3, nombre: "Black Orchid", marca: "Tom Ford", precio: 150.00, stock: 5, codigo: "TF-003" },
    { id: 4, nombre: "Versace Eros", marca: "Versace", precio: 75.00, stock: 12, codigo: "VE-004" },
    { id: 5, nombre: "La Vie Est Belle", marca: "Lancôme", precio: 95.00, stock: 7, codigo: "LA-005" },
  ];

  const clientes: Cliente[] = [
    { id: 1, nombre: "Juan Pérez García", cedula: "1234567890", email: "juan@email.com", direccion: "Av. Amazonas 123, Quito" },
    { id: 2, nombre: "María González López", cedula: "0987654321", email: "maria@email.com", direccion: "Calle Principal 456, Guayaquil" },
    { id: 3, nombre: "Carlos López Mendoza", cedula: "1122334455", email: "carlos@email.com", direccion: "Sector Norte 789, Cuenca" },
  ];

  // Filtrar productos por búsqueda
  const productosFiltered = productosDisponibles.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clienteSeleccionado = clientes.find(c => c.id.toString() === selectedCliente);

  // Funciones para manejar productos
  const agregarProducto = (producto: Producto) => {
    const existeEnFactura = productos.find(item => item.producto.id === producto.id);
    
    if (existeEnFactura) {
      if (existeEnFactura.cantidad >= producto.stock) {
        toast({
          title: "Stock insuficiente",
          description: `Solo hay ${producto.stock} unidades disponibles`,
          variant: "destructive"
        });
        return;
      }
      
      setProductos(prev => prev.map(item =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setProductos(prev => [...prev, { producto, cantidad: 1 }]);
    }

    toast({
      title: "Producto agregado",
      description: `${producto.nombre} agregado a la factura`
    });
  };

  const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(productoId);
      return;
    }

    const producto = productosDisponibles.find(p => p.id === productoId);
    if (producto && nuevaCantidad > producto.stock) {
      toast({
        title: "Stock insuficiente",
        description: `Solo hay ${producto.stock} unidades disponibles`,
        variant: "destructive"
      });
      return;
    }

    setProductos(prev => prev.map(item =>
      item.producto.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const eliminarProducto = (productoId: number) => {
    setProductos(prev => prev.filter(item => item.producto.id !== productoId));
  };

  // Cálculos
  const subtotal = productos.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
  const iva = subtotal * 0.15; // 15% IVA
  const total = subtotal + iva;

  const generarFactura = () => {
    if (productos.length === 0) {
      toast({
        title: "Factura vacía",
        description: "Agrega productos antes de generar la factura",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCliente) {
      toast({
        title: "Cliente requerido",
        description: "Selecciona un cliente para generar la factura",
        variant: "destructive"
      });
      return;
    }

    setShowPreview(true);
    toast({
      title: "Factura generada",
      description: `Factura ${numeroFactura} lista para imprimir o guardar`
    });
  };

  const limpiarFactura = () => {
    setProductos([]);
    setSelectedCliente("");
    setSearchTerm("");
    setShowPreview(false);
    // Generar nuevo número de factura
    const nuevoNumero = "FAC-" + String(Math.floor(Math.random() * 999999) + 1).padStart(6, '0');
    setNumeroFactura(nuevoNumero);
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
          <h1 className="text-3xl font-bold text-foreground">Emisión de Factura</h1>
          <p className="text-muted-foreground">Crea y gestiona facturas de venta</p>
        </div>
      </div>

      {!showPreview ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel izquierdo - Búsqueda y productos */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información de la factura */}
            <Card>
              <CardHeader>
                <CardTitle>Información de la Factura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Número de Factura</Label>
                    <Input value={numeroFactura} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Input value={new Date().toLocaleDateString('es-ES')} readOnly className="bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selección de cliente */}
            <Card>
              <CardHeader>
                <CardTitle>Cliente</CardTitle>
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
                {clienteSeleccionado && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm">
                    <p><strong>Nombre:</strong> {clienteSeleccionado.nombre}</p>
                    <p><strong>Cédula/RUC:</strong> {clienteSeleccionado.cedula}</p>
                    <p><strong>Email:</strong> {clienteSeleccionado.email}</p>
                    <p><strong>Dirección:</strong> {clienteSeleccionado.direccion}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Búsqueda de productos */}
            <Card>
              <CardHeader>
                <CardTitle>Agregar Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {productosFiltered.map((producto) => (
                      <div key={producto.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{producto.nombre}</h4>
                            <Badge variant="secondary" className="text-xs">{producto.codigo}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{producto.marca}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="font-medium text-sm">${producto.precio.toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground">Stock: {producto.stock}</span>
                          </div>
                        </div>
                        <Button 
                          onClick={() => agregarProducto(producto)}
                          disabled={producto.stock === 0}
                          size="sm"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel derecho - Productos seleccionados y totales */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Productos en Factura
                </CardTitle>
              </CardHeader>
              <CardContent>
                {productos.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No hay productos agregados.<br />
                    Busca y agrega productos para continuar.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {productos.map((item) => (
                      <div key={item.producto.id} className="space-y-2 p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.producto.nombre}</h4>
                            <p className="text-xs text-muted-foreground">{item.producto.marca}</p>
                            <p className="text-sm">${item.producto.precio.toFixed(2)} c/u</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => eliminarProducto(item.producto.id)}
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
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Totales */}
            {productos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Totales</CardTitle>
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
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <Button onClick={generarFactura} size="lg" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Generar Factura
                    </Button>
                    <Button variant="outline" onClick={limpiarFactura} className="w-full">
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        /* Vista previa de la factura */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Vista Previa de Factura</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Editar
              </Button>
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              {/* Encabezado de la factura */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-primary">PerfumeManager</h1>
                  <p className="text-muted-foreground">Sistema de Gestión de Perfumes</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold">FACTURA</h2>
                  <p className="text-lg font-mono">{numeroFactura}</p>
                  <p className="text-sm text-muted-foreground">
                    Fecha: {new Date().toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>

              {/* Información del cliente */}
              {clienteSeleccionado && (
                <div className="mb-8 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-bold mb-2">DATOS DEL CLIENTE</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Nombre:</strong> {clienteSeleccionado.nombre}</p>
                      <p><strong>Cédula/RUC:</strong> {clienteSeleccionado.cedula}</p>
                    </div>
                    <div>
                      <p><strong>Email:</strong> {clienteSeleccionado.email}</p>
                      <p><strong>Dirección:</strong> {clienteSeleccionado.direccion}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Detalle de productos */}
              <div className="mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left p-2">Código</th>
                      <th className="text-left p-2">Producto</th>
                      <th className="text-center p-2">Cantidad</th>
                      <th className="text-right p-2">P. Unitario</th>
                      <th className="text-right p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((item) => (
                      <tr key={item.producto.id} className="border-b">
                        <td className="p-2 font-mono text-sm">{item.producto.codigo}</td>
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{item.producto.nombre}</div>
                            <div className="text-sm text-muted-foreground">{item.producto.marca}</div>
                          </div>
                        </td>
                        <td className="p-2 text-center">{item.cantidad}</td>
                        <td className="p-2 text-right">${item.producto.precio.toFixed(2)}</td>
                        <td className="p-2 text-right font-medium">
                          ${(item.producto.precio * item.cantidad).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totales */}
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>IVA (15%):</span>
                    <span>${iva.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-gray-300 mt-2 pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>TOTAL:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pie de página */}
              <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
                <p>Gracias por su compra</p>
                <p>Esta factura fue generada electrónicamente por PerfumeManager</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button onClick={limpiarFactura} variant="outline">
              Nueva Factura
            </Button>
            <Button asChild>
              <Link to="/visualizar-facturas">Ver Todas las Facturas</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
