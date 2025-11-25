import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronRight,
  Calendar as CalendarIcon,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Transaction, Account } from './types';
import { ExportDialog } from './ExportDialog';
import { DateRangeDialog } from './DateRangeDialog';
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { FilterableTable } from './FilterableTable';

interface DetailedTransactionsViewProps {
  transactions: Transaction[];
  accounts: Account[];
  onTransactionClick: (transaction: Transaction) => void;
}

export function DetailedTransactionsView({ 
  transactions, 
  accounts,
  onTransactionClick 
}: DetailedTransactionsViewProps) {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [userFilter, setUserFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [amountRange, setAmountRange] = useState<{min: string, max: string}>({ min: '', max: '' });
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({ 
    from: startOfDay(subDays(new Date(), 30)), 
    to: endOfDay(new Date()) 
  });

  // Sorting
  const [sortConfig, setSortConfig] = useState<{key: keyof Transaction, direction: 'asc' | 'desc'}>({ key: 'date', direction: 'desc' });

  // --- Filter Logic ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      // Global Search
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        tx.merchantName.toLowerCase().includes(query) ||
        tx.amount.toString().includes(query) ||
        tx.category.toLowerCase().includes(query) ||
        (tx.reference || '').toLowerCase().includes(query) ||
        (tx.user || '').toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Status Filter
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false;

      // Category Filter
      if (categoryFilter !== 'all' && tx.category !== categoryFilter) return false;
      
      // User Filter
      if (userFilter !== 'all' && tx.user !== userFilter) return false;

      // Type Filter (Income/Spend)
      if (typeFilter === 'income' && tx.amount < 0) return false;
      if (typeFilter === 'spend' && tx.amount >= 0) return false;

      // Amount Filter
      if (amountRange.min && Math.abs(tx.amount) < parseFloat(amountRange.min)) return false;
      if (amountRange.max && Math.abs(tx.amount) > parseFloat(amountRange.max)) return false;

      // Date Filter
      if (dateRange.from && new Date(tx.date) < dateRange.from) return false;
      if (dateRange.to && new Date(tx.date) > dateRange.to) return false;

      return true;
    }).sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [transactions, searchQuery, statusFilter, categoryFilter, userFilter, typeFilter, amountRange, dateRange, sortConfig]);

  // --- Handlers ---

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setCategoryFilter('all');
    setUserFilter('all');
    setTypeFilter('all');
    setAmountRange({ min: '', max: '' });
    setDateRange({ from: undefined, to: undefined });
    setSearchQuery('');
  };

  const uniqueCategories = Array.from(new Set(transactions.map(tx => tx.category)));
  const uniqueUsers = Array.from(new Set(transactions.map(tx => tx.user).filter(Boolean))) as string[];

  // --- Table Config ---
  const columns = [
    {
      header: 'Merchant',
      accessorKey: 'merchantName' as keyof Transaction,
      sortKey: 'merchantName' as keyof Transaction,
      cell: (tx: Transaction) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base shrink-0 text-[#001A72] font-medium">
            {tx.merchantName.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-[#001A72]">{tx.merchantName}</div>
            {tx.reference && <div className="text-xs text-muted-foreground truncate max-w-[150px]">{tx.reference}</div>}
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category' as keyof Transaction,
      cell: (tx: Transaction) => (
        <Badge variant="outline" className="font-normal text-xs text-gray-600 border-gray-200">
          {tx.category}
        </Badge>
      )
    },
    {
      header: 'Account',
      accessorKey: 'accountId' as keyof Transaction,
      cell: (tx: Transaction) => {
        const account = accounts.find(a => a.id === tx.accountId);
        return (
          <Badge variant="secondary" className="font-normal text-xs bg-[#EBF1FF] text-[#0033A0] hover:bg-[#EBF1FF]/80">
            {account?.name || 'Unknown Account'}
          </Badge>
        );
      }
    },
    {
      header: 'Date',
      accessorKey: 'date' as keyof Transaction,
      sortKey: 'date' as keyof Transaction,
      cell: (tx: Transaction) => (
        <span className="text-sm text-gray-900">
          {tx.date}
        </span>
      )
    },
    {
      header: 'Amount',
      accessorKey: 'amount' as keyof Transaction,
      sortKey: 'amount' as keyof Transaction,
      className: 'text-right',
      cell: (tx: Transaction) => (
        <span className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
          {tx.amount > 0 ? '+' : ''}{tx.currency}{Math.abs(tx.amount).toFixed(2)}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* 1. Search & Controls Bar */}
      <div className="bg-white p-3 rounded-lg border border-border shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Omni-Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by merchant, amount, category or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-50 border-border focus:bg-white transition-colors h-9 py-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Toggle */}
            <Button 
              variant={isFilterPanelOpen ? "secondary" : "outline"} 
              size="sm"
              className={`gap-2 h-9 py-2 ${isFilterPanelOpen ? 'bg-accent/10 text-[#0033A0] border-accent/20' : ''}`}
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            >
              <Filter className="h-3.5 w-3.5" />
              Filters
              {(statusFilter !== 'all' || categoryFilter !== 'all' || userFilter !== 'all' || typeFilter !== 'all' || amountRange.min || dateRange.from) && (
                <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 flex items-center justify-center bg-[#0033A0] text-white text-[9px]">
                  !
                </Badge>
              )}
            </Button>

            {/* Export Button */}
            <Button 
              variant="outline"
              size="sm" 
              className="gap-2 h-9 py-2 text-[#0033A0] border-border hover:bg-blue-50"
              onClick={() => setIsExportDialogOpen(true)}
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
          </div>
        </div>

        {/* 2. Expandable Filter Panel */}
        {isFilterPanelOpen && (
          <div className="pt-3 border-t border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in slide-in-from-top-2 duration-200">
            
            {/* Type Filter (Income/Spend) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full h-9 py-2 text-sm px-3 bg-white shadow-sm">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income (In)</SelectItem>
                  <SelectItem value="spend">Spend (Out)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full h-9 py-2 text-sm px-3 bg-white shadow-sm">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full h-9 py-2 text-sm px-3 bg-white shadow-sm">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Team Member Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Team Member</label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-full h-9 py-2 text-sm px-3 bg-white shadow-sm">
                  <SelectValue placeholder="All Members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Date Range</label>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal h-9 py-2 text-sm px-3 bg-white hover:bg-white hover:text-foreground shadow-sm border-input rounded-md"
                onClick={() => setIsDateDialogOpen(true)}
              >
                <CalendarIcon className="mr-2 h-3.5 w-3.5 opacity-50 shrink-0" />
                <span className="truncate">
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </span>
              </Button>
            </div>

             {/* Amount Filter */}
             <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Amount Range</label>
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Min" 
                  className="h-9 py-2 text-sm px-3" 
                  value={amountRange.min}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                  type="number"
                />
                <span className="text-muted-foreground">-</span>
                <Input 
                  placeholder="Max" 
                  className="h-9 py-2 text-sm px-3"
                  value={amountRange.max}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                  type="number" 
                />
              </div>
            </div>

            {/* Clear Filters Link */}
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-destructive h-7 px-2 text-xs"
                onClick={clearFilters}
              >
                <X className="mr-1.5 h-3 w-3" />
                Clear all filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Transactions Table */}
      <div className="flex-1 flex flex-col overflow-hidden">
         <FilterableTable 
            data={filteredTransactions}
            columns={columns}
            onRowClick={onTransactionClick}
            hideSearch={true} // We use our own custom search bar above
            enableMultiSelect={true}
            selectedIds={selectedRowIds}
            onSelectionChange={setSelectedRowIds}
            sortConfig={sortConfig}
            onSort={handleSort}
            actions={(tx) => (
               <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
               </Button>
            )}
         />
      </div>

      <ExportDialog 
        isOpen={isExportDialogOpen} 
        onClose={() => setIsExportDialogOpen(false)} 
        count={selectedRowIds.size > 0 ? selectedRowIds.size : filteredTransactions.length}
      />
      
      <DateRangeDialog 
        isOpen={isDateDialogOpen}
        onClose={() => setIsDateDialogOpen(false)}
        dateRange={dateRange}
        onApply={(range) => setDateRange(range)}
      />
    </div>
  );
}