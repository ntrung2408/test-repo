import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { vi } from 'date-fns/locale';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeExpenseChart: React.FC = () => {
  const { transactions } = useFinance();

  // Get last 6 months data
  const months = [];
  for (let i = 5; i >= 0; i--) {
    months.push(subMonths(new Date(), i));
  }

  const monthlyData = months.map(month => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    const monthTransactions = transactions.filter(t => 
      isWithinInterval(t.date, { start: monthStart, end: monthEnd })
    );

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month: format(month, 'MM/yyyy', { locale: vi }),
      income,
      expense,
    };
  });

  const chartData = {
    labels: monthlyData.map(data => data.month),
    datasets: [
      {
        label: 'Thu Nhập',
        data: monthlyData.map(data => data.income),
        backgroundColor: '#10b981',
        borderColor: '#059669',
        borderWidth: 1,
      },
      {
        label: 'Chi Tiêu',
        data: monthlyData.map(data => data.expense),
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              notation: 'compact',
            }).format(value);
          }
        }
      }
    },
  };

  const hasData = monthlyData.some(data => data.income > 0 || data.expense > 0);

  if (!hasData) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p>Chưa có dữ liệu thu chi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default IncomeExpenseChart;