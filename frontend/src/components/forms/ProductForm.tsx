import React, { useState, useEffect } from "react";
import type { Product } from "../../types/product";

interface ProductFormProps {
  product: Product;
  onCancel: () => void;
  onSave: (updated: Product) => void;
}

export default function ProductForm({ product, onCancel, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      idProduct: prev.idProduct, // mantém sempre o idProduct original
      [name]:
        name === "price" || name === "stockQuantity"
          ? Number(value) || 0
          : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Envia todos os campos mantendo idProduct
    onSave({
      ...formData,
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações principais */}
      <div className="grid grid-cols-1  gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nome</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Descrição</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Preço e Estoque */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Preço</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Quantidade em Estoque</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Categoria */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Categoria</label>
        <input
          name="idCategory"
          value={formData.idCategory}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Excluir
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ms-auto"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
