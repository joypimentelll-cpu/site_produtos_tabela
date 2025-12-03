import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    const productId = url.searchParams.get('id');

    console.log(`[products] ${req.method} request received`, { productId });

    // GET - List all products or get one by ID
    if (req.method === 'GET') {
      if (productId) {
        const { data, error } = await supabaseClient
          .from('products')
          .select('*')
          .eq('id', productId)
          .maybeSingle();

        if (error) {
          console.error('[products] GET error:', error);
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[products] GET all error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log(`[products] Returning ${data?.length || 0} products`);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST - Create new product
    if (req.method === 'POST') {
      const body = await req.json();
      console.log('[products] Creating product:', body);

      const { data, error } = await supabaseClient
        .from('products')
        .insert({
          nome: body.nome,
          descricao: body.descricao,
          preco: body.preco,
          categoria: body.categoria,
        })
        .select()
        .single();

      if (error) {
        console.error('[products] POST error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('[products] Product created:', data.id);
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // PUT/PATCH - Update product
    if (req.method === 'PUT' || req.method === 'PATCH') {
      if (!productId) {
        return new Response(JSON.stringify({ error: 'Product ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const body = await req.json();
      console.log('[products] Updating product:', productId, body);

      const { data, error } = await supabaseClient
        .from('products')
        .update({
          nome: body.nome,
          descricao: body.descricao,
          preco: body.preco,
          categoria: body.categoria,
        })
        .eq('id', productId)
        .select()
        .single();

      if (error) {
        console.error('[products] PUT error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('[products] Product updated:', data.id);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // DELETE - Delete product
    if (req.method === 'DELETE') {
      if (!productId) {
        return new Response(JSON.stringify({ error: 'Product ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('[products] Deleting product:', productId);

      const { error } = await supabaseClient
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('[products] DELETE error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('[products] Product deleted:', productId);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[products] Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
