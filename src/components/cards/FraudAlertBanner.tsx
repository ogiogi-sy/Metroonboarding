import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface FraudAlertBannerProps {
  onReview: () => void;
}

export function FraudAlertBanner({ onReview }: FraudAlertBannerProps) {
  return (
    <div className="w-full bg-red-50 border-b border-red-200 py-4 px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-red-100 rounded-full shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-900">
              Suspicious activity detected on Card ending in 4242
            </p>
            <p className="text-xs text-red-700 mt-0.5">
              Please review a recent transaction of £450.00 at "Unfamiliar Merchant Ltd"
            </p>
          </div>
        </div>
        <Button 
          onClick={onReview}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 h-auto whitespace-nowrap"
        >
          Review Now
        </Button>
      </div>
    </div>
  );
}
