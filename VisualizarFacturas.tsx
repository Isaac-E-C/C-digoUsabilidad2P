import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Search, Eye, Printer, Download, FileText, Filter } from "lucide-react";
import { Link } from "react-router-dom";

interface Factura {
  id: string;
  numero: string;
  fecha: string;
  cliente: {
    nombre: string;
    cedula: string;
    email: string;
  };
  productos: {
    codigo: string;
    nombre: string;
    marca: string;
    cantidad: number;
    precioUnitario: number;
    total: number;
  }[];
  subtotal: number;
  iva: number;
  total: number;
  estado: 'pagada' | 'pendiente' | 'anulada';
}

export default function VisualizarFacturas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);

  // Datos simulados
  const facturas: Factura[] = [
    {
      id: "1",
      numero: "FAC-001234",
      fecha: "2024-01-15",
      cliente: {
        nombre: "Juan Pérez García",
        cedula: "1234567890",
        email: "juan.perez@email.com"
      },
      productos: [
        {
          codigo: "CH-001",
          nombre: "Chanel No. 5",
          marca: "Chanel",
          cantidad: 2,
          precioUnitario: 120.00,
          total: 240.00
        },
        {
          codigo: "DI-002",
          nombre: "Sauvage",
          marca: "Dior",
          cantidad: 1,
          precioUnitario: 85.00,
          total: 85.00
        }
      ],
      subtotal: 325.00,
      iva: 48.75,
      total: 373.75,
      estado: 'pagada'
    },
    {
      id: "2",
      numero: "FAC-001235",
      fecha: "2024-01-16",
      cliente: {
        nombre: "María González López",
        cedula: "0987654321",
        email: "maria.gonzalez@email.com"
      },
      productos: [
        {
          codigo: "TF-003",
          nombre: "Black Orchid",
          marca: "Tom Ford",
          cantidad: 1,
          precioUnitario: 150.00,
          total: 150.00
        }
      ],
      subtotal: 150.00,
      iva: 22.50,
      total: 172.50,
      estado: 'pagada'
    },
    {
      id: "3",
      numero: "FAC-001236",
      fecha: "2024-01-17",
      cliente: {
        nombre: "Carlos López Mendoza",
        cedula: "1122334455",
        email: "carlos.lopez@email.com"
      },
      productos: [
        {
          codigo: "VE-004",
          nombre: "Versace Eros",
          marca: "Versace",
          cantidad: 3,
          precioUnitario: 75.00,
          total: 225.00
        },
        {
          codigo: "LA-005",
          nombre: "La Vie Est Belle",
          marca: "Lancôme",
          cantidad: 1,
          precioUnitario: 95.00,
          total: 95.00
        }
      ],
      subtotal: 320.00,
      iva: 48.00,
      total: 368.00,
      estado: 'pendiente'
    },
    {
      id: "4",
      numero: "FAC-001237",
      fecha: "2024-01-18",
      cliente: {
        nombre: "Ana Rodríguez Silva",
        cedula: "5566778899",
        email: "ana.rodriguez@email.com"
      },
      productos: [
        {
          codigo: "CH-001",
          nombre: "Chanel No. 5",
          marca: "Chanel",
          cantidad: 1,
          precioUnitario: 120.00,
          total: 120.00
        }
      ],
      subtotal: 120.00,
      iva: 18.00,
      total: 138.00,
      estado: 'anulada'
    }
  ];

  // Filtrar facturas
  const facturasFiltered = facturas.filter(factura => {
    const matchesSearch = 
      factura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factura.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factura.cliente.cedula.includes(searchTerm);
    
    const matchesFecha = !filtroFecha || factura.fecha.includes(filtroFecha);
    const matchesEstado = filtroEstado === "todos" || factura.estado === filtroEstado;
    
    return matchesSearch && matchesFecha && matchesEstado;
  });

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pagada':
        return <Badge className="bg-green-500">Pagada</Badge>;
      case 'pendiente':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'anulada':
        return <Badge variant="destructive">Anulada</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  const stats = {
    total: facturas.length,
    pagadas: facturas.filter(f => f.estado === 'pagada').length,
    pendientes: facturas.filter(f => f.estado === 'pendiente').length,
    anuladas: facturas.filter(f => f.estado === 'anulada').length,
    totalVentas: facturas.filter(f => f.estado === 'pagada').reduce((sum, f) => sum + f.total, 0)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Visualizar Facturas</h1>
            <p className="text-muted-foreground">Historial y gestión de facturas emitidas</p>
          </div>
        </div>
        <Button asChild>
          <Link to="/facturacion">
            <FileText className="w-4 h-4 mr-2" />
            Nueva Factura
          </Link>
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Facturas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.pagadas}</div>
            <p className="text-sm text-muted-foreground">Pagadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pendientes}</div>
            <p className="text-sm text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.anuladas}</div>
            <p className="text-sm text-muted-foreground">Anuladas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${stats.totalVentas.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Total Ventas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros de Búsqueda
          </CardTitle>
          <CardDescription>Utiliza los filtros para encontrar facturas específicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Búsqueda General</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar por número, cliente o cédula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Filtrar por Fecha</Label>
              <Input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Filtrar por Estado</Label>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pagada">Pagadas</SelectItem>
                  <SelectItem value="pendiente">Pendientes</SelectItem>
                  <SelectItem value="anulada">Anuladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de facturas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Facturas</CardTitle>
          <CardDescription>
            Mostrando {facturasFiltered.length} de {facturas.length} facturas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Cédula/RUC</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facturasFiltered.map((factura) => (
                  <TableRow key={factura.id}>
                    <TableCell className="font-mono font-medium">{factura.numero}</TableCell>
                    <TableCell>{new Date(factura.fecha).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>{factura.cliente.nombre}</TableCell>
                    <TableCell className="font-mono">{factura.cliente.cedula}</TableCell>
                    <TableCell className="font-medium">${factura.total.toFixed(2)}</TableCell>
                    <TableCell>{getEstadoBadge(factura.estado)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedFactura(factura)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Detalle de Factura {factura.numero}</DialogTitle>
                              <DialogDescription>
                                Información completa de la factura
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedFactura && (
                              <div className="space-y-6">
                                {/* Información del cliente */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Información del Cliente</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p><strong>Nombre:</strong> {selectedFactura.cliente.nombre}</p>
                                        <p><strong>Cédula/RUC:</strong> {selectedFactura.cliente.cedula}</p>
                                      </div>
                                      <div>
                                        <p><strong>Email:</strong> {selectedFactura.cliente.email}</p>
                                        <p><strong>Fecha:</strong> {new Date(selectedFactura.fecha).toLocaleDateString('es-ES')}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Productos */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Productos</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Código</TableHead>
                                          <TableHead>Producto</TableHead>
                                          <TableHead className="text-center">Cantidad</TableHead>
                                          <TableHead className="text-right">P. Unitario</TableHead>
                                          <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedFactura.productos.map((producto, index) => (
                                          <TableRow key={index}>
                                            <TableCell className="font-mono">{producto.codigo}</TableCell>
                                            <TableCell>
                                              <div>
                                                <div className="font-medium">{producto.nombre}</div>
                                                <div className="text-sm text-muted-foreground">{producto.marca}</div>
                                              </div>
                                            </TableCell>
                                            <TableCell className="text-center">{producto.cantidad}</TableCell>
                                            <TableCell className="text-right">${producto.precioUnitario.toFixed(2)}</TableCell>
                                            <TableCell className="text-right font-medium">${producto.total.toFixed(2)}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </CardContent>
                                </Card>

                                {/* Totales */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Resumen</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>${selectedFactura.subtotal.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>IVA (15%):</span>
                                        <span>${selectedFactura.iva.toFixed(2)}</span>
                                      </div>
                                      <div className="border-t pt-2">
                                        <div className="flex justify-between font-bold text-lg">
                                          <span>Total:</span>
                                          <span>${selectedFactura.total.toFixed(2)}</span>
                                        </div>
                                      </div>
                                      <div className="pt-2">
                                        <div className="flex justify-between items-center">
                                          <span>Estado:</span>
                                          {getEstadoBadge(selectedFactura.estado)}
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Acciones */}
                                <div className="flex justify-end gap-2">
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
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
