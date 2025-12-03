-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL DEFAULT 0,
  categoria TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public access for this demo
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Public insert access
CREATE POLICY "Anyone can create products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

-- Public update access
CREATE POLICY "Anyone can update products" 
ON public.products 
FOR UPDATE 
USING (true);

-- Public delete access
CREATE POLICY "Anyone can delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert 5 sample products
INSERT INTO public.products (nome, descricao, preco, categoria) VALUES
('iPhone 15 Pro', 'Smartphone Apple com chip A17 Pro e câmera de 48MP', 8999.00, 'Eletrônicos'),
('Nike Air Max', 'Tênis esportivo com tecnologia Air para máximo conforto', 799.90, 'Calçados'),
('MacBook Pro 14"', 'Notebook Apple com chip M3 Pro, 18GB RAM', 18999.00, 'Eletrônicos'),
('Camiseta Básica', 'Camiseta 100% algodão, corte regular', 79.90, 'Vestuário'),
('Fone Bluetooth JBL', 'Fone de ouvido sem fio com cancelamento de ruído', 459.00, 'Eletrônicos');