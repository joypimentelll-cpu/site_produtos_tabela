import { useState } from "react";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, Product, ProductInput } from "@/hooks/useProducts";
import { ProductForm } from "@/components/ProductForm";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { Plus, Package, Loader2, Sun, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

// Import product images
import productMain from "@/assets/product-main.webp";

const Index = () => {
  const { data: products, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: ProductInput) => {
    if (editingProduct) {
      updateProduct.mutate({ ...data, id: editingProduct.id }, {
        onSuccess: () => {
          setIsFormOpen(false);
          toast.success("Produto atualizado com sucesso!");
        },
      });
    } else {
      createProduct.mutate(data, {
        onSuccess: () => {
          setIsFormOpen(false);
          toast.success("Produto criado com sucesso!");
        },
      });
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct.mutate(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
          toast.success("Produto excluído com sucesso!");
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* Hero Header */}
      <header className="relative overflow-hidden" role="banner">
        <div className="absolute inset-0 bg-pastel-lavender/30" aria-hidden="true" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft">
              <Sun className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">Proteção Solar Premium</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Catálogo de{" "}
              <span className="text-primary">Protetores Solares</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Descubra nossa linha exclusiva de protetores solares com tecnologia de maquiagem. 
              Proteção UVA, UVB e UVA Longo com acabamento natural.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-4" role="list" aria-label="Características dos produtos">
              <div className="flex items-center gap-2 bg-pastel-mint px-4 py-2 rounded-full" role="listitem">
                <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">FPS 70</span>
              </div>
              <div className="flex items-center gap-2 bg-pastel-blue px-4 py-2 rounded-full" role="listitem">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">Efeito Make-up</span>
              </div>
              <div className="flex items-center gap-2 bg-pastel-pink px-4 py-2 rounded-full" role="listitem">
                <Sun className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">12H Cobertura</span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleCreate}
                size="lg"
                className="h-14 px-8 text-lg font-semibold rounded-2xl bg-gradient-accent hover:opacity-90 transition-all shadow-elevated"
                aria-label="Adicionar novo produto ao catálogo"
              >
                <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
                Novo Produto
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 pb-24" role="main" tabIndex={-1}>
        {isLoading ? (
          <div 
            className="flex flex-col items-center justify-center py-20 gap-4" 
            role="status" 
            aria-label="Carregando produtos"
          >
            <Loader2 className="h-12 w-12 animate-spin text-primary" aria-hidden="true" />
            <p className="text-muted-foreground font-medium">Carregando produtos...</p>
          </div>
        ) : error ? (
          <div 
            className="text-center py-20 bg-destructive/10 rounded-2xl" 
            role="alert"
            aria-live="assertive"
          >
            <p className="text-destructive font-medium text-lg">
              Erro ao carregar produtos. Por favor, tente novamente.
            </p>
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-20 space-y-6 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-accent rounded-full flex items-center justify-center">
              <Package className="h-12 w-12 text-primary" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Nenhum produto cadastrado
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Comece adicionando seu primeiro produto ao catálogo de protetores solares.
              </p>
            </div>
            <Button 
              onClick={handleCreate} 
              size="lg"
              className="h-12 px-6 rounded-xl bg-gradient-accent hover:opacity-90 transition-all"
            >
              <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
              Cadastrar Primeiro Produto
            </Button>
          </div>
        ) : (
          <section aria-labelledby="products-heading" className="space-y-8">
            <h2 id="products-heading" className="sr-only">Lista de Produtos</h2>
            
            {/* Featured First Product */}
            {products && products.length > 0 && (
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <ProductCard
                  product={products[0]}
                  onEdit={handleEdit}
                  onDelete={(id) => setDeleteId(id)}
                  featured={true}
                  imageUrl={productMain}
                />
              </div>
            )}

            {/* Other Products Grid */}
            {products && products.length > 1 && (
              <div 
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
                aria-label="Outros produtos"
              >
                {products.slice(1).map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                    role="listitem"
                  >
                    <ProductCard
                      product={product}
                      onEdit={handleEdit}
                      onDelete={(id) => setDeleteId(id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Solar Expertise. Proteção solar com tecnologia de maquiagem.
          </p>
        </div>
      </footer>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent 
          className="sm:max-w-[500px] rounded-2xl"
          aria-describedby="dialog-description"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
            <p id="dialog-description" className="text-sm text-muted-foreground">
              {editingProduct 
                ? "Atualize as informações do produto abaixo." 
                : "Preencha os dados para cadastrar um novo produto."}
            </p>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            isLoading={createProduct.isPending || updateProduct.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl">
              Confirmar Exclusão
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="rounded-xl bg-destructive hover:bg-destructive/90"
            >
              {deleteProduct.isPending ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
