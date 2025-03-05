
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { VoucherRow, calculateRowDueAmount, formatCurrency } from '@/utils/calculations';
import { v4 as uuidv4 } from 'uuid';

interface FormTableProps {
  rows: VoucherRow[];
  setRows: React.Dispatch<React.SetStateAction<VoucherRow[]>>;
}

const FormTable: React.FC<FormTableProps> = ({ rows, setRows }) => {
  // Ensure we always have exactly 1 row for the voucher based on the reference image
  useEffect(() => {
    if (rows.length < 1) {
      const newRows = [...rows];
      while (newRows.length < 1) {
        newRows.push({
          id: uuidv4(),
          fineCardNumber: '',
          receiptNumber: '',
          improvementAmount: 0,
          fineAmount: 0,
          dueAmount: 0,
        });
      }
      setRows(newRows);
    }
  }, [rows, setRows]);

  const handleUpdateRow = (id: string, field: keyof VoucherRow, value: string | number) => {
    setRows(
      rows.map((row) => {
        if (row.id !== id) return row;

        const updatedRow = { ...row, [field]: value };

        // Calculate fine amount as 50% of improvement amount
        if (field === 'improvementAmount') {
          const improvementAmount = Number(value);
          const fineAmount = improvementAmount * 0.5; // 50% of improvement amount
          updatedRow.fineAmount = fineAmount;
          updatedRow.dueAmount = fineAmount; // Due amount is the same as fine amount
        }

        return updatedRow;
      })
    );
  };

  // Calculate summary totals
  const totalImprovementAmount = rows.reduce((sum, row) => sum + (row.improvementAmount || 0), 0);
  const totalFineAmount = rows.reduce((sum, row) => sum + (row.fineAmount || 0), 0);
  const totalDueAmount = rows.reduce((sum, row) => sum + (row.dueAmount || 0), 0);

  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full bg-white divide-y divide-stone-200 rounded-md overflow-hidden shadow-soft border-2 border-stone-300">
        <thead>
          <tr className="bg-stone-100 text-center">
            <th className="font-arabic p-3 text-center border-2 border-stone-300">المبلغ المستحق</th>
            <th className="font-arabic p-3 text-center border-2 border-stone-300">مبلغ الغرامة</th>
            <th className="font-arabic p-3 text-center border-2 border-stone-300">مبلغ التحسين</th>
            <th className="font-arabic p-3 text-center border-2 border-stone-300">رقم سند التحصيل</th>
            <th className="font-arabic p-3 text-center border-2 border-stone-300">رقم كرت الغرامة</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 1).map((row, index) => (
            <tr key={row.id} className="hover:bg-stone-50 transition-colors border-2 border-stone-300">
              <td className="p-3 font-arabic text-center border-2 border-stone-300">
                {formatCurrency(row.dueAmount || 0)}
              </td>
              <td className="p-3 font-arabic text-center border-2 border-stone-300">
                {formatCurrency(row.fineAmount || 0)}
              </td>
              <td className="p-3 border-2 border-stone-300">
                <Input
                  type="number"
                  value={row.improvementAmount || ''}
                  onChange={(e) => handleUpdateRow(row.id, 'improvementAmount', Number(e.target.value))}
                  className="font-arabic text-center"
                  dir="rtl"
                  inputMode="numeric"
                />
              </td>
              <td className="p-3 border-2 border-stone-300">
                <Input
                  value={row.receiptNumber}
                  onChange={(e) => handleUpdateRow(row.id, 'receiptNumber', e.target.value)}
                  className="font-arabic text-center"
                  dir="rtl"
                />
              </td>
              <td className="p-3 border-2 border-stone-300">
                <Input
                  value={row.fineCardNumber}
                  onChange={(e) => handleUpdateRow(row.id, 'fineCardNumber', e.target.value)}
                  className="font-arabic text-center"
                  dir="rtl"
                />
              </td>
            </tr>
          ))}
          {/* Summary row - spans the first 2 columns */}
          <tr className="bg-stone-100 font-bold border-2 border-stone-300">
            <td className="p-3 font-arabic text-center border-2 border-stone-300">
              {formatCurrency(totalDueAmount)}
            </td>
            <td className="p-3 font-arabic text-center border-2 border-stone-300">
              {formatCurrency(totalFineAmount)}
            </td>
            <td className="p-3 font-arabic text-center border-2 border-stone-300">
              {formatCurrency(totalImprovementAmount)}
            </td>
            <td colSpan={2} className="p-3 text-center font-arabic border-2 border-stone-300">الاجمالي</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
