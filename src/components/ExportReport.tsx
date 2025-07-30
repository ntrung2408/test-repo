import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { exportToCSV, exportToJSON, generateReport } from '../utils/exportUtils';
import { Download, FileText, BarChart3, Calendar } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { vi } from 'date-fns/locale';

const ExportReport: React.FC = () => {
  const { transactions } = useFinance();
  const [dateRange, setDateRange] = useState<'all' | 'thisMonth' | 'thisYear' | 'custom'>('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showReport, setShowReport] = useState(false);

  const getFilteredTransactions = () => {
    let filtered = transactions;
    const now = new Date();

    switch (dateRange) {
      case 'thisMonth':
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);
        filtered = transactions.filter(t => t.date >= monthStart && t.date <= monthEnd);
        break;
      case 'thisYear':
        const yearStart = startOfYear(now);
        const yearEnd = endOfYear(now);
        filtered = transactions.filter(t => t.date >= yearStart && t.date <= yearEnd);
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          const start = new Date(customStartDate);
          const end = new Date(customEndDate);
          filtered = transactions.filter(t => t.date >= start && t.date <= end);
        }
        break;
      default:
        filtered = transactions;
    }

    return filtered;
  };

  const handleExportCSV = () => {
    const filtered = getFilteredTransactions();
    if (filtered.length === 0) {
      alert('Không có dữ liệu để xuất!');
      return;
    }
    exportToCSV(filtered, 'bao-cao-tai-chinh');
  };

  const handleExportJSON = () => {
    const filtered = getFilteredTransactions();
    if (filtered.length === 0) {
      alert('Không có dữ liệu để xuất!');
      return;
    }
    exportToJSON(filtered, 'bao-cao-tai-chinh');
  };

  const handleGenerateReport = () => {
    const filtered = getFilteredTransactions();
    if (filtered.length === 0) {
      alert('Không có dữ liệu để tạo báo cáo!');
      return;
    }
    setShowReport(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const filtered = getFilteredTransactions();
  const report = filtered.length > 0 ? generateReport(filtered) : null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Xuất Báo Cáo</span>
        </h3>

        {/* Date Range Selection */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khoảng Thời Gian
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dateRange"
                  value="all"
                  checked={dateRange === 'all'}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Tất cả</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dateRange"
                  value="thisMonth"
                  checked={dateRange === 'thisMonth'}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Tháng này</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dateRange"
                  value="thisYear"
                  checked={dateRange === 'thisYear'}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Năm này</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dateRange"
                  value="custom"
                  checked={dateRange === 'custom'}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Tùy chọn</span>
              </label>
            </div>
          </div>

          {dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Từ ngày
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Đến ngày
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Xuất CSV</span>
          </button>
          
          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Xuất JSON</span>
          </button>
          
          <button
            onClick={handleGenerateReport}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Tạo Báo Cáo</span>
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Số giao dịch được chọn: <span className="font-medium">{filtered.length}</span>
        </div>
      </div>

      {/* Generated Report */}
      {showReport && report && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Báo Cáo Chi Tiết</span>
            </h3>
            <button
              onClick={() => setShowReport(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Summary */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Tổng Quan</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium">Tổng Thu Nhập</p>
                  <p className="text-xl font-bold text-green-700">
                    {formatCurrency(report.summary.totalIncome)}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600 font-medium">Tổng Chi Tiêu</p>
                  <p className="text-xl font-bold text-red-700">
                    {formatCurrency(report.summary.totalExpense)}
                  </p>
                </div>
                <div className={`p-4 rounded-lg border ${
                  report.summary.balance >= 0 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <p className="text-sm font-medium">Số Dư</p>
                  <p className={`text-xl font-bold ${
                    report.summary.balance >= 0 ? 'text-blue-700' : 'text-red-700'
                  }`}>
                    {formatCurrency(report.summary.balance)}
                  </p>
                </div>
              </div>
            </div>

            {/* Period */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  Khoảng thời gian: {report.period.from} - {report.period.to}
                </span>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Income by Category */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Thu Nhập Theo Danh Mục</h4>
                <div className="space-y-2">
                  {Object.entries(report.incomeByCategory).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700">{category}</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense by Category */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Chi Tiêu Theo Danh Mục</h4>
                <div className="space-y-2">
                  {Object.entries(report.expenseByCategory).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700">{category}</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportReport;