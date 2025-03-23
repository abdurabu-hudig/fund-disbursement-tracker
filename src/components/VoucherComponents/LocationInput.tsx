
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';

interface LocationInputProps {
  location: string;
  setLocation: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ location, setLocation }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-1 flex-1 ml-4">
      <Label 
        htmlFor="location" 
        className={`font-arabic text-right block ${isMobile ? 'text-xs' : 'text-sm'}`}
      >
        اسم الموقع / البوابة / النقطة
      </Label>
      <Input
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={`font-arabic text-right ${isMobile ? 'text-sm h-8' : ''}`}
        dir="rtl"
        placeholder="أدخل اسم الموقع"
      />
    </div>
  );
};

export default LocationInput;
