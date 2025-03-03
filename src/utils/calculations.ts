
export interface VoucherRow {
  id: string;
  fineCardNumber: string;
  receiptNumber: string;
  improvementAmount: number;
  fineAmount: number;
  dueAmount: number;
}

export interface VoucherSummary {
  totalImprovementAmount: number;
  totalFineAmount: number;
  totalDueAmount: number;
  totalRowCount: number;
}

export const calculateRowDueAmount = (
  improvementAmount: number
): number => {
  // Due amount is same as fine amount (50% of improvement)
  return improvementAmount * 0.5;
};

export const calculateVoucherSummary = (
  rows: VoucherRow[]
): VoucherSummary => {
  const initialSummary: VoucherSummary = {
    totalImprovementAmount: 0,
    totalFineAmount: 0,
    totalDueAmount: 0,
    totalRowCount: rows.length,
  };

  return rows.reduce((summary, row) => {
    return {
      totalImprovementAmount: summary.totalImprovementAmount + (row.improvementAmount || 0),
      totalFineAmount: summary.totalFineAmount + (row.fineAmount || 0),
      totalDueAmount: summary.totalDueAmount + (row.dueAmount || 0),
      totalRowCount: summary.totalRowCount,
    };
  }, initialSummary);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
