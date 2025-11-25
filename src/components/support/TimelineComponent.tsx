import { CheckCircle2, Clock, FileText, MessageSquare, User, AlertCircle } from 'lucide-react';
import { TimelineEvent } from '../../data/support';

interface TimelineComponentProps {
  events: TimelineEvent[];
}

export function TimelineComponent({ events }: TimelineComponentProps) {
  const getIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'Created':
        return <Clock className="h-4 w-4" />;
      case 'Updated':
      case 'Status Changed':
        return <AlertCircle className="h-4 w-4" />;
      case 'Document Uploaded':
        return <FileText className="h-4 w-4" />;
      case 'Assigned':
        return <User className="h-4 w-4" />;
      case 'Message':
        return <MessageSquare className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'Completed':
        return 'bg-green-100 text-green-600';
      case 'Created':
        return 'bg-blue-100 text-blue-600';
      case 'Document Uploaded':
        return 'bg-purple-100 text-purple-600';
      case 'Message':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: dateObj.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className="space-y-0">
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {/* Timeline line */}
          {index < events.length - 1 && (
            <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
          )}
          
          {/* Event */}
          <div className="flex gap-3 pb-6">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-full ${getColor(event.type)} flex items-center justify-center shrink-0 z-10`}>
              {getIcon(event.type)}
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm" style={{ color: '#001A72' }}>{event.title}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(event.date)}</span>
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground">{event.description}</p>
              )}
              {event.user && (
                <p className="text-xs text-muted-foreground mt-1">by {event.user}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
