import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/api";
import { Package } from "lucide-react";
import Modal from "../components/ui/Modal";
import ProductForm from "../components/forms/ProductForm";
import type { Product } from "../types/product";

interface Category {
  id: string;
  name: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}products`).then(res => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      }),
      fetch(`${API_BASE_URL}categories`).then(res => {
        if (!res.ok) throw new Error("Erro ao carregar categorias");
        return res.json();
      }),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getCategoryName = (idCategory: string) => {
    return categories.find(cat => cat.id === idCategory)?.name || idCategory;
  };

  const handleSaveProduct = (updated: Product) => {
    const payload = {
      name: updated.name,
      description: updated.description,
      price: Number(updated.price),
      idCategory: updated.idCategory,
      stockQuantity: Number(updated.stockQuantity)
    };

    fetch(`${API_BASE_URL}products/${updated.idProduct}`, { 
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      if (!res.ok) throw new Error("Erro ao salvar produto");

      // tenta parsear JSON, mas se não tiver conteúdo, retorna null
      const text = await res.text();
      return text ? JSON.parse(text) : null;
    })
    .then((saved: Product | null) => {
      if (saved) {
        setProducts((prev) =>
          prev.map((p) => (p.idProduct === saved.idProduct ? saved : p))
        );
      }
      setSelectedProduct(null);
    })

      .catch((err) => {
        alert(err.message);
      });
  };

  if (loading) {
    return (
      <div className="bg-white rounded shadow-sm p-4 text-gray-600">
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded shadow-sm p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded shadow-sm p-4">
        <h2 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
          <Package className="w-6 h-6" />
          Produtos
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-600">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4 text-center">Preço</th>
                <th className="py-3 px-4 text-center">Categoria</th>
                <th className="py-3 px-4 text-center">Em Estoque</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.idProduct}  
                  onClick={() => setSelectedProduct(product)}
                  className={`cursor-pointer transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4 text-indigo-600 font-semibold text-center">
                    R${product.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">{getCategoryName(product.idCategory)}</td>
                  <td className="py-3 px-4 text-center">{product.stockQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title="Editar Produto"
      >
        {selectedProduct && (
          <ProductForm
            product={selectedProduct}
            onCancel={() => setSelectedProduct(null)}
            onSave={handleSaveProduct}
          />
        )}
      </Modal>
    </>
  );
}
