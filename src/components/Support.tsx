import { useState } from 'react';
import { SupportLanding } from './support/SupportLanding';
import { ChatView } from './support/ChatView';
import { ServiceRequests } from './support/ServiceRequests';
import { ComplaintsDisputes } from './support/ComplaintsDisputes';

type SupportSection = 'home' | 'chat' | 'messages' | 'requests' | 'complaints' | 'fraud' | 'appointments';

export function Support() {
  const [activeSection, setActiveSection] = useState<SupportSection>('home');

  const handleNavigate = (section: string) => {
    setActiveSection(section as SupportSection);
  };

  if (activeSection === 'chat') {
    return <ChatView onNavigate={handleNavigate} />;
  }

  if (activeSection === 'requests') {
    return <ServiceRequests onNavigate={handleNavigate} />;
  }

  if (activeSection === 'complaints' || activeSection === 'fraud') {
    return <ComplaintsDisputes onNavigate={handleNavigate} />;
  }

  // Default: Support Landing
  return <SupportLanding onNavigate={handleNavigate} />;
}
