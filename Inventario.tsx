
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Edit, Trash2, AlertTriangle, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Perfume {
  id: number;
  nombre: string;
  marca: string;
  categoria: string;
  precio: number;
  stock: number;
  codigo: string;
  stockMinimo: number;
}

export default function Inventario() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("todas");
  const [selectedCategoria, setSelectedCategoria] = useState("todas");

  // Datos simulados
  const perfumes: Perfume[] = [
    { id: 1, nombre: "Chanel No. 5", marca: "Chanel", categoria: "Femenino", precio: 120.00, stock: 15, codigo: "CH-001", stockMinimo: 5 },
    { id: 2, nombre: "Sauvage", marca: "Dior", categoria: "Masculino", precio: 85.00, stock: 2, codigo: "DI-002", stockMinimo: 5 },
    { id: 3, nombre: "Black Orchid", marca: "Tom Ford", categoria: "Unisex", precio: 150.00, stock: 8, codigo: "TF-003", stockMinimo: 3 },
    { id: 4, nombre: "Versace Eros", marca: "Versace", categoria: "Masculino", precio: 75.00, stock: 1, codigo: "VE-004", stockMinimo: 5 },
    { id: 5, nombre: "La Vie Est Belle", marca: "Lancôme", categoria: "Femenino", precio: 95.00, stock: 12, codigo: "LA-005", stockMinimo: 4 },
    { id: 6, nombre: "Acqua di Gio", marca: "Armani", categoria: "Masculino", precio: 80.00, stock: 20, codigo: "AR-006", stockMinimo: 6 },
  ];

  const marcas = [...new Set(perfumes.map(p => p.marca))];
  const categorias = [...new Set(perfumes.map(p => p.categoria))];

  // Filtrar perfumes
  const filteredPerfumes = perfumes.filter(perfume => {
    const matchesSearch = perfume.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         perfume.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         perfume.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarca = selectedMarca === "todas" || perfume.marca === selectedMarca;
    const matchesCategoria = selectedCategoria === "todas" || perfume.categoria === selectedCategoria;
    
    return matchesSearch && matchesMarca && matchesCategoria;
  });

  const getStockBadge = (stock: number, stockMinimo: number) => {
    if (stock === 0) {
      return <Badge variant="destructive" className="text-xs">Sin Stock</Badge>;
    } else if (stock <= stockMinimo) {
      return <Badge variant="destructive" className="text-xs">Stock Bajo</Badge>;
    } else if (stock <= stockMinimo * 2) {
      return <Badge variant="secondary" className="text-xs">Stock Medio</Badge>;
    } else {
      return <Badge variant="default" className="text-xs bg-green-500">Stock Normal</Badge>;
    }
  };

  const stockBajoCount = perfumes.filter(p => p.stock <= p.stockMinimo).length;

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
            <h1 className="text-3xl font-bold text-foreground">Inventario de Perfumes</h1>
            <p className="text-muted-foreground">Gestiona tu catálogo de productos</p>
          </div>
        </div>
        <Button asChild>
          <Link to="/registrar-perfume">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Perfume
          </Link>
        </Button>
      </div>

      {/* Alertas de stock bajo */}
      {stockBajoCount > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Alerta de Stock Bajo
            </CardTitle>
            <CardDescription>
              Tienes {stockBajoCount} producto{stockBajoCount > 1 ? 's' : ''} con stock bajo que requiere{stockBajoCount > 1 ? 'n' : ''} reabastecimiento inmediato.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Búsqueda</CardTitle>
          <CardDescription>Utiliza los filtros para encontrar productos específicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Búsqueda General</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar por nombre, marca o código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Filtrar por Marca</Label>
              <Select value={selectedMarca} onValueChange={setSelectedMarca}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las marcas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las marcas</SelectItem>
                  {marcas.map((marca) => (
                    <SelectItem key={marca} value={marca}>
                      {marca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Filtrar por Categoría</Label>
              <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de inventario */}
      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Productos</CardTitle>
          <CardDescription>
            Mostrando {filteredPerfumes.length} de {perfumes.length} productos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPerfumes.map((perfume) => (
                  <TableRow key={perfume.id} className={perfume.stock <= perfume.stockMinimo ? "bg-destructive/5" : ""}>
                    <TableCell className="font-mono text-sm">{perfume.codigo}</TableCell>
                    <TableCell className="font-medium">{perfume.nombre}</TableCell>
                    <TableCell>{perfume.marca}</TableCell>
                    <TableCell>{perfume.categoria}</TableCell>
                    <TableCell>${perfume.precio.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={perfume.stock <= perfume.stockMinimo ? "text-destructive font-medium" : ""}>
                          {perfume.stock}
                        </span>
                        {perfume.stock <= perfume.stockMinimo && (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStockBadge(perfume.stock, perfume.stockMinimo)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
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

      {/* Resumen de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{perfumes.length}</div>
            <p className="text-sm text-muted-foreground">Total Productos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{stockBajoCount}</div>
            <p className="text-sm text-muted-foreground">Stock Bajo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${perfumes.reduce((sum, p) => sum + (p.precio * p.stock), 0).toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Valor Inventario</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{perfumes.reduce((sum, p) => sum + p.stock, 0)}</div>
            <p className="text-sm text-muted-foreground">Unidades Totales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
