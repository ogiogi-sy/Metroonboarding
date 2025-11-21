import { Clock } from 'lucide-react';

interface ETAIndicatorProps {
  minutesRemaining: number;
  variant?: 'inline' | 'block';
}

export function ETAIndicator({ minutesRemaining, variant = 'inline' }: ETAIndicatorProps) {
  const getTimeText = () => {
    if (minutesRemaining === 0) return 'Almost done';
    if (minutesRemaining === 1) return '~1 minute left';
    return `~${minutesRemaining} minutes left`;
  };

  if (variant === 'block') {
    return (
      <div className="flex items-center gap-2 px-4 py-3 bg-blue-tint border border-border rounded-xl">
        <Clock className="w-4 h-4 text-accent" />
        <span className="text-sm text-accent">{getTimeText()}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Clock className="w-4 h-4" />
      <span className="text-sm">{getTimeText()}</span>
    </div>
  );
}
