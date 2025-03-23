
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const VoucherHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Header with organization logo and information - Full width header */}
      <div className="w-full border-b border-stone-200 print:w-screen print:max-w-none print:mx-[-0.3cm] print:mt-[-0.3cm]">
        <img 
          src="/lovable-uploads/0a4a60d1-2d0a-470d-96c0-153e9f0487c9.png" 
          alt="صندوق تنمية الخدمات م/شبوة" 
          className="w-full h-auto object-cover print:object-contain print:w-full"
        />
      </div>

      {/* Voucher title */}
      <div className="py-2 px-4 border-b border-stone-100">
        <h1 className={`font-bold text-center font-arabic text-stone-800 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
          سند صرف كرت تحصيل غرامة
        </h1>
        {isMobile && (
          <div className="flex justify-between items-center mt-1 text-xs font-arabic text-stone-500">
            <span className="location-text">الموقع</span>
            <span className="date-text">{new Date().toLocaleDateString('ar-SA')}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default VoucherHeader;
