
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LocationInputProps {
  location: string;
  setLocation: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ location, setLocation }) => {
  return (
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
  );
};

export default LocationInput;
