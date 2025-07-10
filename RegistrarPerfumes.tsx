
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegistrarPerfume() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    precio: "",
    stock: "",
    descripcion: "",
    codigo: ""
  });

  const categorias = [
    "Femenino",
    "Masculino",
    "Unisex",
    "Niños",
    "Luxury",
    "Deportivo",
    "Oriental",
    "Floral",
    "Citrico"
  ];

  const marcas = [
    "Chanel",
    "Dior",
    "Tom Ford",
    "Versace",
    "Paco Rabanne",
    "Calvin Klein",
    "Hugo Boss",
    "Armani",
    "Dolce & Gabbana",
    "Yves Saint Laurent"
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.nombre || !formData.marca || !formData.categoria || !formData.precio || !formData.stock) {
      toast({
        title: "Error de validación",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    // Simular guardado
    console.log("Guardando perfume:", formData);
    
    toast({
      title: "¡Perfume registrado!",
      description: `${formData.nombre} ha sido agregado al inventario exitosamente.`
    });

    // Limpiar formulario
    handleLimpiar();
  };

  const handleLimpiar = () => {
    setFormData({
      nombre: "",
      marca: "",
      categoria: "",
      precio: "",
      stock: "",
      descripcion: "",
      codigo: ""
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Registrar Perfume</h1>
          <p className="text-muted-foreground">Agregar nuevo producto al inventario</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
          <CardDescription>
            Complete todos los campos para registrar el perfume en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre del perfume */}
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Perfume *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ej: Chanel No. 5"
                  className="w-full"
                />
              </div>

              {/* Código del producto */}
              <div className="space-y-2">
                <Label htmlFor="codigo">Código del Producto</Label>
                <Input
                  id="codigo"
                  value={formData.codigo}
                  onChange={(e) => handleInputChange("codigo", e.target.value)}
                  placeholder="Ej: CH-001"
                  className="w-full"
                />
              </div>

              {/* Marca */}
              <div className="space-y-2">
                <Label htmlFor="marca">Marca *</Label>
                <Select onValueChange={(value) => handleInputChange("marca", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {marcas.map((marca) => (
                      <SelectItem key={marca} value={marca}>
                        {marca}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select onValueChange={(value) => handleInputChange("categoria", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Precio */}
              <div className="space-y-2">
                <Label htmlFor="precio">Precio de Venta ($) *</Label>
                <Input
                  id="precio"
                  type="number"
                  step="0.01"
                  value={formData.precio}
                  onChange={(e) => handleInputChange("precio", e.target.value)}
                  placeholder="0.00"
                  className="w-full"
                />
              </div>

              {/* Stock inicial */}
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Inicial *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  placeholder="0"
                  className="w-full"
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
                placeholder="Descripción opcional del perfume..."
                className="w-full"
                rows={3}
              />
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" className="flex-1 sm:flex-none">
                <Save className="w-4 h-4 mr-2" />
                Guardar Perfume
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleLimpiar}
                className="flex-1 sm:flex-none"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Limpiar Formulario
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información Importante</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Los campos marcados con (*) son obligatorios</li>
            <li>• El código del producto es opcional pero recomendado para mejor organización</li>
            <li>• El precio debe incluir dos decimales para mayor precisión</li>
            <li>• El stock inicial puede modificarse posteriormente en el módulo de inventario</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
