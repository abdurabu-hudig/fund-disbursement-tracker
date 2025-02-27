
import React from 'react';
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
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleUpdateRow = (id: string, field: keyof VoucherRow, value: string | number) => {
    setRows(
      rows.map((row) => {
        if (row.id !== id) return row;

        const updatedRow = { ...row, [field]: value };

        // Recalculate due amount when improvement or fine amount changes
        if (field === 'improvementAmount' || field === 'fineAmount') {
          updatedRow.dueAmount = calculateRowDueAmount(
            field === 'improvementAmount' ? Number(value) : row.improvementAmount,
            field === 'fineAmount' ? Number(value) : row.fineAmount
          );
        }

        return updatedRow;
      })
    );
  };

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
          {rows.map((row, index) => (
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
              <td className="p-3">
                <Input
                  type="number"
                  value={row.fineAmount || ''}
                  onChange={(e) => handleUpdateRow(row.id, 'fineAmount', Number(e.target.value))}
                  className="font-arabic text-right"
                  dir="rtl"
                />
              </td>
              <td className="p-3 font-arabic text-right text-stone-600 font-medium">
                {formatCurrency(row.dueAmount || 0)}
              </td>
              <td className="p-3 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveRow(row.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleAddRow}
          variant="outline"
          className="font-arabic flex items-center gap-2"
        >
          <Plus size={16} />
          <span>إضافة صف جديد</span>
        </Button>
      </div>
    </div>
  );
};

export default FormTable;
