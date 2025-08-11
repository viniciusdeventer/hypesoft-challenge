import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);

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


  return (
    <div className="bg-white shadow-sm rounded-2xl p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Estoque de Produtos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-600">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Preço</th>
              <th className="py-3 px-4">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, name, price, category }, index) => (
              <tr
                key={id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-4 font-medium text-gray-800">{id}</td>
                <td className="py-3 px-4">{name}</td>
                <td className="py-3 px-4 text-green-600 font-semibold">R$ {price}</td>
                <td className="py-3 px-4">{category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
