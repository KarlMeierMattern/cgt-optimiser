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
  purchaseDate: Date;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [optimisationResults, setOptimisationResults] = useState<Transaction[]>(
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

  const sortTransactions = (transactions: Transaction[]) => {
    // First, group transactions by symbol
    const groupedTransactions = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.symbol]) {
        acc[transaction.symbol] = [];
      }
      acc[transaction.symbol].push(transaction);
      return acc;
    }, {} as Record<string, Transaction[]>);

    // Sort transactions within each symbol by date (FIFO)
    Object.values(groupedTransactions).forEach((group) => {
      group.sort((a, b) => a.purchaseDate.getTime() - b.purchaseDate.getTime());
    });

    // Create a map to store the earliest date for each symbol
    const symbolEarliestDates = new Map<string, Date>();
    Object.entries(groupedTransactions).forEach(([symbol, transactions]) => {
      symbolEarliestDates.set(symbol, transactions[0].purchaseDate);
    });

    // Calculate total gain per symbol
    const symbolGains = Object.entries(groupedTransactions).map(
      ([symbol, transactions]) => ({
        symbol,
        totalGain: transactions.reduce((sum, t) => sum + calculateGain(t), 0),
        earliestDate: symbolEarliestDates.get(symbol)!,
      })
    );

    // Sort symbols by total gain
    symbolGains.sort((a, b) => b.totalGain - a.totalGain);

    // Return transactions in correct order
    return symbolGains.map(({ symbol }) => groupedTransactions[symbol]).flat();
  };

  const optimizeCGT = () => {
    const sortedTransactions = sortTransactions(transactions);
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
          const partialTransaction = {
            ...transaction,
            quantity: partialQuantity,
            id: `${transaction.id}-partial`,
          };
          optimizedTransactions.push(partialTransaction);
          remainingExclusion = 0;
        }
        break;
      }

      if (remainingExclusion <= 0) break;
    }

    setOptimisationResults(optimizedTransactions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <TransactionForm onAddTransaction={addTransaction} />
            <div className="mt-4">
              <Button onClick={optimizeCGT}>Optimise CGT</Button>
            </div>
          </div>
          <div>
            <PortfolioTable
              transactions={transactions}
              sortTransactions={sortTransactions}
            />{" "}
            <OptimisationResults results={optimisationResults} />
          </div>
        </div>
      </main>
      <footer>
        <div className="fixed bottom-4 w-full text-center">
          <p>
            Built by{" "}
            <a
              className="underline text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/karl-alexander-meier-mattern-16a3b919a/"
            >
              Karl-Alexander
            </a>{" "}
            with 💜
          </p>
          <p>💌 DM me feature suggestions</p>
        </div>
      </footer>
    </div>
  );
}
