"use client";

import React from "react";

interface Transaction {
  id: string;
  amount: number;
  type: "buy" | "sell";
  date: string;
  nftName: string;
}

// Mock de dados
const mockTransactions: Transaction[] = [
  {
    id: "tx001",
    amount: 100,
    type: "buy",
    date: "2025-04-25T10:00:00Z",
    nftName: "Hope Tree #001",
  },
  {
    id: "tx002",
    amount: 150,
    type: "sell",
    date: "2025-04-24T14:30:00Z",
    nftName: "Hope Tree #002",
  },
  {
    id: "tx003",
    amount: 120,
    type: "buy",
    date: "2025-04-23T09:15:00Z",
    nftName: "Hope Tree #003",
  },
];

export default function History() {
//   const { data: transactions = mockTransactions } = useQuery({
//     queryKey: ["transaction-history"],
//     queryFn: (): Promise<Transaction[]> =>
//       api.get("transactions").then((response) => response.data),
//     refetchOnWindowFocus: false,
//     initialData: mockTransactions,
//   });

  return (
    <div className="flex flex-col flex-1 py-5 px-8 gap-8 overflow-hidden">
      <h1 className="text-2xl font-bold text-center">Histórico de Compras</h1>

      {/* Tabela de Transações */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">NFT</th>
              <th className="py-3 px-4 text-left">Tipo</th>
              <th className="py-3 px-4 text-left">Valor (USD)</th>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-left">ID</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="py-3 px-4">{tx.nftName}</td>
                <td className="py-3 px-4 capitalize">{tx.type === "buy" ? "Compra" : "Venda"}</td>
                <td className="py-3 px-4 text-green-600 font-bold">{tx.amount} USD</td>
                <td className="py-3 px-4">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">{tx.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mockTransactions.length === 0 && (
        <p className="text-center text-gray-500">Nenhuma transação encontrada.</p>
      )}
    </div>
  );
}
