
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import RegistrarPerfume from "./pages/RegistrarPerfume";
import Inventario from "./pages/Inventario";
import VentaRapida from "./pages/VentaRapida";
import Facturacion from "./pages/Facturacion";
import VisualizarFacturas from "./pages/VisualizarFacturas";
import GestionClientes from "./pages/GestionClientes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-14 border-b bg-card flex items-center px-4 gap-2 shadow-sm">
                <SidebarTrigger />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <h1 className="font-semibold text-lg text-foreground">PerfumeManager</h1>
                </div>
              </header>
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/registrar-perfume" element={<RegistrarPerfume />} />
                  <Route path="/inventario" element={<Inventario />} />
                  <Route path="/venta-rapida" element={<VentaRapida />} />
                  <Route path="/facturacion" element={<Facturacion />} />
                  <Route path="/visualizar-facturas" element={<VisualizarFacturas />} />
                  <Route path="/gestion-clientes" element={<GestionClientes />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
