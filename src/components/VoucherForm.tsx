
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import FormTable from './FormTable';
import SignatureSection from './SignatureSection';
import { VoucherRow } from '@/utils/calculations';
import VoucherHeader from './VoucherComponents/VoucherHeader';
import DateSelector from './VoucherComponents/DateSelector';
import LocationInput from './VoucherComponents/LocationInput';
import RecipientInfo from './VoucherComponents/RecipientInfo';
import ActionButtons from './VoucherComponents/ActionButtons';

const VoucherForm: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
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

  const handleSave = () => {
    // Simulate saving
    toast({
      title: "تم الحفظ",
      description: "تم حفظ السند بنجاح",
    });

    // In a real app, you would save the data to a database here
    console.log({
      date,
      location,
      recipientName,
      recipientPhone,
      rows,
    });
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
        />
      </div>
    </div>
  );
};

export default VoucherForm;
