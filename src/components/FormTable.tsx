
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { VoucherRow, calculateRowDueAmount, formatCurrency } from '@/utils/calculations';
import { v4 as uuidv4 } from 'uuid';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';

interface FormTableProps {
  rows: VoucherRow[];
  setRows: React.Dispatch<React.SetStateAction<VoucherRow[]>>;
}

const FormTable: React.FC<FormTableProps> = ({ rows, setRows }) => {
  const isMobile = useIsMobile();
  
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

  // Convert input value from Arabic numerals to standard digits for processing
  const convertArabicToStandard = (value: string): string => {
    return value
      .replace(/[\u0660-\u0669]/g, (c) => (c.charCodeAt(0) - 0x0660).toString())
      .replace(/[\u06F0-\u06F9]/g, (c) => (c.charCodeAt(0) - 0x06F0).toString());
  };

  // Calculate summary totals
  const totalImprovementAmount = rows.reduce((sum, row) => sum + (row.improvementAmount || 0), 0);
  const totalFineAmount = rows.reduce((sum, row) => sum + (row.fineAmount || 0), 0);
  const totalDueAmount = rows.reduce((sum, row) => sum + (row.dueAmount || 0), 0);

  if (isMobile) {
    return (
      <div className="space-y-4">
        {rows.slice(0, 1).map((row) => (
          <Card key={row.id} className="p-4 space-y-3 border-2 border-stone-300">
            <div className="space-y-2">
              <label className="block font-arabic text-right text-sm text-stone-600">رقم كرت الغرامة</label>
              <Input
                value={row.fineCardNumber}
                onChange={(e) => handleUpdateRow(row.id, 'fineCardNumber', e.target.value)}
                className="font-arabic text-center"
                dir="rtl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block font-arabic text-right text-sm text-stone-600">رقم سند التحصيل</label>
              <Input
                value={row.receiptNumber}
                onChange={(e) => handleUpdateRow(row.id, 'receiptNumber', e.target.value)}
                className="font-arabic text-center"
                dir="rtl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block font-arabic text-right text-sm text-stone-600">مبلغ التحسين</label>
              <Input
                type="text"
                value={row.improvementAmount || ''}
                onChange={(e) => {
                  const standardValue = convertArabicToStandard(e.target.value);
                  if (standardValue === '' || /^\d*$/.test(standardValue)) {
                    handleUpdateRow(row.id, 'improvementAmount', Number(standardValue));
                  }
                }}
                className="font-arabic text-center"
                dir="rtl"
                inputMode="numeric"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block font-arabic text-right text-sm text-stone-600">مبلغ الغرامة</label>
              <p className="font-arabic text-center p-2 bg-stone-50 border border-stone-200 rounded-md">
                {formatCurrency(row.fineAmount || 0)}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="block font-arabic text-right text-sm text-stone-600">المبلغ المستحق</label>
              <p className="font-arabic text-center p-2 bg-stone-50 border border-stone-200 rounded-md">
                {formatCurrency(row.dueAmount || 0)}
              </p>
            </div>
          </Card>
        ))}

        {/* Summary Card */}
        <Card className="p-4 bg-stone-100 border-2 border-stone-300">
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <h3 className="font-arabic text-right font-bold">الاجمالي:</h3>
            </div>
            <div className="space-y-1">
              <label className="block font-arabic text-right text-xs text-stone-600">مبلغ التحسين</label>
              <p className="font-arabic text-center p-2 bg-white border border-stone-200 rounded-md">
                {formatCurrency(totalImprovementAmount)}
              </p>
            </div>
            <div className="space-y-1">
              <label className="block font-arabic text-right text-xs text-stone-600">مبلغ الغرامة</label>
              <p className="font-arabic text-center p-2 bg-white border border-stone-200 rounded-md">
                {formatCurrency(totalFineAmount)}
              </p>
            </div>
            <div className="col-span-2 space-y-1">
              <label className="block font-arabic text-right text-xs text-stone-600">المبلغ المستحق</label>
              <p className="font-arabic text-center p-2 bg-white border border-stone-200 rounded-md font-bold">
                {formatCurrency(totalDueAmount)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Desktop view with table layout
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
                  type="text"
                  value={row.improvementAmount || ''}
                  onChange={(e) => {
                    const standardValue = convertArabicToStandard(e.target.value);
                    if (standardValue === '' || /^\d*$/.test(standardValue)) {
                      handleUpdateRow(row.id, 'improvementAmount', Number(standardValue));
                    }
                  }}
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
