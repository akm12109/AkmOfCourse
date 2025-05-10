
"use client";

import type { Currency, CurrencyCode } from '@/types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CurrencyContextType {
  selectedCurrency: Currency;
  selectCurrency: (currencyCode: CurrencyCode) => void;
  formatPrice: (amountInINR: number) => string;
  availableCurrencies: Currency[];
}

const USD_TO_INR_RATE = 83.50; // Example rate, in a real app this would come from an API

export const availableCurrencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<CurrencyCode>('INR');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedCurrency && availableCurrencies.find(c => c.code === storedCurrency)) {
      setSelectedCurrencyCode(storedCurrency as CurrencyCode);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
        localStorage.setItem('selectedCurrency', selectedCurrencyCode);
    }
  }, [selectedCurrencyCode, isInitialized]);

  const selectedCurrency = availableCurrencies.find(c => c.code === selectedCurrencyCode) || availableCurrencies[0];

  const selectCurrency = (currencyCode: CurrencyCode) => {
    if (availableCurrencies.find(c => c.code === currencyCode)) {
      setSelectedCurrencyCode(currencyCode);
    }
  };

  const formatPrice = (amountInINR: number): string => {
    if (!isInitialized) return '...'; // Or a placeholder like "Loading price..."

    let amount = amountInINR;
    if (selectedCurrency.code === 'USD') {
      amount = amountInINR / USD_TO_INR_RATE;
    }
    // Use toLocaleString for basic formatting, can be enhanced
    return `${selectedCurrency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  if (!isInitialized) {
    return null; // Or a loading spinner for the whole app if currency is critical before rendering
  }

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, selectCurrency, formatPrice, availableCurrencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
