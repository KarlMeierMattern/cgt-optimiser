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
import { format } from "date-fns";

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

  const remainingExclusion = 40000 - totalGain;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Optimisation Results</CardTitle>
        <CardDescription>
          Based on your input, here&apos;s the optimised selling strategy using
          FIFO method.
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
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Gain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.symbol}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>
                      {format(transaction.purchaseDate, "PPP")}
                    </TableCell>
                    <TableCell>
                      R{calculateGain(transaction).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-4 font-semibold">
              Annual exclusion utilised: R{totalGain.toFixed(2)}
            </p>
            <p className="mt-4 font-semibold">
              Remaining annual exclusion: R{remainingExclusion.toFixed(2)}
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
