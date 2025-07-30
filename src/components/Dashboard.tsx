import React from 'react';
import { useFinance } from '../context/FinanceContext';
import StatsCards from './StatsCards';
import ExpenseChart from './ExpenseChart';
import IncomeExpenseChart from './IncomeExpenseChart';
import RecentTransactions from './RecentTransactions';

const Dashboard: React.FC = () => {
  const { transactions } = useFinance();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Thu Chi Theo Tháng
          </h3>
          <IncomeExpenseChart />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Chi Tiêu Theo Danh Mục
          </h3>
          <ExpenseChart />
        </div>
      </div>
      
      {/* Recent Transactions */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Giao Dịch Gần Đây
            </h3>
          </div>
          <RecentTransactions />
        </div>
      )}
      
      {transactions.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có giao dịch nào
          </h3>
          <p className="text-gray-500 mb-4">
            Bắt đầu bằng cách thêm giao dịch đầu tiên của bạn
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;