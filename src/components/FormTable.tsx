
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
  // Ensure we always have exactly 3 rows for the voucher
  useEffect(() => {
    if (rows.length < 3) {
      const newRows = [...rows];
      while (newRows.length < 3) {
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

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: uuidv4(),
        fineCardNumber: '',
        receiptNumber: '',
        improvementAmount: 0,
        fineAmount: 0,
        dueAmount: 0,
      },
    ]);
  };

  const handleRemoveRow = (id: string) => {
    // We don't allow removing if it would result in less than 3 rows
    if (rows.length > 3) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

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
      <table className="min-w-full bg-white divide-y divide-stone-200 rounded-md overflow-hidden shadow-soft">
        <thead>
          <tr className="bg-stone-50">
            <th className="font-arabic p-3 text-right">#</th>
            <th className="font-arabic p-3 text-right">رقم كرت الغرامة</th>
            <th className="font-arabic p-3 text-right">رقم سند التحصيل</th>
            <th className="font-arabic p-3 text-right">مبلغ التحسين</th>
            <th className="font-arabic p-3 text-right">مبلغ الغرامة</th>
            <th className="font-arabic p-3 text-right">المبلغ المستحق</th>
            <th className="font-arabic p-3 text-center">الإجراء</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {rows.slice(0, 3).map((row, index) => (
            <tr key={row.id} className="hover:bg-stone-50 transition-colors">
              <td className="p-3 text-center text-stone-500">{index + 1}</td>
              <td className="p-3">
                <Input
                  value={row.fineCardNumber}
                  onChange={(e) => handleUpdateRow(row.id, 'fineCardNumber', e.target.value)}
                  className="font-arabic text-right"
                  dir="rtl"
                />
              </td>
              <td className="p-3">
                <Input
                  value={row.receiptNumber}
                  onChange={(e) => handleUpdateRow(row.id, 'receiptNumber', e.target.value)}
                  className="font-arabic text-right"
                  dir="rtl"
                />
              </td>
              <td className="p-3">
                <Input
                  type="number"
                  value={row.improvementAmount || ''}
                  onChange={(e) => handleUpdateRow(row.id, 'improvementAmount', Number(e.target.value))}
                  className="font-arabic text-right"
                  dir="rtl"
                />
              </td>
              <td className="p-3 font-arabic text-right text-stone-600 font-medium">
                {formatCurrency(row.fineAmount || 0)}
              </td>
              <td className="p-3 font-arabic text-right text-stone-600 font-medium">
                {formatCurrency(row.dueAmount || 0)}
              </td>
              <td className="p-3 text-center">
                {/* Button removed since we maintain exactly 3 rows */}
              </td>
            </tr>
          ))}
          {/* Summary row */}
          <tr className="bg-stone-100 font-bold">
            <td colSpan={3} className="p-3 text-right font-arabic">الإجمالي</td>
            <td className="p-3 font-arabic text-right border-t-2 border-stone-300">
              {formatCurrency(totalImprovementAmount)}
            </td>
            <td className="p-3 font-arabic text-right border-t-2 border-stone-300">
              {formatCurrency(totalFineAmount)}
            </td>
            <td className="p-3 font-arabic text-right border-t-2 border-stone-300">
              {formatCurrency(totalDueAmount)}
            </td>
            <td className="p-3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
