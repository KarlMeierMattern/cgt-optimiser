"use client";

import { useState } from "react";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import PortfolioTable from "./components/PortfolioTable";
import OptimisationResults from "./components/OptimisationResults";
import { Button } from "@/components/ui/button";

export interface Transaction {
  id: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [optimizationResults, setOptimizationResults] = useState<Transaction[]>(
    []
  );

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions([...transactions, newTransaction]);
  };

  const calculateGain = (transaction: Transaction) => {
    return (
      transaction.quantity *
      (transaction.currentPrice - transaction.purchasePrice)
    );
  };

  const optimizeCGT = () => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => calculateGain(b) - calculateGain(a)
    );
    let remainingExclusion = 40000;
    const optimizedTransactions: Transaction[] = [];

    for (const transaction of sortedTransactions) {
      const gain = calculateGain(transaction);
      if (gain <= remainingExclusion) {
        optimizedTransactions.push(transaction);
        remainingExclusion -= gain;
      } else if (remainingExclusion > 0) {
        const partialQuantity = Math.floor(
          (remainingExclusion / gain) * transaction.quantity
        );
        if (partialQuantity > 0) {
          optimizedTransactions.push({
            ...transaction,
            quantity: partialQuantity,
            id: `${transaction.id}-partial`,
          });
        }
        break;
      } else {
        break;
      }
    }

    setOptimizationResults(optimizedTransactions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          South African CGT Optimization Tool
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <TransactionForm onAddTransaction={addTransaction} />
            <div className="mt-4">
              <Button onClick={optimizeCGT}>Optimise CGT</Button>
            </div>
          </div>
          <div>
            <PortfolioTable transactions={transactions} />
            <OptimisationResults results={optimizationResults} />
          </div>
        </div>
      </main>
    </div>
  );
}
