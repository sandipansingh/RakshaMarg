import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ReactLenis } from '@studio-freight/react-lenis';
import Index from "./pages/Index";
import CheckRoute from "./pages/CheckRoute";
import NotFound from "./pages/NotFound";
import Inspiration from "./pages/Inspiration"; // Import here

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/check-route" element={<CheckRoute />} />
              <Route path="/inspiration" element={<Inspiration />} /> {/* Add Route here */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ReactLenis>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;