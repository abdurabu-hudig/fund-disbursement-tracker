
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Printer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface ActionButtonsProps {
  onSave: () => void;
  location: string;
  recipientName: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, location, recipientName }) => {
  const navigate = useNavigate();

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

    onSave();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="mt-auto bg-stone-50 p-4 border-t border-stone-200 flex flex-wrap gap-3 justify-between print:hidden">
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
  );
};

export default ActionButtons;
