import { SupportLanding } from './support/SupportLanding';
import { ChatView } from './support/ChatView';
import { ServiceRequests } from './support/ServiceRequests';
import { ComplaintsDisputes } from './support/ComplaintsDisputes';
import { FraudSecurity } from './support/FraudSecurity';
import { Appointments } from './support/Appointments';

export type SupportSection = 'home' | 'chat' | 'messages' | 'requests' | 'complaints' | 'fraud' | 'appointments';

interface SupportProps {
  activeSection: SupportSection;
  onNavigate: (section: string) => void;
}

export function Support({ activeSection, onNavigate }: SupportProps) {
  if (activeSection === 'chat') {
    return <ChatView onNavigate={onNavigate} />;
  }

  if (activeSection === 'requests') {
    return <ServiceRequests onNavigate={onNavigate} />;
  }

  if (activeSection === 'complaints') {
    return <ComplaintsDisputes onNavigate={onNavigate} />;
  }
  
  if (activeSection === 'fraud') {
    return <FraudSecurity onNavigate={onNavigate} />;
  }

  if (activeSection === 'appointments') {
    return <Appointments onNavigate={onNavigate} />;
  }

  // Default: Support Landing
  return <SupportLanding onNavigate={onNavigate} />;
}