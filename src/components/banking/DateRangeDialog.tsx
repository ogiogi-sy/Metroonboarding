import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button, buttonVariants } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { cn } from '../ui/utils';
import { subDays, startOfMonth, endOfMonth, subMonths, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface DateRangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dateRange: { from: Date | undefined; to: Date | undefined };
  onApply: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

export function DateRangeDialog({ isOpen, onClose, dateRange, onApply }: DateRangeDialogProps) {
  const [tempRange, setTempRange] = useState<DateRange | undefined>(
    dateRange.from ? { from: dateRange.from, to: dateRange.to } : undefined
  );

  // Sync temp state with props when opening
  useEffect(() => {
    if (isOpen) {
      setTempRange(dateRange.from ? { from: dateRange.from, to: dateRange.to } : undefined);
    }
  }, [isOpen, dateRange]);

  const handlePreset = (type: '30days' | '60days' | 'currMonth' | 'lastMonth') => {
    const today = new Date();
    let from: Date | undefined;
    let to: Date | undefined;

    switch (type) {
      case '30days':
        to = endOfDay(today);
        from = startOfDay(subDays(today, 30));
        break;
      case '60days':
        to = endOfDay(today);
        from = startOfDay(subDays(today, 60));
        break;
      case 'currMonth':
        to = endOfDay(today);
        from = startOfDay(startOfMonth(today));
        break;
      case 'lastMonth':
        const lastMonth = subMonths(today, 1);
        from = startOfDay(startOfMonth(lastMonth));
        to = endOfDay(endOfMonth(lastMonth));
        break;
    }
    setTempRange({ from, to });
  };

  const handleApply = () => {
    onApply({ from: tempRange?.from, to: tempRange?.to });
    onClose();
  };

  const isPresetActive = (type: '30days' | '60days' | 'currMonth' | 'lastMonth') => {
    if (!tempRange?.from || !tempRange?.to) return false;
    
    const today = new Date();
    let checkFrom: Date | undefined;
    let checkTo: Date | undefined;

    switch (type) {
      case '30days':
        checkTo = endOfDay(today);
        checkFrom = startOfDay(subDays(today, 30));
        break;
      case '60days':
        checkTo = endOfDay(today);
        checkFrom = startOfDay(subDays(today, 60));
        break;
      case 'currMonth':
        checkTo = endOfDay(today);
        checkFrom = startOfDay(startOfMonth(today));
        break;
      case 'lastMonth':
        const lastMonth = subMonths(today, 1);
        checkFrom = startOfDay(startOfMonth(lastMonth));
        checkTo = endOfDay(endOfMonth(lastMonth));
        break;
    }

    return isSameDay(tempRange.from, checkFrom!) && isSameDay(tempRange.to, checkTo!);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[600px] p-0 gap-0 overflow-hidden rounded-xl bg-white max-h-[90vh] flex flex-col">
        <div className="flex flex-col sm:flex-row h-full overflow-hidden">
            {/* Sidebar - Desktop Only */}
            <div className="hidden sm:flex w-[160px] bg-gray-50 border-r border-border p-4 flex-col gap-2 shrink-0">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Presets</div>
                <Button 
                    variant={isPresetActive('currMonth') ? 'secondary' : 'ghost'} 
                    size="sm" 
                    className={`justify-start h-8 text-sm font-normal ${isPresetActive('currMonth') ? 'bg-white border border-gray-200 text-[#0033A0]' : ''}`}
                    onClick={() => handlePreset('currMonth')}
                >
                    Current Month
                </Button>
                <Button 
                    variant={isPresetActive('lastMonth') ? 'secondary' : 'ghost'} 
                    size="sm" 
                    className={`justify-start h-8 text-sm font-normal ${isPresetActive('lastMonth') ? 'bg-white border border-gray-200 text-[#0033A0]' : ''}`}
                    onClick={() => handlePreset('lastMonth')}
                >
                    Last Month
                </Button>
                <Button 
                    variant={isPresetActive('30days') ? 'secondary' : 'ghost'} 
                    size="sm" 
                    className={`justify-start h-8 text-sm font-normal ${isPresetActive('30days') ? 'bg-white border border-gray-200 text-[#0033A0]' : ''}`}
                    onClick={() => handlePreset('30days')}
                >
                    Last 30 Days
                </Button>
                <Button 
                    variant={isPresetActive('60days') ? 'secondary' : 'ghost'} 
                    size="sm" 
                    className={`justify-start h-8 text-sm font-normal ${isPresetActive('60days') ? 'bg-white border border-gray-200 text-[#0033A0]' : ''}`}
                    onClick={() => handlePreset('60days')}
                >
                    Last 60 Days
                </Button>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border shrink-0">
                    <DialogTitle className="text-lg font-semibold text-[#001A72]">Select Date Range</DialogTitle>
                </DialogHeader>

                 {/* Presets - Mobile Only (Horizontal) */}
                 <div className="sm:hidden w-full bg-gray-50 border-b border-border p-3 flex gap-2 overflow-x-auto whitespace-nowrap shrink-0">
                    <Button 
                        variant={isPresetActive('currMonth') ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className={`h-8 text-xs font-normal ${isPresetActive('currMonth') ? 'bg-white border border-gray-200 text-[#0033A0]' : ''}`}
                        onClick={() => handlePreset('currMonth')}
                    >
                        Current Month
                    </Button>
                    <Button 
                        variant={isPresetActive('lastMonth') ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className={`h-8 text-xs font-normal ${isPresetActive('lastMonth') ? 'bg-white border border-gray-200 text-[#0033A0]' : ''}`}
                        onClick={() => handlePreset('lastMonth')}
                    >
                        Last Month
                    </Button>
                    <Button 
                        variant={isPresetActive('30days') ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className={`h-8 text-xs font-normal ${isPresetActive('30days') ? 'bg-white border border-gray-200 text-[#0033A0]' : ''}`}
                        onClick={() => handlePreset('30days')}
                    >
                        Last 30 Days
                    </Button>
                    <Button 
                        variant={isPresetActive('60days') ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className={`h-8 text-xs font-normal ${isPresetActive('60days') ? 'bg-white border border-gray-200 text-[#0033A0]' : ''}`}
                        onClick={() => handlePreset('60days')}
                    >
                        Last 60 Days
                    </Button>
                </div>
                
                <div className="p-2 sm:p-6 flex justify-center flex-1 overflow-y-auto w-full">
                    <Calendar
                        mode="range"
                        selected={tempRange}
                        onSelect={setTempRange}
                        numberOfMonths={1}
                        defaultMonth={tempRange?.from}
                        initialFocus
                        className="rounded-md border border-gray-200 sm:border-0 w-full"
                        classNames={{
                            months: "w-full flex flex-col sm:flex-row gap-2",
                            month: "w-full flex flex-col gap-4",
                            table: "w-full",
                            head_row: "flex w-full justify-between",
                            head_cell: "w-full text-muted-foreground font-normal text-[0.8rem]",
                            row: "flex w-full mt-2 justify-between",
                            cell: "w-full p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                            day: cn(
                                buttonVariants({ variant: "ghost" }),
                                "h-9 w-full p-0 font-normal aria-selected:opacity-100"
                            ),
                        }}
                    />
                </div>

                <DialogFooter className="px-4 sm:px-6 py-3 sm:py-4 border-t border-border bg-gray-50/50 shrink-0">
                    <div className="flex justify-between items-center w-full">
                        <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setTempRange(undefined)}
                            >
                                Reset
                            </Button>
                            <Button 
                                size="sm" 
                                className="bg-[#0033A0] hover:bg-[#002b87] text-white"
                                onClick={handleApply}
                            >
                                Apply Range
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
