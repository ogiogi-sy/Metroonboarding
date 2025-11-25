import { useState, useMemo } from 'react';
import { Search, Plus, FileText, File, Receipt, CheckCircle2, Upload, Download, Share2, Eye, ChevronDown, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockDocuments, Document } from '../data/documents';
import { DocumentDrawer } from './DocumentDrawer';
import { GenerateDocumentModal } from './GenerateDocumentModal';
import { toast } from 'sonner@2.0.3';

type DocumentType = 'All' | 'Statement' | 'Letter' | 'Notice' | 'Tax' | 'Verification' | 'Uploaded' | 'Correspondence';
type GenerationType = 'balance' | 'statement' | 'tax' | null;

export function Documents() {
  const [activeTab, setActiveTab] = useState<DocumentType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);
  const [generateType, setGenerateType] = useState<GenerationType>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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

    // Filter by document types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(doc => selectedTypes.includes(doc.type));
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const documentDate = (doc: Document) => new Date(doc.date);
      
      switch (dateRange) {
        case '30days':
          filtered = filtered.filter(doc => {
            const diff = now.getTime() - documentDate(doc).getTime();
            return diff <= 30 * 24 * 60 * 60 * 1000;
          });
          break;
        case '6months':
          filtered = filtered.filter(doc => {
            const diff = now.getTime() - documentDate(doc).getTime();
            return diff <= 180 * 24 * 60 * 60 * 1000;
          });
          break;
        case '12months':
          filtered = filtered.filter(doc => {
            const diff = now.getTime() - documentDate(doc).getTime();
            return diff <= 365 * 24 * 60 * 60 * 1000;
          });
          break;
      }
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => doc.status.toLowerCase() === statusFilter);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeTab, searchQuery, selectedEntity, selectedAccount, selectedTypes, dateRange, statusFilter]);

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
    setSelectedTypes([]);
    setDateRange('all');
    setStatusFilter('all');
    setSearchQuery('');
    setActiveTab('All');
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = (type: GenerationType) => {
    setGenerateType(type);
    setShowGenerateMenu(false);
  };

  const handleFilterByAccount = (accountNumber: string) => {
    setSelectedAccount(accountNumber);
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleBulkDownload = () => {
    toast.success(`Downloading ${selectedRows.length} documents...`);
    setSelectedRows([]);
  };

  const handleBulkMarkRead = () => {
    toast.success(`Marked ${selectedRows.length} documents as read`);
    setSelectedRows([]);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'Statement':
        return <FileText className="h-4 w-4 text-accent" />;
      case 'Tax':
        return <Receipt className="h-4 w-4 text-accent" />;
      case 'Letter':
      case 'Notice':
        return <File className="h-4 w-4 text-accent" />;
      case 'Verification':
        return <CheckCircle2 className="h-4 w-4 text-accent" />;
      case 'Uploaded':
        return <Upload className="h-4 w-4 text-accent" />;
      default:
        return <FileText className="h-4 w-4 text-accent" />;
    }
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
    selectedTypes.length > 0,
    dateRange !== 'all',
    statusFilter !== 'all',
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
                className="bg-accent hover:bg-accent/90 text-white gap-2"
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
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-border z-20 overflow-hidden">
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

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {(['All', 'Statement', 'Letter', 'Notice', 'Tax', 'Verification', 'Uploaded'] as DocumentType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border hover:border-accent/50 text-muted-foreground hover:text-accent'
              }`}
            >
              {tab === 'All' ? `All Documents` : `${tab}s`}
              {tab === 'All' && unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Compact Filters Bar */}
        <div className="bg-white rounded-xl border border-border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 flex-1 w-full lg:w-auto">
              {/* Entity Filter */}
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-white text-sm min-w-[150px]"
              >
                <option value="all">All entities</option>
                {entities.map((entity) => (
                  <option key={entity} value={entity}>
                    {entity}
                  </option>
                ))}
              </select>

              {/* Account Filter */}
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-white text-sm min-w-[200px]"
              >
                <option value="all">All accounts</option>
                {accounts.map((account) => (
                  <option key={account.number} value={account.number}>
                    {account.name} • {account.number}
                  </option>
                ))}
              </select>

              {/* Date Range */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-white text-sm min-w-[150px]"
              >
                <option value="all">All time</option>
                <option value="30days">Last 30 days</option>
                <option value="6months">Last 6 months</option>
                <option value="12months">Last 12 months</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-white text-sm min-w-[120px]"
              >
                <option value="all">All status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>

              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-2 text-sm text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
                >
                  Reset filters ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Results Count */}
            {filteredDocuments.length > 0 && (
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                {filteredDocuments.length} of {mockDocuments.length} documents
              </p>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div>
          {/* Bulk Actions Bar */}
          {selectedRows.length > 0 && (
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 mb-4 flex items-center justify-between">
              <p className="text-sm" style={{ color: '#001A72' }}>
                {selectedRows.length} document{selectedRows.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={handleBulkDownload}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={handleBulkMarkRead}
                >
                  <Eye className="h-4 w-4" />
                  Mark Read
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
          )}

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
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide w-10">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRows(filteredDocuments.map(doc => doc.id));
                            } else {
                              setSelectedRows([]);
                            }
                          }}
                          checked={selectedRows.length === filteredDocuments.length && filteredDocuments.length > 0}
                        />
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide w-10"></th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Document</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Type</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Account</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Entity</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Date</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Status</th>
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
                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                            checked={selectedRows.includes(doc.id)}
                            onChange={() => handleRowSelect(doc.id)}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                            {getDocumentIcon(doc.type)}
                          </div>
                        </td>
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
                        <td className="px-4 py-4">
                          <Badge className={`${
                            doc.status === 'Unread'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-muted text-muted-foreground'
                          } border-0 text-xs`}>
                            {doc.status}
                          </Badge>
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