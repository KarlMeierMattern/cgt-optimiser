import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "../page";

interface PortfolioTableProps {
  transactions: Transaction[];
}

export default function PortfolioTable({ transactions }: PortfolioTableProps) {
  const calculateGain = (transaction: Transaction) => {
    return (
      transaction.quantity *
      (transaction.currentPrice - transaction.purchasePrice)
    );
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => calculateGain(b) - calculateGain(a)
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Current Price</TableHead>
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
              <TableCell>R{calculateGain(transaction).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
