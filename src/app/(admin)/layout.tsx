
"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Logo from '@/components/shared/Logo';
import Navbar from '@/components/layout/Navbar'; 
import Footer from '@/components/layout/Footer';   
import LoadingSpinner from '@/components/shared/LoadingSpinner'; 
import { Label } from '@/components/ui/label';
import { User, KeyRound } from 'lucide-react';

const ADMIN_USERNAME_ENV = process.env.ADMIN_USERNAME || "admin"; // Fallback for safety
const ADMIN_PASSWORD_ENV = process.env.ADMIN_PASSWORD || "admin123"; // Fallback for safety

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAdminAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME_ENV && password === ADMIN_PASSWORD_ENV) {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      alert('Incorrect username or password');
      setPassword('');
      // Optionally clear username too: setUsername('');
    }
  };

  if (isLoading) {
    return (
      <LoadingSpinner fullPage text="Loading admin area..." />
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>Enter credentials to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className="flex items-center text-sm"><User className="w-3.5 h-3.5 mr-2 text-muted-foreground"/>Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="flex items-center text-sm"><KeyRound className="w-3.5 h-3.5 mr-2 text-muted-foreground"/>Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-2">
                Enter Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
