
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp,
  Plus,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Datos simulados - en una app real vendrían de la API
  const stats = {
    totalPerfumes: 156,
    stockBajo: 8,
    ventasHoy: 12,
    clientesRegistrados: 89,
    facturasPendientes: 3,
    ventasMes: 45000
  };

  const recentActivity = [
    { action: "Venta realizada", item: "Chanel No. 5", time: "Hace 5 min" },
    { action: "Stock actualizado", item: "Dior Sauvage", time: "Hace 15 min" },
    { action: "Cliente registrado", item: "María González", time: "Hace 1 hora" },
    { action: "Factura emitida", item: "#FAC-001234", time: "Hace 2 horas" },
  ];

  const quickActions = [
    { title: "Registrar Perfume", desc: "Agregar nuevo producto", icon: Plus, link: "/registrar-perfume", color: "bg-blue-500" },
    { title: "Venta Rápida", desc: "Procesar venta", icon: ShoppingCart, link: "/venta-rapida", color: "bg-green-500" },
    { title: "Ver Inventario", desc: "Gestionar stock", icon: Package, link: "/inventario", color: "bg-purple-500" },
    { title: "Ver Facturas", desc: "Historial ventas", icon: Eye, link: "/visualizar-facturas", color: "bg-orange-500" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido al sistema de gestión de perfumes</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Última actualización</p>
          <p className="text-sm font-medium">{new Date().toLocaleString('es-ES')}</p>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Perfumes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPerfumes}</div>
            <p className="text-xs text-muted-foreground">productos en stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.stockBajo}</div>
            <p className="text-xs text-muted-foreground">requieren restock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ventasHoy}</div>
            <p className="text-xs text-muted-foreground">transacciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clientesRegistrados}</div>
            <p className="text-xs text-muted-foreground">registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.facturasPendientes}</div>
            <p className="text-xs text-muted-foreground">pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.ventasMes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">ingresos totales</p>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Accede directamente a las funciones principales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className={`${action.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas de stock bajo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Alertas de Stock Bajo
            </CardTitle>
            <CardDescription>Productos que requieren reabastecimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Chanel No. 5", brand: "Chanel", stock: 2 },
                { name: "Dior Sauvage", brand: "Dior", stock: 1 },
                { name: "Tom Ford Black Orchid", brand: "Tom Ford", stock: 3 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {item.stock} unidades
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/inventario">Ver Inventario Completo</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
