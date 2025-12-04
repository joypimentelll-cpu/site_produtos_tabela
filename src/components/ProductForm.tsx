import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, ProductInput } from "@/hooks/useProducts";

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: ProductInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CATEGORIES = [
  "Protetor Solar",
  "Protetor Facial",
  "Protetor Corporal",
  "Hidratante com FPS",
  "Bronzeador",
  "Pós-Sol",
];

export function ProductForm({ product, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (product) {
      setNome(product.nome);
      setDescricao(product.descricao || "");
      setPreco(String(product.preco));
      setCategoria(product.categoria);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="nome" className="text-sm font-medium">
          Nome do Produto
        </Label>
        <Input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Solar Expertise FPS 70"
          required
          className="h-11 rounded-xl"
          aria-describedby="nome-hint"
        />
        <p id="nome-hint" className="sr-only">
          Digite o nome do produto
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="descricao" className="text-sm font-medium">
          Descrição
        </Label>
        <Textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva as características do produto..."
          rows={3}
          className="rounded-xl resize-none"
          aria-describedby="descricao-hint"
        />
        <p id="descricao-hint" className="sr-only">
          Campo opcional para descrever o produto
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="preco" className="text-sm font-medium">
          Preço (R$)
        </Label>
        <Input
          id="preco"
          type="number"
          step="0.01"
          min="0"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="0,00"
          required
          className="h-11 rounded-xl"
          aria-describedby="preco-hint"
        />
        <p id="preco-hint" className="sr-only">
          Digite o preço em reais
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="categoria" className="text-sm font-medium">
          Categoria
        </Label>
        <Select value={categoria} onValueChange={setCategoria} required>
          <SelectTrigger 
            className="h-11 rounded-xl"
            aria-describedby="categoria-hint"
          >
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat} className="rounded-lg">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p id="categoria-hint" className="sr-only">
          Selecione a categoria do produto
        </p>
      </div>
      
      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="flex-1 h-11 rounded-xl bg-gradient-accent hover:opacity-90 transition-all font-medium"
        >
          {isLoading ? "Salvando..." : product ? "Atualizar" : "Criar Produto"}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="h-11 rounded-xl border-2"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
