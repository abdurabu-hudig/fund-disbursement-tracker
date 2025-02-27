
import React from 'react';

const SignatureSection: React.FC = () => {
  const signatureFields = [
    { label: "إدارة الخدمات والفروع", name: "branchesSignature" },
    { label: "المراجعة", name: "reviewSignature" },
    { label: "المالية", name: "financeSignature" },
    { label: "المدير العام", name: "generalManagerSignature" }
  ];

  return (
    <div className="mt-8 mb-4">
      <h3 className="font-arabic text-lg font-medium text-stone-700 mb-4 text-right">التواقيع</h3>
      
      <div className="flex flex-wrap justify-between gap-2">
        {signatureFields.map((field) => (
          <div key={field.name} className="border border-stone-200 rounded-md p-3 bg-white flex-1 min-w-[120px]">
            <div className="text-center mb-2">
              <span className="font-arabic text-stone-600 text-sm">{field.label}</span>
            </div>
            <div className="h-20 border border-dashed border-stone-300 rounded bg-stone-50 flex items-center justify-center">
              <span className="text-stone-400 text-xs font-arabic">مكان التوقيع</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureSection;
