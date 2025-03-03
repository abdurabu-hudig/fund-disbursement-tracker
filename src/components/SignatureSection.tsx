
import React from 'react';

const SignatureSection: React.FC = () => {
  // New structure based on requirements: right-to-left order,
  // no boxes, no "signature place" text, and the General Manager without a box
  return (
    <div className="mt-8 mb-4">
      <h3 className="font-arabic text-lg font-medium text-stone-700 mb-4 text-right">التواقيع</h3>
      
      <div className="flex flex-row-reverse justify-between gap-4">
        {/* Right to left order as requested */}
        <div className="p-3 text-center">
          <span className="font-arabic text-stone-600">توقيع إدارة الفروع والخدمات</span>
        </div>
        
        <div className="p-3 text-center">
          <span className="font-arabic text-stone-600">توقيع المراجعة</span>
        </div>
        
        <div className="p-3 text-center">
          <span className="font-arabic text-stone-600">توقيع المالية</span>
        </div>
        
        <div className="p-3 text-center">
          <span className="font-arabic text-stone-600">توقيع المدير العام</span>
        </div>
      </div>
    </div>
  );
};

export default SignatureSection;
