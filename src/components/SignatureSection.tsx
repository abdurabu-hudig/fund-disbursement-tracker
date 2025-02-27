
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {signatureFields.map((field) => (
          <div key={field.name} className="border border-stone-200 rounded-md p-4 bg-white">
            <div className="text-center mb-2">
              <span className="font-arabic text-stone-600">{field.label}</span>
            </div>
            <div className="h-24 border border-dashed border-stone-300 rounded bg-stone-50 flex items-center justify-center">
              <span className="text-stone-400 text-sm font-arabic">مكان التوقيع</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureSection;
