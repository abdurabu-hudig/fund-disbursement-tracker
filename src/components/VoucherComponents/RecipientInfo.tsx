
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RecipientInfoProps {
  recipientName: string;
  setRecipientName: (name: string) => void;
  recipientPhone: string;
  setRecipientPhone: (phone: string) => void;
}

const RecipientInfo: React.FC<RecipientInfoProps> = ({ 
  recipientName, 
  setRecipientName, 
  recipientPhone, 
  setRecipientPhone 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div className="space-y-1">
        <Label htmlFor="recipientName" className="font-arabic text-right block">اسم المستلم</Label>
        <Input
          id="recipientName"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          className="font-arabic text-right"
          dir="rtl"
          placeholder="أدخل اسم المستلم"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="recipientPhone" className="font-arabic text-right block">رقم هاتف المستلم</Label>
        <Input
          id="recipientPhone"
          type="tel"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
          className="font-arabic text-right"
          dir="rtl"
          placeholder="أدخل رقم هاتف المستلم"
        />
      </div>
    </div>
  );
};

export default RecipientInfo;
