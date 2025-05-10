
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, BookOpen, Newspaper, HelpCircle, ShieldAlert, FileQuestion, GraduationCap, DollarSign } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { NavItem, CurrencyCode } from '@/types';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from '@/contexts/CurrencyContext';
import { ThemeToggle } from '@/components/shared/ThemeToggle'; // Import ThemeToggle

const navItems: NavItem[] = [
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Blog', href: '/blog', icon: Newspaper },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Request Course', href: '/request-course', icon: FileQuestion, isRequestCourse: true },
  { label: 'Admin', href: '/admin', icon: ShieldAlert, admin: true },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { selectedCurrency, selectCurrency, availableCurrencies } = useCurrency();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium px-2 lg:px-3",
                pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-foreground",
                item.admin && "text-destructive hover:text-destructive/80",
                item.isRequestCourse && "text-accent-foreground bg-accent hover:bg-accent/90 py-1.5 rounded-md"
              )}
            >
              <Link href={item.href}>
                {item.icon && <item.icon className="mr-1.5 h-4 w-4" />}
                {item.label}
              </Link>
            </Button>
          ))}
           <Select value={selectedCurrency.code} onValueChange={(value) => selectCurrency(value as CurrencyCode)}>
            <SelectTrigger className="w-auto h-9 text-xs px-2 py-1 border-none shadow-none bg-transparent hover:bg-accent/50 focus:ring-0">
              <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground"/>
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {availableCurrencies.map(curr => (
                <SelectItem key={curr.code} value={curr.code} className="text-xs">
                  {curr.code} ({curr.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ThemeToggle />
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative hidden sm:block">
            <Input type="search" placeholder="Search courses..." className="h-9 w-full pl-8 sm:w-32 lg:w-56" />
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-40 bg-background shadow-lg p-4 border-t">
          <div className="relative mb-4">
            <Input type="search" placeholder="Search courses..." className="h-10 w-full pl-10" />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "",
                  item.admin && "text-destructive hover:bg-destructive/10",
                  item.isRequestCourse && "bg-accent text-accent-foreground hover:bg-accent/90"
                )}
              >
                {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                {item.label}
              </Link>
            ))}
             <div className="mt-2 border-t pt-2">
                <Select value={selectedCurrency.code} onValueChange={(value) => selectCurrency(value as CurrencyCode)}>
                    <SelectTrigger className="w-full h-10 text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground"/>
                        <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableCurrencies.map(curr => (
                        <SelectItem key={curr.code} value={curr.code} className="text-sm">
                           {curr.name} ({curr.symbol})
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
