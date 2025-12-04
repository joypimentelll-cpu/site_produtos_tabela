import { Product } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Sun, Shield, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  featured?: boolean;
  imageUrl?: string;
}

export function ProductCard({ product, onEdit, onDelete, featured = false, imageUrl }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (featured) {
    return (
      <Card 
        className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-500 border-0 rounded-2xl"
        role="article"
        aria-labelledby={`product-title-${product.id}`}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative overflow-hidden bg-pastel-lavender">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`Imagem do produto ${product.nome}`}
                className="w-full h-full object-cover aspect-square md:aspect-auto transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-64 md:h-full flex items-center justify-center">
                <Sun className="h-24 w-24 text-primary/30" aria-hidden="true" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge 
                variant="secondary" 
                className="bg-card/90 backdrop-blur-sm text-foreground font-semibold px-3 py-1.5 text-sm"
              >
                {product.categoria}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <CardTitle 
                id={`product-title-${product.id}`}
                className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight"
              >
                {product.nome}
              </CardTitle>
              
              <p className="text-muted-foreground leading-relaxed">
                {product.descricao || "Proteção solar avançada para sua pele."}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-accent text-accent-foreground px-3 py-1.5 rounded-full">
                  <Shield className="h-3 w-3" aria-hidden="true" />
                  FPS 70
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-pastel-mint text-foreground px-3 py-1.5 rounded-full">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Alta Cobertura
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <p 
                className="text-3xl md:text-4xl font-display font-bold text-primary"
                aria-label={`Preço: ${formatPrice(product.preco)}`}
              >
                {formatPrice(product.preco)}
              </p>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => onEdit(product)}
                  className="flex-1 h-12 font-medium rounded-xl border-2 hover:border-primary/50 hover:bg-accent transition-all"
                  aria-label={`Editar produto ${product.nome}`}
                >
                  <Pencil className="h-4 w-4 mr-2" aria-hidden="true" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onDelete(product.id)}
                  className="flex-1 h-12 font-medium rounded-xl transition-all"
                  aria-label={`Excluir produto ${product.nome}`}
                >
                  <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="group card-interactive bg-gradient-card shadow-card border-0 rounded-2xl overflow-hidden"
      role="article"
      aria-labelledby={`product-title-${product.id}`}
    >
      <CardHeader className="pb-3 pt-6 px-6">
        <div className="flex items-start justify-between gap-2">
          <CardTitle 
            id={`product-title-${product.id}`}
            className="font-display text-xl font-semibold line-clamp-1 text-foreground"
          >
            {product.nome}
          </CardTitle>
          <Badge 
            variant="secondary" 
            className="shrink-0 bg-accent text-accent-foreground font-medium"
          >
            {product.categoria}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 px-6">
        <p className="text-muted-foreground text-sm line-clamp-2 min-h-[40px] leading-relaxed">
          {product.descricao || "Proteção solar de alta qualidade."}
        </p>
        <p 
          className="text-2xl font-display font-bold text-primary mt-4"
          aria-label={`Preço: ${formatPrice(product.preco)}`}
        >
          {formatPrice(product.preco)}
        </p>
      </CardContent>
      
      <CardFooter className="gap-3 pt-0 pb-6 px-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(product)}
          className="flex-1 h-10 rounded-xl border-2 hover:border-primary/50 hover:bg-accent transition-all"
          aria-label={`Editar produto ${product.nome}`}
        >
          <Pencil className="h-4 w-4 mr-1.5" aria-hidden="true" />
          Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(product.id)}
          className="flex-1 h-10 rounded-xl transition-all"
          aria-label={`Excluir produto ${product.nome}`}
        >
          <Trash2 className="h-4 w-4 mr-1.5" aria-hidden="true" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}
