import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const { transactions, categories } = useFinance();
  
  // Get the 5 most recent transactions
  const recentTransactions = transactions
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || '#6b7280';
  };

  if (recentTransactions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Chưa có giao dịch nào
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Type Icon */}
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpCircle className="h-4 w-4" />
                ) : (
                  <ArrowDownCircle className="h-4 w-4" />
                )}
              </div>

              {/* Transaction Info */}
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getCategoryColor(transaction.category) }}
                  >
                    {transaction.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {format(transaction.date, 'dd/MM/yyyy', { locale: vi })}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className={`font-bold ${
                transaction.type === 'income' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;