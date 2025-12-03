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

const CATEGORIES = ["Eletrônicos", "Calçados", "Vestuário", "Acessórios", "Casa", "Esporte"];

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do produto"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição do produto"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="preco">Preço (R$)</Label>
        <Input
          id="preco"
          type="number"
          step="0.01"
          min="0"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoria</Label>
        <Select value={categoria} onValueChange={setCategoria} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Salvando..." : product ? "Atualizar" : "Criar"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
