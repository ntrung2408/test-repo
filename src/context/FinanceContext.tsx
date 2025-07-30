import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Category, FinanceContextType, FinanceStats } from '../types';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  // Income categories
  { id: '1', name: 'Lương', type: 'income', color: '#10b981' },
  { id: '2', name: 'Thưởng', type: 'income', color: '#059669' },
  { id: '3', name: 'Đầu tư', type: 'income', color: '#047857' },
  { id: '4', name: 'Khác', type: 'income', color: '#065f46' },
  
  // Expense categories
  { id: '5', name: 'Ăn uống', type: 'expense', color: '#ef4444' },
  { id: '6', name: 'Giao thông', type: 'expense', color: '#dc2626' },
  { id: '7', name: 'Mua sắm', type: 'expense', color: '#b91c1c' },
  { id: '8', name: 'Giải trí', type: 'expense', color: '#991b1b' },
  { id: '9', name: 'Hóa đơn', type: 'expense', color: '#7f1d1d' },
  { id: '10', name: 'Sức khỏe', type: 'expense', color: '#f97316' },
  { id: '11', name: 'Giáo dục', type: 'expense', color: '#ea580c' },
  { id: '12', name: 'Khác', type: 'expense', color: '#9a3412' },
];

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories] = useState<Category[]>(defaultCategories);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('financeTransactions');
    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions);
      setTransactions(parsed.map((t: any) => ({ ...t, date: new Date(t.date) })));
    }
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updatedTransaction } : t)
    );
  };

  const getStats = (): FinanceStats => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = transactions
      .filter(t => 
        t.type === 'income' && 
        isWithinInterval(t.date, { start: monthStart, end: monthEnd })
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpense = transactions
      .filter(t => 
        t.type === 'expense' && 
        isWithinInterval(t.date, { start: monthStart, end: monthEnd })
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      monthlyIncome,
      monthlyExpense,
    };
  };

  const value: FinanceContextType = {
    transactions,
    categories,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getStats,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};