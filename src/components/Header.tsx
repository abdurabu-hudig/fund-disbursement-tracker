
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Placeholder for logo - replace with actual logo
  const LogoPlaceholder = () => (
    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white">
      <span className="font-bold">ص</span>
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
            className="text-stone-700 hover:text-teal-600 transition-colors"
          >
            <Search size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-stone-700 hover:text-teal-600 transition-colors"
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
          <LogoPlaceholder />
        </div>
      </div>
    </header>
  );
};

export default Header;
