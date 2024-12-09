import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "../page";
import { format } from "date-fns";

interface PortfolioTableProps {
  transactions: Transaction[];
  sortTransactions: (transactions: Transaction[]) => Transaction[];
}

export default function PortfolioTable({
  transactions,
  sortTransactions,
}: PortfolioTableProps) {
  const calculateGain = (transaction: Transaction) => {
    return (
      transaction.quantity *
      (transaction.currentPrice - transaction.purchasePrice)
    );
  };

  const sortedTransactions = sortTransactions(transactions);

  return (
    <div className="rounded-md border w-full max-w-xs sm:max-w-none">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Total Gain</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.symbol}</TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell>R{transaction.purchasePrice.toFixed(2)}</TableCell>
              <TableCell>R{transaction.currentPrice.toFixed(2)}</TableCell>
              <TableCell>{format(transaction.purchaseDate, "PPP")}</TableCell>
              <TableCell>R{calculateGain(transaction).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
