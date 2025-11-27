import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Column<T> {
  header: string;
  accessorKey: keyof T | ((item: T) => React.ReactNode);
  cell?: (item: T) => React.ReactNode;
  className?: string;
  sortKey?: keyof T; // If provided, enables sorting for this column
}

interface FilterableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  searchPlaceholder?: string;
  hideSearch?: boolean; // If true, hides the built-in search bar
  filters?: {
    label: string;
    options: { label: string; value: string }[];
    selected: string[];
    onChange: (values: string[]) => void;
  }[];
  actions?: (item: T) => React.ReactNode;
  
  // New Props for Advanced Features
  enableMultiSelect?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  
  // Sorting (Controlled)
  sortConfig?: { key: keyof T; direction: 'asc' | 'desc' };
  onSort?: (key: keyof T) => void;
}

export function FilterableTable<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  searchPlaceholder = 'Search...',
  hideSearch = false,
  filters,
  actions,
  enableMultiSelect = false,
  selectedIds,
  onSelectionChange,
  sortConfig,
  onSort,
}: FilterableTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Internal selection state if not controlled
  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(new Set());
  const effectiveSelectedIds = selectedIds || internalSelectedIds;
  const handleSelectionChange = onSelectionChange || setInternalSelectedIds;

  // Reset pagination when data length changes significantly (e.g. filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const filteredData = data.filter((item) => {
    if (hideSearch) return true;
    if (!searchTerm) return true;
    return Object.values(item).some(
      (val) =>
        typeof val === 'string' &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleAllSelection = () => {
    if (effectiveSelectedIds.size === paginatedData.length && paginatedData.length > 0) {
      handleSelectionChange(new Set());
    } else {
      const newSet = new Set(paginatedData.map(item => item.id));
      handleSelectionChange(newSet);
    }
  };

  const toggleRowSelection = (id: string) => {
    const newSet = new Set(effectiveSelectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    handleSelectionChange(newSet);
  };

  return (
    <div className="space-y-4 bg-[rgba(255,0,0,0)]">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {!hideSearch && (
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        
        <div className={`flex gap-2 w-full sm:w-auto ${hideSearch ? 'ml-auto' : ''}`}>
          {filters?.map((filter, idx) => (
            <DropdownMenu key={idx}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {filter.label}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {filter.options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={filter.selected.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const newSelected = checked
                        ? [...filter.selected, option.value]
                        : filter.selected.filter((v) => v !== option.value);
                      filter.onChange(newSelected);
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50">
              {enableMultiSelect && (
                <TableHead className="w-[50px] h-12">
                  <Checkbox 
                    checked={effectiveSelectedIds.size === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={toggleAllSelection}
                  />
                </TableHead>
              )}
              {columns.map((col, idx) => (
                <TableHead 
                  key={idx} 
                  className={`h-12 text-xs font-medium text-gray-600 ${col.className} ${col.sortKey ? 'cursor-pointer hover:text-[#0033A0] transition-colors' : ''}`}
                  onClick={() => col.sortKey && onSort?.(col.sortKey)}
                >
                  <div className={`flex items-center gap-1 ${col.className?.includes('text-right') ? 'justify-end' : ''}`}>
                    {col.header}
                    {col.sortKey && (
                      <ArrowUpDown className={`h-3.5 w-3.5 ${sortConfig?.key === col.sortKey ? 'text-[#0033A0]' : 'opacity-50'}`} />
                    )}
                  </div>
                </TableHead>
              ))}
              {actions && <TableHead className="w-[50px] h-12"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={`
                    border-b border-gray-100 last:border-0
                    ${onRowClick ? 'cursor-pointer' : ''} 
                    ${enableMultiSelect && effectiveSelectedIds.has(item.id) ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-gray-50'}
                    transition-colors
                  `}
                >
                  {enableMultiSelect && (
                    <TableCell className="py-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={effectiveSelectedIds.has(item.id)}
                        onCheckedChange={() => toggleRowSelection(item.id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col, idx) => (
                    <TableCell key={idx} className={`py-4 ${col.className}`}>
                      {col.cell
                        ? col.cell(item)
                        : typeof col.accessorKey === 'function'
                        ? col.accessorKey(item)
                        : (item[col.accessorKey] as React.ReactNode)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="py-4" onClick={(e) => e.stopPropagation()}>
                      {actions(item)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0) + (enableMultiSelect ? 1 : 0)}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Search className="h-10 w-10 mb-3 opacity-20" />
                    <p className="text-sm">No results found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 bg-transparent">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
          <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
          <span className="font-medium">{filteredData.length}</span> results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 bg-transparent hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[3ch] text-center">{currentPage}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 bg-transparent hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}