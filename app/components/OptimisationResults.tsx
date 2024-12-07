import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transaction } from "../page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OptimizationResultsProps {
  results: Transaction[];
}

export default function OptimizationResults({
  results,
}: OptimizationResultsProps) {
  const calculateGain = (transaction: Transaction) => {
    return (
      transaction.quantity *
      (transaction.currentPrice - transaction.purchasePrice)
    );
  };

  const totalGain = results.reduce(
    (sum, transaction) => sum + calculateGain(transaction),
    0
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Optimization Results</CardTitle>
        <CardDescription>
          Based on your input, here's the optimized selling strategy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {results.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Quantity to Sell</TableHead>
                  <TableHead>Gain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.symbol}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>
                      R{calculateGain(transaction).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-4 font-semibold">
              Total Gain: R{totalGain.toFixed(2)}
            </p>
          </>
        ) : (
          <p>
            Click &quot;Optimise CGT&quot; to see the recommended selling
            strategy.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
