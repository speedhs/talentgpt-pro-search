
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo authentication
    if ((email === 'demo' || email === 'demo@example.com') && password === 'demo') {
      setUser({
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'recruiter',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      });
      return;
    }

    // For demo purposes, accept any email/password
    setUser({
      id: '1',
      name: email.split('@')[0] || 'User',
      email: email,
      role: 'recruiter'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">TalentGPT Pro</CardTitle>
            <p className="text-slate-400">AI-powered recruitment platform</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-slate-700 border-slate-600 text-white pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-600">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-xs text-slate-300 mb-2">Demo Credentials:</p>
              <p className="text-xs text-slate-400">Username: <span className="text-white">demo</span></p>
              <p className="text-xs text-slate-400">Password: <span className="text-white">demo</span></p>
            </div>

            <Separator className="bg-slate-700" />
            
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-slate-400 hover:text-white"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
