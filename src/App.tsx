import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExportReport from './components/ExportReport';
import { PlusCircle, BarChart3, List, Wallet, FileText } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'list' | 'report'>('dashboard');

  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Wallet className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Quản Lý Tài Chính</h1>
              </div>
              
              {/* Navigation */}
              <nav className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Tổng quan</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('add')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    activeTab === 'add'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Thêm giao dịch</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('list')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    activeTab === 'list'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span>Lịch sử</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('report')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    activeTab === 'report'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Báo cáo</span>
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'add' && <TransactionForm />}
          {activeTab === 'list' && <TransactionList />}
          {activeTab === 'report' && <ExportReport />}
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;