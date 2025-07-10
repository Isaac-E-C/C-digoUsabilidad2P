
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Search, Plus, Edit, Trash2, User, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Cliente {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaRegistro: string;
  totalCompras: number;
}

export default function GestionClientes() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    email: "",
    telefono: "",
    direccion: ""
  });

  // Datos simulados
  const clientes: Cliente[] = [
    {
      id: 1,
      nombre: "Juan Pérez García",
      cedula: "1234567890",
      email: "juan.perez@email.com",
      telefono: "+593 99 123 4567",
      direccion: "Av. Amazonas 123, Quito",
      fechaRegistro: "2024-01-15",
      totalCompras: 1250.00
    },
    {
      id: 2,
      nombre: "María González López",
      cedula: "0987654321",
      email: "maria.gonzalez@email.com",
      telefono: "+593 98 765 4321",
      direccion: "Calle Principal 456, Guayaquil",
      fechaRegistro: "2024-02-20",
      totalCompras: 850.50
    },
    {
      id: 3,
      nombre: "Carlos López Mendoza",
      cedula: "1122334455",
      email: "carlos.lopez@email.com",
      telefono: "+593 97 112 2334",
      direccion: "Sector Norte 789, Cuenca",
      fechaRegistro: "2024-03-10",
      totalCompras: 2100.75
    },
    {
      id: 4,
      nombre: "Ana Rodríguez Silva",
      cedula: "5566778899",
      email: "ana.rodriguez@email.com",
      telefono: "+593 96 556 6778",
      direccion: "Zona Centro 321, Ambato",
      fechaRegistro: "2024-04-05",
      totalCompras: 650.25
    }
  ];

  // Filtrar clientes
  const clientesFiltered = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cedula.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.includes(searchTerm)
  );

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.nombre || !formData.cedula || !formData.email) {
      toast({
        title: "Error de validación",
        description: "Por favor complete los campos obligatorios: nombre, cédula y email",
        variant: "destructive"
      });
      return;
    }

    // Simular guardado
    if (editingClient) {
      toast({
        title: "Cliente actualizado",
        description: `${formData.nombre} ha sido actualizado exitosamente`
      });
    } else {
      toast({
        title: "Cliente registrado",
        description: `${formData.nombre} ha sido registrado exitosamente`
      });
    }

    // Limpiar formulario y cerrar
    setFormData({
      nombre: "",
      cedula: "",
      email: "",
      telefono: "",
      direccion: ""
    });
    setShowForm(false);
    setEditingClient(null);
  };

  const handleEdit = (cliente: Cliente) => {
    setFormData({
      nombre: cliente.nombre,
      cedula: cliente.cedula,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion
    });
    setEditingClient(cliente);
    setShowForm(true);
  };

  const handleDelete = (cliente: Cliente) => {
    // En una app real, aquí habría una confirmación
    toast({
      title: "Cliente eliminado",
      description: `${cliente.nombre} ha sido eliminado del sistema`,
      variant: "destructive"
    });
  };

  const cancelForm = () => {
    setFormData({
      nombre: "",
      cedula: "",
      email: "",
      telefono: "",
      direccion: ""
    });
    setShowForm(false);
    setEditingClient(null);
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
            <h1 className="text-3xl font-bold text-foreground">Gestión de Clientes</h1>
            <p className="text-muted-foreground">Administra tu base de clientes</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Formulario de cliente */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingClient ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
            </CardTitle>
            <CardDescription>
              Complete la información del cliente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      placeholder="Ej: Juan Pérez García"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cedula">Cédula/RUC *</Label>
                  <Input
                    id="cedula"
                    value={formData.cedula}
                    onChange={(e) => handleInputChange("cedula", e.target.value)}
                    placeholder="Ej: 1234567890"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="cliente@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="+593 99 123 4567"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange("direccion", e.target.value)}
                    placeholder="Dirección completa del cliente"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit">
                  {editingClient ? 'Actualizar Cliente' : 'Registrar Cliente'}
                </Button>
                <Button type="button" variant="outline" onClick={cancelForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, cédula, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla de clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            Mostrando {clientesFiltered.length} de {clientes.length} clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Cédula/RUC</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Total Compras</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesFiltered.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{cliente.nombre}</div>
                        <div className="text-sm text-muted-foreground">{cliente.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{cliente.cedula}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{cliente.telefono}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-sm truncate" title={cliente.direccion}>
                        {cliente.direccion}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(cliente.fechaRegistro).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={cliente.totalCompras > 1000 ? "default" : "secondary"}>
                        ${cliente.totalCompras.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(cliente)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(cliente)}
                        >
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

      {/* Estadísticas de clientes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{clientes.length}</div>
            <p className="text-sm text-muted-foreground">Total Clientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {clientes.filter(c => c.totalCompras > 1000).length}
            </div>
            <p className="text-sm text-muted-foreground">Clientes VIP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${clientes.reduce((sum, c) => sum + c.totalCompras, 0).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">Total Ventas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${(clientes.reduce((sum, c) => sum + c.totalCompras, 0) / clientes.length).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">Promedio por Cliente</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
