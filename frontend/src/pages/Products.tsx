import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/api";
import { Package } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}products`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-4 text-gray-600">
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm p-4">
      <h2 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
        <Package className="w-6 h-6" />
        Estoque de Produtos
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-600">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Preço</th>
              <th className="py-3 px-4">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, name, price, idCategory }, index) => (
              <tr
                key={id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-4">{name}</td>
                <td className="py-3 px-4 text-indigo-600 font-semibold">R${price}</td>
                <td className="py-3 px-4">{idCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
