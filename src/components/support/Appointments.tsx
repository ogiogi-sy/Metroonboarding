import { useState } from 'react';
import { Calendar, MapPin, Clock, ChevronRight, Search, Check, User, Building2, ArrowLeft, Mail, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { mockAppointments } from '../../data/support';

interface AppointmentsProps {
  onNavigate: (section: string) => void;
}

export function Appointments({ onNavigate }: AppointmentsProps) {
  const [view, setView] = useState<'list' | 'book'>('list');
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<'store' | 'specialist' | null>(null);
  const [selectedStore, setSelectedStore] = useState<string>('Holborn (0.8 miles)');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [reminders, setReminders] = useState({ email: true, sms: false });
  
  // Initialize with no scheduled appointments to show empty state initially
  const [appointments, setAppointments] = useState(mockAppointments.filter(a => a.status !== 'Scheduled'));

  const reasons = [
    "Open Account",
    "Mandate Change",
    "Close Account",
    "Business Loan Inquiry",
    "General Advice"
  ];

  const stores = [
    "Holborn (0.8 miles)",
    "Cheapside (1.2 miles)",
    "Tottenham Court Road (1.5 miles)",
    "Moorgate (2.0 miles)"
  ];

  const slots = [
    { date: 'Today, 25 Nov', times: ['14:30', '16:00'] },
    { date: 'Tomorrow, 26 Nov', times: ['09:30', '11:00', '14:00', '15:30'] },
    { date: 'Wed, 27 Nov', times: ['10:00', '13:30', '16:30'] },
  ];

  const toggleReminder = (type: 'email' | 'sms') => {
    setReminders(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleBook = () => {
    const newAppointment = {
      id: Date.now().toString(),
      type: 'Specialist',
      reason: selectedReason,
      status: 'Scheduled',
      date: new Date().toISOString(), // Simplified for demo
      adviser: 'Metro Specialist',
      location: appointmentType === 'store' ? selectedStore : 'Video Call'
    };

    // Add the new appointment to the list
    setAppointments(prev => [...prev, newAppointment]);

    toast.success("Appointment booked successfully", {
      description: `We've sent a confirmation${reminders.email ? ' email' : ''}${reminders.email && reminders.sms ? ' and' : ''}${reminders.sms ? ' SMS' : ''}.`
    });
    setView('list');
    setBookingStep(1);
    setSelectedReason('');
    setAppointmentType(null);
    setSelectedSlot(null);
    setReminders({ email: true, sms: false });
  };

  if (view === 'book') {
    return (
      <div className="max-w-[1000px] mx-auto p-8">
        <Button 
          variant="ghost" 
          onClick={() => setView('list')}
          className="mb-6 pl-0 text-muted-foreground hover:text-[#0033A0] hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Appointments
        </Button>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0033A0]">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-[#0033A0]">Book an Appointment</h2>
                <p className="text-sm text-muted-foreground">Schedule a meeting with a business specialist</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center mt-8 px-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    bookingStep >= step 
                      ? 'bg-[#0033A0] text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-0.5 mx-3 ${
                      bookingStep > step ? 'bg-[#0033A0]' : 'bg-gray-100'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 min-h-[400px]">
            {bookingStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">What can we help you with?</label>
                  <Select value={selectedReason} onValueChange={setSelectedReason}>
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue placeholder="Select a reason for your visit" />
                    </SelectTrigger>
                    <SelectContent>
                      {reasons.map(r => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="text-sm font-medium text-gray-700">How would you like to meet?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setAppointmentType('store')}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        appointmentType === 'store'
                          ? 'border-[#0033A0] bg-blue-50/30'
                          : 'border-gray-100 hover:border-blue-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
                        appointmentType === 'store' ? 'bg-[#0033A0] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <Building2 className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium text-[#0033A0] mb-1">In-Store Visit</h3>
                      <p className="text-sm text-muted-foreground">Meet us at your local Metro Bank store</p>
                    </button>

                    <button
                      onClick={() => setAppointmentType('specialist')}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        appointmentType === 'specialist'
                          ? 'border-[#0033A0] bg-blue-50/30'
                          : 'border-gray-100 hover:border-blue-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
                        appointmentType === 'specialist' ? 'bg-[#0033A0] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <User className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium text-[#0033A0] mb-1">Video Call</h3>
                      <p className="text-sm text-muted-foreground">Speak with a specialist from anywhere</p>
                    </button>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <Button 
                    onClick={() => setBookingStep(2)}
                    disabled={!selectedReason || !appointmentType}
                    className="bg-[#0033A0] hover:bg-[#002a88] px-8"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {appointmentType === 'store' && (
                  <div className="space-y-4 mb-8">
                    <label className="text-sm font-medium text-gray-700">Select a Store</label>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#0033A0] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#0033A0]">Closest Store Detected</p>
                        <p className="text-sm text-muted-foreground">Based on your current location</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {stores.map((store) => (
                        <button
                          key={store}
                          onClick={() => setSelectedStore(store)}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                            selectedStore === store
                              ? 'border-[#0033A0] bg-white ring-1 ring-[#0033A0]'
                              : 'border-gray-100 bg-white hover:border-gray-200'
                          }`}
                        >
                          <span className="text-sm font-medium text-gray-700">{store}</span>
                          {selectedStore === store && <Check className="h-4 w-4 text-[#0033A0]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Select a Time</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {slots.map((slotGroup) => (
                      <div key={slotGroup.date} className="space-y-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{slotGroup.date}</p>
                        <div className="space-y-2">
                          {slotGroup.times.map((time) => {
                            const slotId = `${slotGroup.date}-${time}`;
                            return (
                              <button
                                key={time}
                                onClick={() => setSelectedSlot(slotId)}
                                className={`w-full py-2 px-3 rounded-lg text-sm border transition-all ${
                                  selectedSlot === slotId
                                    ? 'bg-[#0033A0] text-white border-[#0033A0]'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#0033A0] hover:text-[#0033A0]'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex justify-between">
                  <Button variant="ghost" onClick={() => setBookingStep(1)}>Back</Button>
                  <Button 
                    onClick={() => setBookingStep(3)}
                    disabled={!selectedSlot}
                    className="bg-[#0033A0] hover:bg-[#002a88] px-8"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-w-md mx-auto text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <Check className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-medium text-[#0033A0]">Review Appointment</h3>
                
                <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4 border border-gray-100">
                  <div className="flex justify-between py-2 border-b border-gray-200/50">
                    <span className="text-sm text-muted-foreground">Reason</span>
                    <span className="text-sm font-medium text-gray-900">{selectedReason}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/50">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{appointmentType === 'store' ? 'In-Store Visit' : 'Video Call'}</span>
                  </div>
                  {appointmentType === 'store' && (
                    <div className="flex justify-between py-2 border-b border-gray-200/50">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="text-sm font-medium text-gray-900 text-right max-w-[200px]">{selectedStore}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Date & Time</span>
                    <span className="text-sm font-medium text-gray-900">{selectedSlot?.split('-').join(' at ')}</span>
                  </div>
                </div>

                <div className="text-left">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Remind me about this meeting via</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleReminder('email')}
                      className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                        reminders.email 
                          ? 'border-[#0033A0] bg-blue-50 text-[#0033A0] ring-1 ring-[#0033A0]' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm font-medium">Email</span>
                      {reminders.email && <Check className="h-3 w-3 ml-1" />}
                    </button>
                    <button
                      onClick={() => toggleReminder('sms')}
                      className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                        reminders.sms 
                          ? 'border-[#0033A0] bg-blue-50 text-[#0033A0] ring-1 ring-[#0033A0]' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm font-medium">SMS</span>
                      {reminders.sms && <Check className="h-3 w-3 ml-1" />}
                    </button>
                  </div>
                </div>

                <div className="pt-6 flex justify-between gap-4">
                  <Button variant="ghost" onClick={() => setBookingStep(2)} className="flex-1">Back</Button>
                  <Button 
                    onClick={handleBook}
                    className="bg-[#0033A0] hover:bg-[#002a88] flex-1"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(a => a.status === 'Scheduled');
  const pastAppointments = appointments.filter(a => a.status !== 'Scheduled');

  return (
    <div className="max-w-[1400px] mx-auto p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Booking CTA */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col shadow-sm">
          <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#0033A0]">
              <PlusIcon className="h-4 w-4" />
            </div>
            <h2 className="text-base font-medium text-[#0033A0]">Book Appointment</h2>
          </div>
          
          <div className="flex-1 flex flex-col justify-center py-4">
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Schedule a meeting with a Metro Bank specialist. We can help with opening accounts, mandate changes, loans, and general business advice.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>In-store or video</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>Pick your time</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setView('book')}
            className="w-full bg-[#0033A0] hover:bg-[#002a88] text-sm"
          >
            Book Now
          </Button>
        </div>

        {/* Right Column: Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col shadow-sm h-full">
          <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#0033A0]">
              <Calendar className="h-4 w-4" />
            </div>
            <h2 className="text-base font-medium text-[#0033A0]">Upcoming Appointments</h2>
          </div>

          <div className="flex-1">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-slate-50 rounded-lg border border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0033A0] border border-gray-100 shadow-sm">
                          <Building2 className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{appointment.reason}</h4>
                          <p className="text-xs text-muted-foreground">{appointment.location}</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide">
                        Confirmed
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="flex items-center gap-2 text-gray-600 bg-white p-1.5 rounded border border-gray-100/50">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span>{new Date(appointment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 bg-white p-1.5 rounded border border-gray-100/50">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span>{new Date(appointment.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 h-7 text-xs border-gray-200">
                        Reschedule
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 h-7 text-xs text-red-600 hover:bg-red-50 hover:text-red-700">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-100 rounded-lg bg-slate-50/30 min-h-[200px]">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3">
                  <Calendar className="h-5 w-5 opacity-50" />
                </div>
                <p className="text-sm font-medium text-gray-600">No upcoming appointments</p>
                <p className="text-xs text-gray-400 mt-1">
                  Book a meeting to see it here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Past Appointments</h2>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {pastAppointments.map((appointment, index) => (
              <div key={appointment.id} className={`flex items-center justify-between p-4 ${index !== 0 ? 'border-t border-gray-100' : ''} hover:bg-slate-50 transition-colors group`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-[#0033A0] transition-colors">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{appointment.reason}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(appointment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide ${
                    appointment.status === 'Completed' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
