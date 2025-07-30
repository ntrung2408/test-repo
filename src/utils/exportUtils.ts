import { Transaction } from '../types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const exportToCSV = (transactions: Transaction[], filename: string = 'giao-dich') => {
  const headers = ['Ngày', 'Loại', 'Danh Mục', 'Mô Tả', 'Số Tiền'];
  
  const csvContent = [
    headers.join(','),
    ...transactions.map(transaction => [
      format(transaction.date, 'dd/MM/yyyy', { locale: vi }),
      transaction.type === 'income' ? 'Thu Nhập' : 'Chi Tiêu',
      transaction.category,
      `"${transaction.description}"`, // Wrap in quotes to handle commas
      transaction.amount.toString()
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToJSON = (transactions: Transaction[], filename: string = 'giao-dich') => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${format(new Date(), 'yyyy-MM-dd')}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generateReport = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Group by category
  const incomeByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Group by month
  const monthlyData = transactions.reduce((acc, t) => {
    const monthKey = format(t.date, 'yyyy-MM');
    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      acc[monthKey].income += t.amount;
    } else {
      acc[monthKey].expense += t.amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  return {
    summary: {
      totalTransactions: transactions.length,
      totalIncome,
      totalExpense,
      balance,
      averageIncome: totalIncome / Math.max(1, transactions.filter(t => t.type === 'income').length),
      averageExpense: totalExpense / Math.max(1, transactions.filter(t => t.type === 'expense').length),
    },
    incomeByCategory,
    expenseByCategory,
    monthlyData,
    period: {
      from: transactions.length > 0 ? format(Math.min(...transactions.map(t => t.date.getTime())), 'dd/MM/yyyy') : '',
      to: transactions.length > 0 ? format(Math.max(...transactions.map(t => t.date.getTime())), 'dd/MM/yyyy') : '',
    }
  };
};