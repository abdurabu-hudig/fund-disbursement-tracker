
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (searchParams: SearchParams) => void;
  isVisible: boolean;
}

export interface SearchParams {
  searchType: 'date' | 'voucherNumber' | 'cardNumber' | 'recipientName';
  value: string | Date | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isVisible }) => {
  const [searchType, setSearchType] = useState<'date' | 'voucherNumber' | 'cardNumber' | 'recipientName'>('voucherNumber');
  const [textValue, setTextValue] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const handleSearch = () => {
    onSearch({
      searchType,
      value: searchType === 'date' ? date : textValue,
    });
  };

  const clearSearch = () => {
    setTextValue('');
    setDate(null);
  };

  if (!isVisible) return null;

  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-b border-stone-200 animate-slide-down">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
          <div className="w-full md:w-1/4">
            <Select 
              value={searchType} 
              onValueChange={(value) => setSearchType(value as any)}
            >
              <SelectTrigger className="font-arabic">
                <SelectValue placeholder="نوع البحث" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voucherNumber" className="font-arabic">رقم السند</SelectItem>
                <SelectItem value="cardNumber" className="font-arabic">رقم الكرت</SelectItem>
                <SelectItem value="recipientName" className="font-arabic">اسم المستلم</SelectItem>
                <SelectItem value="date" className="font-arabic">التاريخ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            {searchType === 'date' ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
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
                    onSelect={setDate}
                    locale={ar}
                    className="font-arabic"
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <div className="relative">
                <Input
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder={
                    searchType === 'voucherNumber' 
                      ? "أدخل رقم السند للبحث" 
                      : searchType === 'cardNumber' 
                        ? "أدخل رقم الكرت للبحث" 
                        : "أدخل اسم المستلم للبحث"
                  }
                  className="font-arabic text-right"
                />
                {textValue && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-0 left-0 rtl:right-0 rtl:left-auto h-full text-stone-400"
                    onClick={clearSearch}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            )}
          </div>

          <Button 
            onClick={handleSearch} 
            className="font-arabic flex items-center gap-2"
          >
            <Search size={16} />
            <span>بحث</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
