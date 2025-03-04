
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LockKeyhole, User } from 'lucide-react';

const AuthScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  // Logo component using the actual logo image
  const Logo = () => (
    <div className="w-32 h-32 mx-auto">
      <img 
        src="/lovable-uploads/64963e18-3ab9-49cc-a0c3-10ec2e97a303.png" 
        alt="صندوق تنمية الخدمات م/شبوة" 
        className="w-full h-full object-contain"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <Logo />
          <h1 className="mt-6 text-2xl font-bold text-stone-800 font-arabic">صندوق تنمية الخدمات م/شبوة</h1>
          <p className="mt-2 text-stone-500 font-arabic">نظام إدارة سندات الصرف</p>
        </div>

        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-arabic">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center font-arabic">
              أدخل بيانات الدخول للوصول إلى النظام
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-arabic">اسم المستخدم</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-3 rtl:pr-3 pointer-events-none text-stone-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    className="pl-10 rtl:pl-3 rtl:pr-10 font-arabic text-right"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-arabic">كلمة المرور</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-3 rtl:pr-3 pointer-events-none text-stone-400">
                    <LockKeyhole size={18} />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="أدخل كلمة المرور" 
                    className="pl-10 rtl:pl-3 rtl:pr-10 font-arabic text-right"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full font-arabic"
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-stone-500 font-arabic">اتصل بالمدير للحصول على بيانات دخول جديدة</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
