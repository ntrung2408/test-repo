import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';

const StatsCards: React.FC = () => {
  const { getStats } = useFinance();
  const stats = getStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const cards = [
    {
      title: 'Tổng Thu Nhập',
      value: stats.totalIncome,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Tổng Chi Tiêu',
      value: stats.totalExpense,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      title: 'Số Dư',
      value: stats.balance,
      icon: Wallet,
      color: stats.balance >= 0 ? 'text-blue-600' : 'text-red-600',
      bgColor: stats.balance >= 0 ? 'bg-blue-50' : 'bg-red-50',
      borderColor: stats.balance >= 0 ? 'border-blue-200' : 'border-red-200',
    },
    {
      title: 'Thu Nhập Tháng Này',
      value: stats.monthlyIncome,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-white rounded-lg border ${card.borderColor} p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className={`text-2xl font-bold ${card.color}`}>
                  {formatCurrency(card.value)}
                </p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-full`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;