
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface HeaderProps {
  onToggleSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    // تحسين رسالة الإشعار عند تسجيل الخروج
    toast({
      title: "تم تسجيل الخروج بنجاح",
      description: "نتمنى لك يومًا سعيدًا",
      className: "font-arabic rtl bg-white border-gold-500",
    });
  };

  // Logo component without circular frame
  const Logo = () => (
    <div className="w-12 h-12 flex items-center justify-center">
      <img 
        src="/lovable-uploads/64963e18-3ab9-49cc-a0c3-10ec2e97a303.png" 
        alt="صندوق تنمية الخدمات" 
        className="w-full h-full object-contain"
      />
    </div>
  );

  return (
    <header className="bg-white shadow-soft px-4 py-3 sticky top-0 z-10 glass">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Search and Logout buttons */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSearch}
            className="text-stone-700 hover:text-red-500 transition-colors"
          >
            <Search size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-stone-700 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
          </Button>
        </div>

        {/* Center - Organization name */}
        <h1 className="text-center font-arabic font-medium text-stone-800">
          صندوق تنمية الخدمات م/شبوة
        </h1>

        {/* Right side - Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
