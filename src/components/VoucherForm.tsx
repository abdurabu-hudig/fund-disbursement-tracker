
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import FormTable from './FormTable';
import SignatureSection from './SignatureSection';
import { VoucherRow, formatCurrency } from '@/utils/calculations';
import VoucherHeader from './VoucherComponents/VoucherHeader';
import DateSelector from './VoucherComponents/DateSelector';
import LocationInput from './VoucherComponents/LocationInput';
import RecipientInfo from './VoucherComponents/RecipientInfo';
import ActionButtons from './VoucherComponents/ActionButtons';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const VoucherForm: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [rows, setRows] = useState<VoucherRow[]>([
    {
      id: uuidv4(),
      fineCardNumber: '',
      receiptNumber: '',
      improvementAmount: 0,
      fineAmount: 0,
      dueAmount: 0,
    }
  ]);

  // Calculate total amounts
  const totalImprovementAmount = rows.reduce((sum, row) => sum + (row.improvementAmount || 0), 0);
  const totalFineAmount = rows.reduce((sum, row) => sum + (row.fineAmount || 0), 0);
  const totalDueAmount = rows.reduce((sum, row) => sum + (row.dueAmount || 0), 0);

  const handleSave = async () => {
    // Perform validation
    if (!location) {
      toast({
        title: "حقل مطلوب",
        description: "يرجى إدخال اسم الموقع أو البوابة",
        variant: "destructive"
      });
      return;
    }

    if (!recipientName) {
      toast({
        title: "حقل مطلوب",
        description: "يرجى إدخال اسم المستلم",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);
      
      // Generate voucher number (simple format: YYYY-MM-DD-random)
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
      const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      const voucherNumber = `V${dateStr}-${randomPart}`;
      
      // Save voucher to Supabase
      const { data, error } = await supabase
        .from('vouchers')
        .insert([
          {
            voucher_number: voucherNumber,
            date: date.toISOString(),
            location: location,
            recipient_name: recipientName,
            recipient_phone: recipientPhone,
            total_amount: totalDueAmount,
            improvement_amount: totalImprovementAmount,
            fine_amount: totalFineAmount,
            voucher_details: rows
          }
        ])
        .select();

      if (error) throw error;
      
      toast({
        title: "تم الحفظ",
        description: "تم حفظ السند بنجاح",
      });
      
      // Navigate back to dashboard after short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error: any) {
      console.error('Error saving voucher:', error);
      toast({
        title: "خطأ في الحفظ",
        description: error.message || "حدث خطأ أثناء حفظ السند",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4 animate-fade-in page-transition print:p-0">
      {/* A4 Paper Dimensions: 210mm × 297mm */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-6 max-w-[210mm] mx-auto print:min-h-0 min-h-[297mm] flex flex-col">
        <VoucherHeader />

        <div className="p-4 print:p-2">
          <div className="flex flex-row-reverse justify-between items-start mb-4">
            <LocationInput location={location} setLocation={setLocation} />
            <DateSelector date={date} setDate={setDate} />
          </div>

          {/* Data entry table */}
          <div className="my-4">
            <h3 className="font-arabic text-lg font-medium text-stone-700 mb-2 text-right">بيانات السند</h3>
            <FormTable rows={rows} setRows={setRows} />
          </div>

          {/* Recipient information */}
          <RecipientInfo 
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            recipientPhone={recipientPhone}
            setRecipientPhone={setRecipientPhone}
          />

          {/* Signature section */}
          <SignatureSection />
        </div>

        {/* Action buttons */}
        <ActionButtons 
          onSave={handleSave} 
          location={location} 
          recipientName={recipientName}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default VoucherForm;
