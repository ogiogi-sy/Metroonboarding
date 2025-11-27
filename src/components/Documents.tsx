import { useState, useMemo } from 'react';
import { Search, Plus, FileText, Download, Eye, ChevronDown, X } from 'lucide-react';
import { Button } from './ui/button';
import { mockDocuments, Document } from '../data/documents';
import { DocumentDrawer } from './DocumentDrawer';
import { GenerateDocumentModal } from './GenerateDocumentModal';
import { toast } from 'sonner@2.0.3';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DocumentType = 'All' | 'Statement' | 'Letter' | 'Notice' | 'Tax' | 'Verification' | 'Uploaded' | 'Correspondence';
type GenerationType = 'balance' | 'statement' | 'tax' | null;

export function Documents() {
  const [activeTab, setActiveTab] = useState<DocumentType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<string>('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);
  const [generateType, setGenerateType] = useState<GenerationType>(null);

  // Get unique entities and accounts
  const entities = useMemo(() => {
    const uniqueEntities = Array.from(new Set(mockDocuments.map(doc => doc.entity)));
    return uniqueEntities;
  }, []);

  const accounts = useMemo(() => {
    const uniqueAccounts = Array.from(new Set(mockDocuments.map(doc => ({
      name: doc.account,
      number: doc.accountNumber
    })).map(acc => JSON.stringify(acc))));
    return uniqueAccounts.map(acc => JSON.parse(acc));
  }, []);

  // Mock cards mapping
  const cards = useMemo(() => [
    { id: 'card_1', name: 'Business Debit •••• 4242', accountNumber: '12345678' },
    { id: 'card_2', name: 'Business Debit •••• 8888', accountNumber: '45678901' },
    { id: 'card_3', name: 'Corporate Credit •••• 1234', accountNumber: '87654321' },
  ], []);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    let filtered = mockDocuments;

    // Filter by active tab
    if (activeTab !== 'All') {
      filtered = filtered.filter(doc => doc.type === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.account.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by entity
    if (selectedEntity !== 'all') {
      filtered = filtered.filter(doc => doc.entity === selectedEntity);
    }

    // Filter by account
    if (selectedAccount !== 'all') {
      filtered = filtered.filter(doc => doc.accountNumber === selectedAccount);
    }

    // Filter by card
    if (selectedCard !== 'all') {
      const card = cards.find(c => c.id === selectedCard);
      if (card) {
        filtered = filtered.filter(doc => doc.accountNumber === card.accountNumber);
      }
    }

    // Filter by document types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(doc => selectedTypes.includes(doc.type));
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => doc.status.toLowerCase() === statusFilter);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeTab, searchQuery, selectedEntity, selectedAccount, selectedCard, selectedTypes, statusFilter, cards]);

  // Count unread documents
  const unreadCount = useMemo(() => {
    return mockDocuments.filter(doc => doc.status === 'Unread').length;
  }, []);

  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc);
    setIsDrawerOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedEntity('all');
    setSelectedAccount('all');
    setSelectedCard('all');
    setSelectedTypes([]);
    setStatusFilter('all');
    setSearchQuery('');
    setActiveTab('All');
  };

  const handleGenerate = (type: GenerationType) => {
    setGenerateType(type);
    setShowGenerateMenu(false);
  };

  const handleFilterByAccount = (accountNumber: string) => {
    setSelectedAccount(accountNumber);
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const activeFiltersCount = [
    selectedEntity !== 'all',
    selectedAccount !== 'all',
    selectedCard !== 'all',
    selectedTypes.length > 0,
    statusFilter !== 'all',
    searchQuery !== ''
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl mb-2" style={{ color: '#001A72' }}>Documents</h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Your statements, letters, notices, and verification documents — across all your business accounts.
              </p>
            </div>
            
            {/* Generate Document Dropdown */}
            <div className="relative">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2"
                onClick={() => setShowGenerateMenu(!showGenerateMenu)}
              >
                <Plus className="h-4 w-4" />
                Generate Document
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showGenerateMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowGenerateMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-border z-20 overflow-hidden">
                    <button
                      onClick={() => handleGenerate('balance')}
                      className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border"
                    >
                      <p className="text-sm" style={{ color: '#001A72' }}>Balance Confirmation Letter</p>
                      <p className="text-xs text-muted-foreground mt-0.5">For auditors or visa applications</p>
                    </button>
                    <button
                      onClick={() => handleGenerate('statement')}
                      className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border"
                    >
                      <p className="text-sm" style={{ color: '#001A72' }}>Custom Statement</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Select custom date range</p>
                    </button>
                    <button
                      onClick={() => handleGenerate('tax')}
                      className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                    >
                      <p className="text-sm" style={{ color: '#001A72' }}>Tax-Year Summary</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Full year tax documentation</p>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {(['All', 'Statement', 'Letter', 'Notice', 'Tax', 'Verification', 'Uploaded'] as DocumentType[]).map((tab) => {
            const getLabel = (type: DocumentType) => {
              switch (type) {
                case 'All': return 'All Documents';
                case 'Uploaded': return 'Your Uploads';
                default: return type;
              }
            };

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border hover:border-accent/50 text-muted-foreground hover:text-accent'
                }`}
              >
                {getLabel(tab)}
                {tab === 'All' && unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Consolidated Search & Filters Bar */}
        <div className="bg-white rounded-xl border border-border p-2 mb-6 flex flex-col md:flex-row gap-2 md:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <input
               type="text"
               placeholder="Search by title, entity or account..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-transparent border-none focus:ring-0 text-sm placeholder:text-muted-foreground focus:outline-none"
             />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-100" />
          <div className="md:hidden h-px w-full bg-gray-100" />

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 px-1">
             {/* Entity Filter */}
             <div className="relative min-w-[140px]">
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-accent/50 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <option value="all">All Entities</option>
                  {entities.map((entity) => (
                    <option key={entity} value={entity}>{entity}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
             </div>

             {/* Account Filter */}
             <div className="relative min-w-[160px]">
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-accent/50 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <option value="all">All Accounts</option>
                  {accounts.map((account) => (
                    <option key={account.number} value={account.number}>
                      {account.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
             </div>

             {/* Card Filter */}
             <div className="relative min-w-[180px]">
                <select
                  value={selectedCard}
                  onChange={(e) => setSelectedCard(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-accent/50 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <option value="all">All Cards</option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
             </div>

             {/* Reset Button */}
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
        </div>

        {/* Main Content Area */}
        <div>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {filteredDocuments.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-sm text-muted-foreground">
                  {searchQuery || activeFiltersCount > 0
                    ? 'No documents match your filters.'
                    : 'Nothing here yet. Your documents will appear as soon as they\'re available.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30 border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Document</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Type</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Account</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Entity</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Date</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredDocuments.map((doc) => (
                      <tr
                        key={doc.id}
                        className="hover:bg-muted/20 transition-colors group cursor-pointer"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {doc.status === 'Unread' && (
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                            )}
                            <p className="text-sm" style={{ color: '#001A72' }}>{doc.title}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-muted-foreground">{doc.type}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-muted-foreground">
                            {doc.account} • {doc.accountNumber}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-muted-foreground">{doc.entity}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-muted-foreground">{formatDate(doc.date)}</p>
                        </td>
                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="w-8 h-8 rounded-lg hover:bg-accent/10 flex items-center justify-center transition-colors"
                              onClick={() => toast.success('Downloading...')}
                              title="Download"
                            >
                              <Download className="h-4 w-4 text-accent" />
                            </button>
                            <button
                              className="w-8 h-8 rounded-lg hover:bg-accent/10 flex items-center justify-center transition-colors"
                              onClick={() => handleDocumentClick(doc)}
                              title="Preview"
                            >
                              <Eye className="h-4 w-4 text-accent" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Preview Drawer */}
      <DocumentDrawer
        document={selectedDocument}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setTimeout(() => setSelectedDocument(null), 300);
        }}
        onFilterByAccount={handleFilterByAccount}
      />

      {/* Generate Document Modal */}
      <GenerateDocumentModal
        isOpen={generateType !== null}
        onClose={() => setGenerateType(null)}
        type={generateType}
      />
    </div>
  );
}
