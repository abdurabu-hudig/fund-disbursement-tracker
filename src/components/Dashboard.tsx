
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Header from './Header';
import SearchBar, { SearchParams } from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/utils/calculations';

interface VoucherItem {
  id: string;
  voucher_number: string;
  created_at: string;
  recipient_name: string;
  location: string;
  total_amount: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [vouchers, setVouchers] = useState<VoucherItem[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<VoucherItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch vouchers from Supabase on component mount
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('vouchers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data) {
          // Filter out any placeholder or corrupted voucher data
          const validVouchers = data.filter(
            voucher => voucher.voucher_number && voucher.recipient_name
          );
          setVouchers(validVouchers);
          setFilteredVouchers(validVouchers);
        }
      } catch (error) {
        console.error('Error fetching vouchers:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب البيانات",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (params: SearchParams) => {
    let results = [...vouchers];
    
    if (params.value) {
      const searchValue = params.value instanceof Date 
        ? params.value.toISOString().split('T')[0] 
        : String(params.value).toLowerCase();
        
      results = vouchers.filter(voucher => {
        switch (params.searchType) {
          case 'date':
            // Compare just the date part of created_at
            return voucher.created_at.split('T')[0] === searchValue;
          case 'voucherNumber':
            return voucher.voucher_number?.toLowerCase().includes(searchValue);
          case 'cardNumber':
            // In a real app, we would search in the voucher details for card numbers
            return true; // Simplified for now
          case 'recipientName':
            return voucher.recipient_name?.toLowerCase().includes(searchValue);
          default:
            return true;
        }
      });
    }
    
    setFilteredVouchers(results);
    
    toast({
      title: "نتائج البحث",
      description: `تم العثور على ${results.length} سند`,
    });
  };

  const handleCreateVoucher = () => {
    navigate('/create-voucher');
  };

  const handleVoucherClick = (id: string) => {
    // Navigate to view the voucher details
    navigate(`/view-voucher/${id}`);
  };

  return (
    <div className="app-container min-h-screen">
      <Header onToggleSearch={toggleSearch} />
      <SearchBar isVisible={isSearchVisible} onSearch={handleSearch} />
      
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6 mt-4">
          <h2 className="text-2xl font-medium text-stone-800 font-arabic">سندات الصرف</h2>
          <Button 
            onClick={handleCreateVoucher}
            className="font-arabic flex items-center gap-2 bg-red-500 hover:bg-red-600 shadow-soft"
          >
            <PlusCircle size={18} />
            <span>إنشاء سند جديد</span>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse-slow text-stone-400">جاري التحميل...</div>
          </div>
        ) : filteredVouchers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVouchers.map((voucher) => (
              <Card 
                key={voucher.id} 
                className="glass-card hover:shadow-strong transition-shadow cursor-pointer"
                onClick={() => handleVoucherClick(voucher.id)}
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-arabic">
                      {voucher.voucher_number || '-'}
                    </div>
                    <div className="text-sm text-stone-500 font-arabic">
                      {voucher.created_at ? new Date(voucher.created_at).toLocaleDateString('ar-SA') : '-'}
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-stone-800 mb-2 font-arabic text-right">
                    {voucher.recipient_name || 'بدون اسم'}
                  </h3>
                  
                  <div className="text-stone-600 mb-3 font-arabic text-right">
                    {voucher.location || '-'}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-stone-100">
                    <div className="text-sm text-stone-500 font-arabic">المبلغ الإجمالي</div>
                    <div className="text-lg font-medium text-red-600 font-arabic">
                      {voucher.total_amount ? new Intl.NumberFormat('ar-SA').format(voucher.total_amount) : '0'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center shadow-soft">
            <div className="text-stone-400 mb-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-12 h-12 mx-auto mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-medium mb-2 font-arabic">لا توجد سندات</h3>
              <p className="text-stone-500 font-arabic">لم يتم العثور على سندات مطابقة لمعايير البحث</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setFilteredVouchers(vouchers)}
              className="mt-4 font-arabic border-gold-500 text-gold-700 hover:bg-gold-50"
            >
              عرض جميع السندات
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
