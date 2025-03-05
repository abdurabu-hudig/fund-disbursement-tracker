
import React from 'react';

const VoucherHeader: React.FC = () => {
  return (
    <>
      {/* Header with organization logo and information - Full width header */}
      <div className="w-full border-b border-stone-200 print:w-screen print:max-w-none print:mx-[-0.3cm] print:mt-[-0.3cm]">
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
    </>
  );
};

export default VoucherHeader;
