import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileText, Sheet, File, Download, Mail, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  count: number; // Number of transactions to export
}

export function ExportDialog({ isOpen, onClose, count }: ExportDialogProps) {
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [deliveryMethod, setDeliveryMethod] = useState<'download' | 'email' | 'link'>('download');

  const handleExport = () => {
    toast.success(`Successfully exported ${count} transactions as ${format.toUpperCase()}`, {
      description: deliveryMethod === 'email' ? 'Sent to your registered email address' : 'Download started'
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#001A72]">Export Transactions</DialogTitle>
          <DialogDescription>
            Configure your export settings. You are exporting {count} transactions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Export Format</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormat('csv')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                  format === 'csv' 
                    ? 'border-[#0033A0] bg-blue-50/50 text-[#0033A0]' 
                    : 'border-border hover:border-[#0033A0]/30 text-muted-foreground'
                }`}
              >
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-xs font-medium">CSV</span>
              </button>
              <button
                onClick={() => setFormat('excel')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                  format === 'excel' 
                    ? 'border-[#0033A0] bg-blue-50/50 text-[#0033A0]' 
                    : 'border-border hover:border-[#0033A0]/30 text-muted-foreground'
                }`}
              >
                <Sheet className="h-6 w-6 mb-2" />
                <span className="text-xs font-medium">Excel</span>
              </button>
              <button
                onClick={() => setFormat('pdf')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                  format === 'pdf' 
                    ? 'border-[#0033A0] bg-blue-50/50 text-[#0033A0]' 
                    : 'border-border hover:border-[#0033A0]/30 text-muted-foreground'
                }`}
              >
                <File className="h-6 w-6 mb-2" />
                <span className="text-xs font-medium">PDF</span>
              </button>
            </div>
          </div>

          {/* PDF Options (Conditional) */}
          {format === 'pdf' && (
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-border/50">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">PDF Branding</Label>
              <RadioGroup defaultValue="branded">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="branded" id="branded" />
                  <Label htmlFor="branded" className="font-normal">Official Letterhead</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="logo" id="logo" />
                  <Label htmlFor="logo" className="font-normal">Logo Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="plain" id="plain" />
                  <Label htmlFor="plain" className="font-normal">Plain Text</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Include Data</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="notes" defaultChecked />
                <Label htmlFor="notes" className="font-normal text-sm">Notes & Tags</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="balance" defaultChecked />
                <Label htmlFor="balance" className="font-normal text-sm">Running Balance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="enrichment" defaultChecked />
                <Label htmlFor="enrichment" className="font-normal text-sm">Enrichment Data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fees" defaultChecked />
                <Label htmlFor="fees" className="font-normal text-sm">Fee Breakdown</Label>
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Deliver To</Label>
            <Select value={deliveryMethod} onValueChange={(v: any) => setDeliveryMethod(v)}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="download">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Direct Download</span>
                  </div>
                </SelectItem>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email to Accountant</span>
                  </div>
                </SelectItem>
                <SelectItem value="link">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>Secure Link</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-3 border-t border-border pt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            className="bg-[#0033A0] hover:bg-[#002b87] text-white"
            onClick={handleExport}
          >
            Export {count} Transactions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}