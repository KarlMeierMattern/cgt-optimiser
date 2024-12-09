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

    // Create a list of all transactions with their FIFO-sorted positions
    const allTransactions = Object.values(groupedTransactions).flat();

    // Sort all transactions by gain, but maintain FIFO order within same symbol
    return allTransactions.sort((a, b) => {
      const gainA = calculateGain(a);
      const gainB = calculateGain(b);

      // If different symbols, sort by gain
      if (a.symbol !== b.symbol) {
        return gainB - gainA;
      }

      // If same symbol, maintain FIFO order
      return a.purchaseDate.getTime() - b.purchaseDate.getTime();
    });
  };

  const optimizeCGT = () => {
    const sortedTransactions = sortTransactions(transactions);
    let remainingExclusion = 40000;
    const optimizedTransactions: Transaction[] = [];
    let currentIndex = 0;

    while (remainingExclusion > 0 && currentIndex < sortedTransactions.length) {
      const transaction = sortedTransactions[currentIndex];
      const gainPerShare = transaction.currentPrice - transaction.purchasePrice;
      const maxSharesPossible = Math.floor(remainingExclusion / gainPerShare);

      if (maxSharesPossible >= transaction.quantity) {
        // Can sell all shares from this transaction
        const gain = calculateGain(transaction);
        optimizedTransactions.push(transaction);
        remainingExclusion -= gain;
        currentIndex++;
      } else if (maxSharesPossible > 0) {
        // Can sell partial shares from this transaction
        const partialTransaction = {
          ...transaction,
          quantity: maxSharesPossible,
          id: `${transaction.id}-partial`,
        };
        const gain = calculateGain(partialTransaction);
        optimizedTransactions.push(partialTransaction);
        remainingExclusion -= gain;
        currentIndex++;
      } else {
        // Can't sell any shares from this transaction, try next one
        currentIndex++;
      }
    }

    setOptimisationResults(optimizedTransactions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto pt-8 pb-32 pl-4">
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
        <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 text-center">
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
