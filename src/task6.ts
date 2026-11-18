type Invoice = { 
  id: string; 
  amount: number; 
  status: "paid" | "free" 
};

function sumByStatus(invoices: readonly Invoice[]): { paid: number; free: number } {
  return invoices.reduce(
    (acc, invoice) => {
      acc[invoice.status] += invoice.amount;
      return acc;
    },
    { paid: 0, free: 0 }
  );
}


const mixedInvoices: readonly Invoice[] = [
  { id: "1", amount: 1500, status: "paid" },
  { id: "2", amount: 300, status: "free" },
  { id: "3", amount: 2500, status: "paid" },
  { id: "4", amount: 450, status: "free" },
];
const emptyInvoices: readonly Invoice[] = [];

console.log(sumByStatus(mixedInvoices));
console.log(sumByStatus(emptyInvoices));