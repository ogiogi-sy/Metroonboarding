import { Shield, UserPlus, X } from 'lucide-react';

interface TeamAddSelectorScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

export function TeamAddSelectorScreen({ onNavigate, businessData }: TeamAddSelectorScreenProps) {
  return (
    <div className="max-w-4xl">
      {/* Modal-style container */}
      <div className="bg-white border border-border rounded-2xl p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="mb-2" style={{ color: '#001A72' }}>Add someone to your business</h2>
            <p className="text-sm text-muted-foreground">
              Choose the type of person you'd like to add
            </p>
          </div>
          <button
            onClick={() => onNavigate('team-directors')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Two option cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Director Card */}
          <button
            onClick={() => onNavigate('add-director')}
            className="bg-white border-2 border-border rounded-2xl p-8 text-left hover:border-accent hover:shadow-lg transition-all group"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            
            <h3 className="mb-3" style={{ color: '#001A72' }}>Add Director</h3>
            
            <p className="text-sm text-muted-foreground mb-6">
              Add a statutory director or beneficial owner. They may need to complete identity verification.
            </p>

            <div className="inline-flex items-center gap-2 px-6 h-12 bg-accent text-white rounded-full group-hover:bg-accent/90 transition-colors">
              Continue
            </div>
          </button>

          {/* Add Team Member Card */}
          <button
            onClick={() => onNavigate('add-team-member')}
            className="bg-white border-2 border-border rounded-2xl p-8 text-left hover:border-accent hover:shadow-lg transition-all group"
          >
            <div className="w-16 h-16 bg-[#E9F2FF] rounded-full flex items-center justify-center mb-6">
              <UserPlus className="w-8 h-8 text-[#0033A0]" />
            </div>
            
            <h3 className="mb-3" style={{ color: '#001A72' }}>Add Team Member</h3>
            
            <p className="text-sm text-muted-foreground mb-6">
              Add an employee or collaborator and assign their permissions.
            </p>

            <div className="inline-flex items-center gap-2 px-6 h-12 bg-accent text-white rounded-full group-hover:bg-accent/90 transition-colors">
              Continue
            </div>
          </button>
        </div>

        {/* Cancel */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('team-directors')}
            className="px-6 h-12 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
