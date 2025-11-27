import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface FraudAlertBannerProps {
  onReview: () => void;
}

export function FraudAlertBanner({ onReview }: FraudAlertBannerProps) {
  return (
    <div className="px-8 py-6 pb-2">
      <div className="max-w-7xl mx-auto w-full bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-[#E4002B]" />
          </div>
          <div>
            <p className="text-base font-normal text-[#000D45]">
              Suspicious activity detected on Card ending in 4242
            </p>
            <p className="text-sm text-[#475569] mt-1">
              Please review a recent transaction of £450.00 at "Unfamiliar Merchant Ltd"
            </p>
          </div>
        </div>
        <Button 
          onClick={onReview}
          className="bg-[#E4002B] hover:bg-[#B91C1C] text-white text-sm font-normal px-6 py-2.5 h-auto whitespace-nowrap rounded-full transition-colors"
        >
          Review Now
        </Button>
      </div>
    </div>
  );
}