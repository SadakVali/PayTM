import { Card } from "@repo/ui/card";

interface propTypes {
  time: Date;
  amount: number;
  status: string; // TODO: can the type of the "status" be more specific?
  provider: string;
}

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: propTypes[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions" href="">
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions" href="">
      <div className="pt-2">
        {transactions.map((transaction) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Recieved INR</div>
              <div className="text-xs text-slate-600">
                {transaction.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {transaction.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
