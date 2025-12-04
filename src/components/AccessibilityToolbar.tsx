import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Accessibility, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Eye,
  Volume2
} from "lucide-react";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  darkMode: boolean;
  reducedMotion: boolean;
}

export function AccessibilityToolbar() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("accessibility-settings");
    return saved ? JSON.parse(saved) : {
      fontSize: 100,
      highContrast: false,
      darkMode: false,
      reducedMotion: false,
    };
  });

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    
    // Apply font size
    document.documentElement.style.fontSize = `${settings.fontSize}%`;
    
    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
    
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty("--animation-duration", "0.01ms");
    } else {
      document.documentElement.style.removeProperty("--animation-duration");
    }
  }, [settings]);

  const increaseFontSize = () => {
    setSettings(prev => ({ ...prev, fontSize: Math.min(prev.fontSize + 10, 150) }));
  };

  const decreaseFontSize = () => {
    setSettings(prev => ({ ...prev, fontSize: Math.max(prev.fontSize - 10, 80) }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      highContrast: false,
      darkMode: false,
      reducedMotion: false,
    });
  };

  const announceChange = (message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-elevated bg-card border-2 border-primary/20 hover:border-primary/50 transition-all duration-300"
          aria-label="Abrir configurações de acessibilidade"
        >
          <Accessibility className="h-6 w-6 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-6 mr-4 mb-2 shadow-elevated" 
        side="top"
        align="end"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Acessibilidade</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetSettings}
              className="text-xs"
            >
              Redefinir
            </Button>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <ZoomIn className="h-4 w-4" />
              Tamanho do Texto: {settings.fontSize}%
            </Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  decreaseFontSize();
                  announceChange(`Tamanho do texto: ${settings.fontSize - 10}%`);
                }}
                disabled={settings.fontSize <= 80}
                aria-label="Diminuir tamanho do texto"
                className="h-8 w-8"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Slider
                value={[settings.fontSize]}
                onValueChange={([value]) => setSettings(prev => ({ ...prev, fontSize: value }))}
                min={80}
                max={150}
                step={10}
                className="flex-1"
                aria-label="Ajustar tamanho do texto"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  increaseFontSize();
                  announceChange(`Tamanho do texto: ${settings.fontSize + 10}%`);
                }}
                disabled={settings.fontSize >= 150}
                aria-label="Aumentar tamanho do texto"
                className="h-8 w-8"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
              <Eye className="h-4 w-4" />
              Alto Contraste
            </Label>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => {
                setSettings(prev => ({ ...prev, highContrast: checked }));
                announceChange(checked ? "Alto contraste ativado" : "Alto contraste desativado");
              }}
              aria-describedby="high-contrast-desc"
            />
          </div>
          <p id="high-contrast-desc" className="sr-only">
            Ativa cores de alto contraste para melhor visibilidade
          </p>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
              {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              Modo Escuro
            </Label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => {
                setSettings(prev => ({ ...prev, darkMode: checked }));
                announceChange(checked ? "Modo escuro ativado" : "Modo claro ativado");
              }}
            />
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <Label htmlFor="reduced-motion" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
              <Volume2 className="h-4 w-4" />
              Reduzir Animações
            </Label>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => {
                setSettings(prev => ({ ...prev, reducedMotion: checked }));
                announceChange(checked ? "Animações reduzidas" : "Animações normais");
              }}
            />
          </div>

          <p className="text-xs text-muted-foreground pt-2 border-t">
            Pressione Tab para navegar e Enter para selecionar
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
