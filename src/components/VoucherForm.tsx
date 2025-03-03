
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Save, Printer, ArrowLeft } from 'lucide-react';
import FormTable from './FormTable';
import SignatureSection from './SignatureSection';
import { VoucherRow } from '@/utils/calculations';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const VoucherForm: React.FC = () => {
  const navigate = useNavigate();
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
    },
    {
      id: uuidv4(),
      fineCardNumber: '',
      receiptNumber: '',
      improvementAmount: 0,
      fineAmount: 0,
      dueAmount: 0,
    },
    {
      id: uuidv4(),
      fineCardNumber: '',
      receiptNumber: '',
      improvementAmount: 0,
      fineAmount: 0,
      dueAmount: 0,
    },
  ]);

  const handleSave = () => {
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

  const handlePrint = () => {
    window.print();
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 animate-fade-in page-transition print:p-0">
      {/* A4 Paper Dimensions: 210mm × 297mm */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-6 max-w-[210mm] mx-auto print:min-h-0 min-h-[297mm] flex flex-col">
        {/* Header with organization logo and information - Full width header */}
        <div className="w-full border-b border-stone-200 print:max-h-16">
          <img 
            src="/lovable-uploads/0a4a60d1-2d0a-470d-96c0-153e9f0487c9.png" 
            alt="صندوق تنمية الخدمات م/شبوة" 
            className="w-full h-auto object-cover print:object-contain print:max-h-16"
          />
        </div>

        {/* Voucher title */}
        <div className="py-2 px-4 border-b border-stone-100">
          <h1 className="text-2xl font-bold text-center font-arabic text-stone-800">
            سند صرف كرت تحصيل غرامة
          </h1>
        </div>

        {/* Date on the left side and location on the right */}
        <div className="p-4 print:p-2">
          <div className="flex flex-row-reverse justify-between items-start mb-4">
            <div className="space-y-1 flex-1 ml-4">
              <Label htmlFor="location" className="font-arabic text-right block">اسم الموقع / البوابة / النقطة</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="font-arabic text-right"
                dir="rtl"
                placeholder="أدخل اسم الموقع"
              />
            </div>
            <div className="space-y-1 w-48">
              <Label htmlFor="date" className="font-arabic text-right block">التاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-arabic",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    {date ? format(date, 'PPP', { locale: ar }) : "حدد التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    locale={ar}
                    className="font-arabic"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Data entry table */}
          <div className="my-4">
            <h3 className="font-arabic text-lg font-medium text-stone-700 mb-2 text-right">بيانات السند</h3>
            <FormTable rows={rows} setRows={setRows} />
          </div>

          {/* Recipient information */}
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

          {/* Signature section */}
          <SignatureSection />
        </div>

        {/* Action buttons - pushing them to the bottom of A4 with flex-grow */}
        <div className="mt-auto bg-stone-50 p-4 border-t border-stone-200 flex flex-wrap gap-3 justify-between">
          <Button variant="outline" onClick={handleBackToDashboard} className="font-arabic flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>العودة للرئيسية</span>
          </Button>
          
          <div className="flex gap-3">
            <Button onClick={handlePrint} variant="outline" className="font-arabic flex items-center gap-2">
              <Printer size={16} />
              <span>طباعة</span>
            </Button>
            <Button onClick={handleSave} className="font-arabic flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
              <Save size={16} />
              <span>حفظ السند</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherForm;
