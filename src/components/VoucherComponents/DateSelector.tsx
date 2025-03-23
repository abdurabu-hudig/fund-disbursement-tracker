
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ar } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { formatDate } from '@/utils/calculations';
import { useIsMobile } from '@/hooks/use-mobile';

interface DateSelectorProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, setDate }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`space-y-1 ${isMobile ? 'w-40' : 'w-48'}`}>
      <Label 
        htmlFor="date" 
        className={`font-arabic text-right block ${isMobile ? 'text-xs' : 'text-sm'}`}
      >
        التاريخ
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              `w-full justify-start text-right font-arabic ${isMobile ? 'text-sm h-8 py-0' : ''}`,
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className={`mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'} rtl:ml-2 rtl:mr-0`} />
            {date ? formatDate(date) : "حدد التاريخ"}
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
  );
};

export default DateSelector;
