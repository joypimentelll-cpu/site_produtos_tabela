import { Product } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-1 text-card-foreground">
            {product.nome}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {product.categoria}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm line-clamp-2 min-h-[40px]">
          {product.descricao || "Sem descrição"}
        </p>
        <p className="text-2xl font-bold text-primary mt-3">
          {formatPrice(product.preco)}
        </p>
      </CardContent>
      
      <CardFooter className="gap-2 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(product)}
          className="flex-1"
        >
          <Pencil className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(product.id)}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}
