import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SplitLayout } from '../SplitLayout';
import { Users, Mail, Plus, X, Send, Phone } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface Person {
  id: string;
  name: string;
  role: 'Director' | 'PSC' | 'KAP';
  email?: string;
  phone?: string;
  kycStatus?: 'pending' | 'completed' | 'not_required';
  source?: 'companies_house' | 'manual';
  isYou?: boolean;
}

interface PeopleRolesScreenProps {
  onNext: (data: { people: Person[] }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  initialData?: any;
}

export function PeopleRolesScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
  initialData,
}: PeopleRolesScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonRole, setNewPersonRole] = useState<Person['role']>('Director');
  
  // Initialize with Companies House data if available
  const initializePeople = (): Person[] => {
    if (initialData?.people) {
      return initialData.people;
    }
    
    // Auto-populate from Companies House officers
    const people: Person[] = [];
    
    // Add "You" as the first person based on contact details
    if (initialData?.email) {
      people.push({
        id: 'you',
        name: 'You',
        role: 'Director',
        email: initialData.email,
        source: 'manual',
        isYou: true,
      });
    }
    
    if (initialData?.officers) {
      initialData.officers.forEach((officer: any, index: number) => {
        people.push({
          id: `officer-${index}`,
          name: officer.name,
          role: officer.role === 'Director' ? 'Director' : 'KAP',
          source: 'companies_house',
        });
      });
    }
    
    if (initialData?.pscs) {
      initialData.pscs.forEach((psc: any, index: number) => {
        // Check if person already exists
        const exists = people.find(p => p.name === psc.name);
        if (!exists) {
          people.push({
            id: `psc-${index}`,
            name: psc.name,
            role: 'PSC',
            source: 'companies_house',
          });
        } else {
          // Update existing person to also be PSC
          exists.role = 'PSC';
        }
      });
    }
    
    return people;
  };

  const [people, setPeople] = useState<Person[]>(initializePeople());

  // Track contact method preference for each person (email or phone)
  const [contactMethod, setContactMethod] = useState<Record<string, 'email' | 'phone'>>({});

  const updatePersonEmail = (id: string, email: string) => {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, email } : p));
  };

  const updatePersonPhone = (id: string, phone: string) => {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, phone } : p));
  };

  const updatePersonRole = (id: string, role: Person['role']) => {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, role } : p));
  };

  const toggleContactMethod = (id: string) => {
    setContactMethod(prev => ({
      ...prev,
      [id]: prev[id] === 'phone' ? 'email' : 'phone'
    }));
  };
  
  const markAsYou = (id: string) => {
    setPeople(prev => prev.map(p => ({
      ...p,
      isYou: p.id === id ? true : false,
    })));
  };

  const removePerson = (id: string) => {
    setPeople(prev => prev.filter(p => p.id !== id));
  };

  const addPerson = () => {
    if (!newPersonName.trim()) return;
    
    const newPerson: Person = {
      id: `manual-${Date.now()}`,
      name: newPersonName,
      role: newPersonRole,
      source: 'manual',
    };
    
    setPeople(prev => [...prev, newPerson]);
    setNewPersonName('');
    setNewPersonRole('Director');
    setShowAddPerson(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ people });
  };

  // Validation: Directors, PSCs, and KAPs need either email or phone
  const allRequiredContactsProvided = people.every(p => p.email || p.phone);

  // Generate consistent avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      { bg: 'bg-blue-100', text: 'text-blue-600' },
      { bg: 'bg-purple-100', text: 'text-purple-600' },
      { bg: 'bg-green-100', text: 'text-green-600' },
      { bg: 'bg-orange-100', text: 'text-orange-600' },
      { bg: 'bg-pink-100', text: 'text-pink-600' },
      { bg: 'bg-teal-100', text: 'text-teal-600' },
      { bg: 'bg-indigo-100', text: 'text-indigo-600' },
      { bg: 'bg-rose-100', text: 'text-rose-600' },
    ];
    
    // Simple hash function based on name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Business information"
      percentComplete={58}
      minutesRemaining={4}
      onBack={onBack}
      leftHeading="Safe and compliant onboarding"
      leftDescription="We're required to verify everyone with significant control or authority. This protects your business and meets FCA regulations."
      leftIcon={Users}
    >
      <div className="mb-8">
        <h2 className="mb-3">Who's involved with this account?</h2>
        <p className="text-muted-foreground">
          {initialData?.officers || initialData?.pscs
            ? "We've pre-filled from Companies House. Review and add contact details."
            : 'Add directors, PSCs, and key account parties who need to be verified'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* People List */}
        <div className="space-y-4">
          {people.map((person) => {
            // Get initials from name
            const nameParts = person.name.split(' ');
            const initials = nameParts.length >= 2
              ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
              : person.name.substring(0, 2);
            
            const avatarColor = getAvatarColor(person.name);
            
            return (
              <div key={person.id} className={`bg-white border rounded-2xl p-6 transition-all ${
                person.isYou ? 'border-accent shadow-sm' : 'border-border'
              }`}>
                {/* Header with Avatar, Name, and "This is me" */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-full ${avatarColor.bg} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-lg ${avatarColor.text}`}>{initials.toUpperCase()}</span>
                  </div>
                  
                  {/* Name and Source */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg mb-1">{person.name}</h4>
                    {person.source === 'companies_house' && (
                      <p className="text-sm text-muted-foreground">From Companies House</p>
                    )}
                  </div>
                  
                  {/* This is me Toggle / Remove */}
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        This is me
                      </span>
                      {/* iOS-style Toggle Switch */}
                      <div 
                        onClick={() => markAsYou(person.id)}
                        className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
                          person.isYou ? 'bg-accent' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                          person.isYou ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </label>
                    {person.source === 'manual' && !person.isYou && (
                      <button
                        type="button"
                        onClick={() => removePerson(person.id)}
                        className="p-1.5 hover:bg-muted rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Two Column Layout for Roles and Contact */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Assigned Roles */}
                  <div>
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-3 block">
                      Assigned Roles
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {['Director', 'PSC', 'KAP'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => updatePersonRole(person.id, role as Person['role'])}
                          className={`px-4 py-2 text-sm rounded-full transition-all ${
                            person.role === role
                              ? 'bg-[#001A72] text-white'
                              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Verification Contact */}
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                        Verification Contact
                      </Label>
                      <span className="text-red-600">*</span>
                    </div>
                    
                    {/* Email/Phone Switch */}
                    <div className="inline-flex bg-muted/30 rounded-lg p-1 mb-3">
                      <button
                        type="button"
                        onClick={() => setContactMethod(prev => ({ ...prev, [person.id]: 'email' }))}
                        className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                          contactMethod[person.id] !== 'phone'
                            ? 'bg-white text-accent shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setContactMethod(prev => ({ ...prev, [person.id]: 'phone' }))}
                        className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                          contactMethod[person.id] === 'phone'
                            ? 'bg-white text-accent shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Phone
                      </button>
                    </div>
                    
                    {/* Input Field */}
                    <div className="relative">
                      {contactMethod[person.id] === 'phone' ? (
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      )}
                      <Input
                        id={`contact-${person.id}`}
                        type={contactMethod[person.id] === 'phone' ? 'tel' : 'email'}
                        placeholder={contactMethod[person.id] === 'phone' ? '+44 7XXX XXXXXX' : 'name@company.com'}
                        value={contactMethod[person.id] === 'phone' ? (person.phone || '') : (person.email || '')}
                        onChange={(e) => contactMethod[person.id] === 'phone' 
                          ? updatePersonPhone(person.id, e.target.value)
                          : updatePersonEmail(person.id, e.target.value)
                        }
                        className="pl-9 h-10 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Person */}
        {!showAddPerson && (
          <button
            type="button"
            onClick={() => setShowAddPerson(true)}
            className="w-full p-4 border-2 border-dashed border-border hover:border-accent rounded-xl transition-colors flex items-center justify-center gap-2 text-accent"
          >
            <Plus className="w-5 h-5" />
            <span>Add another person</span>
          </button>
        )}

        {showAddPerson && (
          <div className="bg-muted/30 border border-border rounded-xl p-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPersonName">Name</Label>
              <Input
                id="newPersonName"
                type="text"
                placeholder="Enter full name"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Director', 'PSC', 'KAP'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setNewPersonRole(role as Person['role'])}
                    className={`px-3 py-2 text-xs border rounded-lg transition-all ${
                      newPersonRole === role
                        ? 'border-accent bg-accent/5 text-accent'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddPerson(false);
                  setNewPersonName('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={addPerson}
                disabled={!newPersonName.trim()}
                className="flex-1"
              >
                Add person
              </Button>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-[#F5F6F8] rounded-lg p-6">
          <div className="flex gap-3">
            <Send className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#001A72] mb-1">What happens next</p>
              <p className="text-sm text-muted-foreground">
                We'll send secure verification links to all Directors, PSCs, and Key Account Parties for identity verification.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSaveModal(true)}
            className="flex-1"
          >
            Save & Exit
          </Button>
          <Button 
            type="submit"
            disabled={people.length === 0 || !allRequiredContactsProvided}
            className="flex-1"
          >
            {allRequiredContactsProvided ? 'Send invitations & Continue' : 'Add contact details to continue'}
          </Button>
        </div>
      </form>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </SplitLayout>
  );
}