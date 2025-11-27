import React, { useState, useMemo } from 'react';
import { NavigationSidebar } from '../NavigationSidebar';
import { DashboardHeader } from '../DashboardHeader';
import { CardsHeader } from '../cards/CardsHeader';
import { FraudAlertBanner } from '../cards/FraudAlertBanner';
import { CardGrid } from '../cards/CardGrid';
import { CardDetailScreen } from '../cards/CardDetailScreen';
import { Button } from '../ui/button';
import { CardData } from '../cards/CardTile';
import { Badge } from '../ui/badge';
import { FilterableTable } from '../banking/FilterableTable';
import { 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  Filter, 
  LayoutGrid, 
  LayoutList, 
  MoreHorizontal, 
  ArrowUpDown,
  Download,
  Snowflake,
  PlayCircle,
  RefreshCw,
  Copy,
  ChevronDown,
  X,
  Edit,
  Plus
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { cn } from '../ui/utils';
import { toast } from 'sonner@2.0.3';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CardPermissionsProvider, useCardPermissions, UserRole } from '../cards/CardPermissionsContext';

// Mock Data
const MOCK_CARDS: CardData[] = [
  {
    id: '1',
    accountId: '1',
    entityName: 'Metro Bank UK Ltd',
    status: 'active',
    type: 'physical',
    last4: '3821',
    cardholderName: 'Sarah Johnson',
    expiryDate: '09/26',
    brand: 'visa',
    monthlySpend: 1250.50
  },
  {
    id: '2',
    accountId: '1',
    entityName: 'Metro Bank UK Ltd',
    status: 'frozen',
    type: 'physical',
    last4: '4592',
    cardholderName: 'James Smith',
    expiryDate: '12/25',
    brand: 'mastercard',
    monthlySpend: 450.00
  },
  {
    id: '3',
    accountId: '3',
    entityName: 'Marketing Budget',
    status: 'active',
    type: 'virtual',
    last4: '8821',
    cardholderName: 'Marketing Team',
    expiryDate: '03/25',
    brand: 'visa',
    monthlySpend: 3450.20
  },
  {
    id: '4',
    accountId: '3',
    entityName: 'Travel Expenses',
    status: 'active',
    type: 'virtual',
    last4: '1029',
    cardholderName: 'Sales Dept',
    expiryDate: '11/24',
    brand: 'visa',
    monthlySpend: 890.00
  },
  {
    id: '5',
    accountId: '4',
    entityName: 'Metro Bank EU',
    status: 'blocked',
    type: 'physical',
    last4: '9932',
    cardholderName: 'Alex Chen',
    expiryDate: '01/24',
    brand: 'mastercard',
    monthlySpend: 0.00
  }
];

interface CardsScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
  userRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

type ViewState = 'list' | 'detail';
export type UserRole = 'admin' | 'employee';
type ViewMode = 'grid' | 'list';

export function CardsScreen({ 
  onNavigate, 
  businessData, 
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange,
  userRole: initialUserRole = 'admin',
  onRoleChange
}: CardsScreenProps) {
  const [view, setView] = useState<ViewState>('list');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showFraudAlert, setShowFraudAlert] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(initialUserRole);
  const [cards, setCards] = useState<CardData[]>(MOCK_CARDS);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Selection
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Freeze/Unfreeze Logic
  const [isFreezeOpen, setIsFreezeOpen] = useState(false);
  const [cardToFreeze, setCardToFreeze] = useState<CardData | null>(null);
  const [freezeStep, setFreezeStep] = useState<'confirm' | 'success'>('confirm');
  const [bulkActionType, setBulkActionType] = useState<'freeze' | 'unfreeze' | null>(null);

  // Add/Edit Cardholder Logic
  const [isAddCardholderOpen, setIsAddCardholderOpen] = useState(false);
  const [isEditCardholderOpen, setIsEditCardholderOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'employee'
  });

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      role: 'employee'
    });
    setEditingCard(null);
  };

  const handleAddCardholder = () => {
    resetForm();
    setIsAddCardholderOpen(true);
  };

  const handleSaveNewCardholder = () => {
    // Simulate API call
    setTimeout(() => {
        const newCard: CardData = {
            id: Math.random().toString(36).substr(2, 9),
            accountId: '1',
            entityName: 'Metro Bank UK Ltd',
            status: 'pending', // "Issuing" or "Card requested" as per prompt, usually 'pending' maps to this
            type: 'physical',
            last4: '----',
            cardholderName: formData.fullName,
            expiryDate: 'MM/YY',
            brand: 'visa',
            monthlySpend: 0
        };
        
        setCards([newCard, ...cards]);
        setIsAddCardholderOpen(false);
        toast.success("New cardholder added. Card is being issued.");
        resetForm();
    }, 800);
  };

  const handleEditCardholder = (card: CardData) => {
    setEditingCard(card);
    setFormData({
        fullName: card.cardholderName,
        email: '', // Mock email as it's not in CardData
        role: 'employee' // Mock role
    });
    setIsEditCardholderOpen(true);
  };

  const handleUpdateCardholder = () => {
    if (!editingCard) return;

    setTimeout(() => {
        setCards(cards.map(c => 
            c.id === editingCard.id 
                ? { ...c, cardholderName: formData.fullName }
                : c
        ));
        setIsEditCardholderOpen(false);
        toast.success("Cardholder updated.");
        resetForm();
    }, 800);
  };

  const handleCardFreezeToggle = (card: CardData) => {
    setCardToFreeze(card);
    setFreezeStep('confirm');
    setIsFreezeOpen(true);
  };

  const confirmFreezeToggle = () => {
    setFreezeStep('success');
    
    setTimeout(() => {
      // Update card status
      setCards(prevCards => prevCards.map(c => {
        // Handle single card toggle
        if (cardToFreeze && c.id === cardToFreeze.id) {
          return {
            ...c,
            status: c.status === 'frozen' ? 'active' : 'frozen'
          };
        }
        // Handle bulk action
        if (bulkActionType && selectedRows.includes(c.id)) {
          return {
            ...c,
            status: bulkActionType === 'freeze' ? 'frozen' : 'active'
          };
        }
        return c;
      }));
      
      setIsFreezeOpen(false);
      setCardToFreeze(null);
      setBulkActionType(null);
      setSelectedRows([]);
    }, 1500);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedCardId(null);
  };

  const handleAccountSelectionChange = (accountIds: string[]) => {
    if (onAccountSelectionChange) {
      onAccountSelectionChange(accountIds);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterStatus('all');
  };

  // Filter cards based on selection AND user role AND search/filters
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      // 1. Account Filter
      const accountMatch = !card.accountId || selectedAccounts.includes(card.accountId);
      if (!accountMatch) return false;

      // 2. Role Filter
      if (userRole === 'employee') {
        // Employee only sees their own card
        if (card.cardholderName !== 'Sarah Johnson') return false;
      }
      
      // 3. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          card.cardholderName.toLowerCase().includes(query) ||
          card.last4.includes(query) ||
          card.entityName.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 4. Type Filter
      if (filterType !== 'all' && card.type !== filterType) return false;

      // 5. Status Filter
      if (filterStatus !== 'all' && card.status !== filterStatus) return false;

      return true;
    });
  }, [cards, selectedAccounts, userRole, searchQuery, filterType, filterStatus]);

  const activeFiltersCount = [
    searchQuery !== '',
    filterType !== 'all',
    filterStatus !== 'all'
  ].filter(Boolean).length;

  // Bulk Actions
  const handleBulkAction = (action: 'freeze' | 'unfreeze') => {
    setBulkActionType(action);
    setFreezeStep('confirm');
    setIsFreezeOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredCards.map(c => c.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#10b981] hover:bg-[#059669] text-white border-0">Active</Badge>;
      case 'frozen':
        return <Badge className="bg-[#3b82f6] hover:bg-[#2563eb] text-white border-0">Frozen</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Blocked</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0">Issuing</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <NavigationSidebar 
        activeSection="cards"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={handleAccountSelectionChange}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <DashboardHeader 
          activeSection="cards"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={handleAccountSelectionChange}
          userRole={userRole}
          onRoleChange={(role) => {
            setUserRole(role);
            setSelectedRows([]);
            if (onRoleChange) onRoleChange(role);
          }}
        />

        {view === 'list' ? (
          <div className="flex flex-col">
            {showFraudAlert && (
              <FraudAlertBanner onReview={() => console.log('Review fraud alert')} />
            )}
            
            {/* Header */}
            <CardsHeader onCreateCard={handleAddCardholder} userRole={userRole} />

            {/* Search & Filter Bar */}
            <div className="px-8 pb-6">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-col md:flex-row gap-2 md:items-center">
                   {/* Search */}
                   <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search cards or employees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm placeholder:text-muted-foreground focus:outline-none"
                      />
                   </div>

                   {/* Divider */}
                   <div className="hidden md:block w-px h-8 bg-gray-100" />
                   
                   {/* Filters */}
                   <div className="flex flex-wrap items-center gap-2 px-1">
                      {/* Card Type Filter */}
                      <div className="relative min-w-[140px]">
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-accent/50 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <option value="all">All Types</option>
                          <option value="physical">Physical</option>
                          <option value="virtual">Virtual</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                      </div>

                      {/* Status Filter */}
                      <div className="relative min-w-[140px]">
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-accent/50 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="frozen">Frozen</option>
                          <option value="blocked">Blocked</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                      </div>

                      {/* Reset */}
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={handleResetFilters}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-1"
                          title="Reset all filters"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                   </div>
                   
                   {/* View Toggle */}
                   <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1 ml-2">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-accent' : 'text-gray-400 hover:text-gray-600'}`}
                        title="List view"
                      >
                        <LayoutList className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-accent' : 'text-gray-400 hover:text-gray-600'}`}
                        title="Grid view"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Bulk Actions (Admin Only) */}
            {userRole === 'admin' && selectedRows.length > 0 && (
              <div className="px-8 mb-4">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm font-medium" style={{ color: '#001A72' }}>
                    {selectedRows.length} card{selectedRows.length !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 bg-white"
                      onClick={() => handleBulkAction('freeze')}
                    >
                      <Snowflake className="h-4 w-4 text-blue-500" />
                      Freeze Selected
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 bg-white"
                      onClick={() => handleBulkAction('unfreeze')}
                    >
                      <PlayCircle className="h-4 w-4 text-green-600" />
                      Unfreeze Selected
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 bg-white"
                      onClick={() => toast.info("Bulk replacement flow coming soon")}
                    >
                      <RefreshCw className="h-4 w-4 text-gray-500" />
                      Replace
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedRows([])}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <main className="flex-1 px-8 pb-8">
              <div className="max-w-7xl mx-auto">
                {viewMode === 'grid' ? (
                  <CardGrid 
                    onCardClick={handleCardClick} 
                    cards={filteredCards} 
                    onFreezeToggle={handleCardFreezeToggle}
                  />
                ) : (
                  <FilterableTable
                    data={filteredCards}
                    columns={[
                      {
                        header: 'Card Details',
                        accessorKey: 'entityName',
                        cell: (card: CardData) => (
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-10 h-6 rounded flex items-center justify-center text-white text-[8px] font-bold tracking-wider",
                              card.type === 'physical' ? "bg-gradient-to-r from-[#1a47a3] to-[#103280]" : "bg-gradient-to-r from-[#2563eb] to-[#1e40af]"
                            )}>
                              •••• {card.last4}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">{card.entityName}</span>
                              <span className="text-xs text-gray-500 capitalize">{card.type} • Exp {card.expiryDate}</span>
                            </div>
                          </div>
                        )
                      },
                      {
                        header: 'Cardholder',
                        accessorKey: 'cardholderName',
                        cell: (card: CardData) => (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium">
                              {card.cardholderName.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-900">{card.cardholderName}</span>
                          </div>
                        )
                      },
                      {
                        header: 'Status',
                        accessorKey: 'status',
                        cell: (card: CardData) => getStatusBadge(card.status)
                      },
                      {
                        header: 'Monthly Spend',
                        accessorKey: 'monthlySpend',
                        className: 'text-right',
                        cell: (card: CardData) => (
                          <span className="text-[15px] font-normal text-[#000D45] tracking-tight">
                            {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(card.monthlySpend)}
                          </span>
                        )
                      }
                    ]}
                    onRowClick={(card) => handleCardClick(card.id)}
                    enableMultiSelect={userRole === 'admin'}
                    selectedIds={new Set(selectedRows)}
                    onSelectionChange={(ids) => setSelectedRows(Array.from(ids))}
                    actions={userRole === 'admin' ? (card: CardData) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleCardClick(card.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCardholder(card)}>
                            Edit cardholder details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleCardFreezeToggle(card)}
                          >
                            {card.status === 'frozen' ? 'Unfreeze Card' : 'Freeze Card'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : undefined}
                    hideSearch={true}
                    itemsPerPage={10}
                  />
                )}
              </div>
            </main>
          </div>
        ) : (
          <CardDetailScreen 
            cardId={selectedCardId!} 
            onBack={handleBack} 
            userRole={userRole}
            isOwnCard={userRole === 'employee' || (userRole === 'admin' && selectedCardId === '1')} // Demo logic
          />
        )}

        {/* Freeze/Unfreeze Modal */}
        <Dialog open={isFreezeOpen} onOpenChange={setIsFreezeOpen}>
          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <DialogTitle>
                      {freezeStep === 'confirm' 
                          ? (bulkActionType 
                              ? `${bulkActionType === 'freeze' ? 'Freeze' : 'Unfreeze'} ${selectedRows.length} cards?`
                              : (cardToFreeze?.status === 'frozen' ? 'Unfreeze your card?' : 'Freeze your card?')
                            )
                          : 'Success'
                      }
                  </DialogTitle>
                  <DialogDescription>
                      {freezeStep === 'confirm' 
                          ? (bulkActionType
                              ? `This will ${bulkActionType} all selected cards immediately.`
                              : (cardToFreeze?.status === 'frozen' 
                                  ? 'Unfreezing your card restores full usage immediately.' 
                                  : 'Freezing your card instantly blocks all new transactions until you unfreeze it.'
                                )
                            )
                          : (bulkActionType 
                              ? `Selected cards have been ${bulkActionType === 'freeze' ? 'frozen' : 'activated'}.`
                              : (cardToFreeze?.status === 'frozen' 
                                  ? 'Your card is active again.' 
                                  : 'Your card has been frozen.'
                                )
                            )
                      }
                  </DialogDescription>
              </DialogHeader>
              
              {freezeStep === 'confirm' ? (
                  <DialogFooter className="sm:justify-between gap-2">
                      <Button variant="secondary" onClick={() => setIsFreezeOpen(false)}>
                          Cancel
                      </Button>
                      <Button 
                        onClick={confirmFreezeToggle} 
                        className="bg-[#0033A0] hover:bg-[#002b87] text-white"
                      >
                          {bulkActionType 
                            ? (bulkActionType === 'freeze' ? 'Freeze Cards' : 'Unfreeze Cards')
                            : (cardToFreeze?.status === 'frozen' ? 'Unfreeze card' : 'Freeze card')
                          }
                      </Button>
                  </DialogFooter>
              ) : (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Success!</h3>
                  </div>
              )}
          </DialogContent>
        </Dialog>

        {/* Add Cardholder Modal */}
        <Dialog open={isAddCardholderOpen} onOpenChange={setIsAddCardholderOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add new cardholder</DialogTitle>
                    <DialogDescription>
                        A new card will be issued to this cardholder.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                            id="name" 
                            placeholder="e.g. Jane Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="e.g. jane@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select 
                            value={formData.role} 
                            onValueChange={(val) => setFormData({...formData, role: val})}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="employee">Employee</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                    <Button 
                        variant="outline" 
                        onClick={() => setIsAddCardholderOpen(false)}
                        className="w-full sm:w-auto border-[#0033A0] text-[#0033A0] hover:bg-blue-50 rounded-full"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSaveNewCardholder}
                        className={cn(
                            "w-full sm:w-auto text-white rounded-full bg-[#0033A0] hover:bg-[#002b87] transition-opacity",
                            !formData.fullName && "opacity-50 cursor-not-allowed bg-[#7C95D4] hover:bg-[#7C95D4]"
                        )}
                        disabled={!formData.fullName}
                    >
                        Create cardholder & issue card
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Edit Cardholder Modal */}
        <Dialog open={isEditCardholderOpen} onOpenChange={setIsEditCardholderOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit cardholder</DialogTitle>
                    <DialogDescription>
                        Update details for {editingCard?.cardholderName}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input 
                            id="edit-name" 
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input 
                            id="edit-email" 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-role">Role</Label>
                        <Select 
                            value={formData.role} 
                            onValueChange={(val) => setFormData({...formData, role: val})}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="employee">Employee</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                    <Button 
                        variant="outline" 
                        onClick={() => setIsEditCardholderOpen(false)}
                        className="w-full sm:w-auto border-[#0033A0] text-[#0033A0] hover:bg-blue-50 rounded-full"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleUpdateCardholder}
                        className={cn(
                            "w-full sm:w-auto text-white rounded-full bg-[#0033A0] hover:bg-[#002b87] transition-opacity",
                            !formData.fullName && "opacity-50 cursor-not-allowed bg-[#7C95D4] hover:bg-[#7C95D4]"
                        )}
                        disabled={!formData.fullName}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}