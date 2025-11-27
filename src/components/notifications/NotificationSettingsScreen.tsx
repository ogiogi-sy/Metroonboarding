import React, { useState } from 'react';
import { NavigationSidebar } from '../NavigationSidebar';
import { DashboardHeader } from '../DashboardHeader';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { 
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  FileText,
  Sparkles,
  Bell,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Users,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../ui/utils';
import { DEFAULT_NOTIFICATION_SETTINGS } from './mockData';
import { NotificationSettings } from './types';
import { UserRole } from '../cards/CardPermissionsContext';
import { toast } from 'sonner@2.0.3';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Checkbox } from '../ui/checkbox';

interface NotificationSettingsScreenProps {
  onNavigate: (section: string, params?: any) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
  userRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export function NotificationSettingsScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange,
  userRole = 'admin',
  onRoleChange
}: NotificationSettingsScreenProps) {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    transactions: false,
    accountEvents: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateSetting = <T extends keyof NotificationSettings>(
    category: T, 
    key: keyof NotificationSettings[T], 
    value: boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setTimeout(() => {
      toast.success('Notification preferences saved');
      setHasChanges(false);
    }, 500);
  };

  const handleCancel = () => {
    setSettings(DEFAULT_NOTIFICATION_SETTINGS);
    setHasChanges(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F6F8]">
      <NavigationSidebar 
        activeSection="notifications"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />
      
      <main className="flex-1 lg:ml-64">
        <DashboardHeader 
          activeSection="notifications"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={onAccountSelectionChange}
          userRole={userRole}
          onRoleChange={onRoleChange}
        />

        <div className="p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('notifications')}
              className="mb-4 -ml-2 text-gray-600 hover:text-[#0033A0] hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notifications
            </Button>
            <h1 className="text-3xl text-[#001A72] mb-2">Notification Settings</h1>
            <p className="text-sm text-gray-600">Manage your alerts and preferences</p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Smart Alerts & AI Protection */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg text-[#001A72] mb-1">Smart Alerts & AI Protection</h2>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">
                  Critical alerts regarding fraud, security, and account locks cannot be disabled.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Label htmlFor="fraud" className="text-sm text-[#001A72]">Security & Fraud Events</Label>
                    <p className="text-xs text-gray-500 mt-0.5">Unusual activity, failed logins, risk indicators</p>
                  </div>
                  <Switch 
                    id="fraud" 
                    checked={settings.smartAlerts.fraud} 
                    disabled
                    className="opacity-50"
                  />
                </div>
              </div>

              {/* Delivery Channels for Smart Alerts */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4">Delivery Channels</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="smart-push" 
                      checked={settings.deliveryChannels.push}
                      onCheckedChange={(checked) => updateSetting('deliveryChannels', 'push', checked as boolean)}
                    />
                    <Label htmlFor="smart-push" className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                      <Bell className="w-4 h-4 text-gray-500" />
                      Push
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="smart-email" 
                      checked={settings.deliveryChannels.email}
                      onCheckedChange={(checked) => updateSetting('deliveryChannels', 'email', checked as boolean)}
                    />
                    <Label htmlFor="smart-email" className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email
                    </Label>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="sms-critical" 
                    checked={settings.deliveryChannels.smsForCritical}
                    onCheckedChange={(checked) => updateSetting('deliveryChannels', 'smsForCritical', checked as boolean)}
                  />
                  <Label htmlFor="sms-critical" className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                    <Smartphone className="w-4 h-4 text-gray-500" />
                    Send SMS backup for critical alerts
                  </Label>
                </div>
              </div>

              {/* Team Notification - Admin Only */}
              {userRole === 'admin' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team Notification
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <Label className="text-sm text-gray-700 mb-2 block">Also notify all Admins</Label>
                    <p className="text-xs text-gray-500">Security alerts will be sent to all account administrators</p>
                  </div>
                </div>
              )}
            </div>

            {/* Transaction & Account Activity */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg text-[#001A72] mb-1">Transaction & Account Activity</h2>
                </div>
              </div>

              <div className="space-y-4">
                {/* Payments & Transfers */}
                <Collapsible open={openSections.transactions} onOpenChange={() => toggleSection('transactions')}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      {openSections.transactions ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Label className="text-sm text-[#001A72] cursor-pointer">Payments & Transfers</Label>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 pt-2 space-y-3">
                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex-1">
                        <Label htmlFor="inbound" className="text-sm text-gray-700">Inbound payments</Label>
                      </div>
                      <Switch 
                        id="inbound" 
                        checked={settings.transactions.inbound}
                        onCheckedChange={(checked) => updateSetting('transactions', 'inbound', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex-1">
                        <Label htmlFor="outbound" className="text-sm text-gray-700">Outbound payments</Label>
                      </div>
                      <Switch 
                        id="outbound" 
                        checked={settings.transactions.outbound}
                        onCheckedChange={(checked) => updateSetting('transactions', 'outbound', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex-1">
                        <Label htmlFor="card-transactions" className="text-sm text-gray-700">Card transactions</Label>
                      </div>
                      <Switch 
                        id="card-transactions" 
                        checked={settings.transactions.cardTransactions}
                        onCheckedChange={(checked) => updateSetting('transactions', 'cardTransactions', checked)}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="border-t border-gray-200" />

                {/* Account Health */}
                <Collapsible open={openSections.accountEvents} onOpenChange={() => toggleSection('accountEvents')}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      {openSections.accountEvents ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Label className="text-sm text-[#001A72] cursor-pointer">Account Health</Label>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 pt-2 space-y-3">
                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex-1">
                        <Label htmlFor="high-value" className="text-sm text-gray-700">High-value alerts</Label>
                        <p className="text-xs text-gray-500 mt-0.5">Transactions over £10,000</p>
                      </div>
                      <Switch 
                        id="high-value" 
                        checked={settings.transactions.highValue}
                        onCheckedChange={(checked) => updateSetting('transactions', 'highValue', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex-1">
                        <Label htmlFor="upcoming" className="text-sm text-gray-700">Upcoming payments</Label>
                        <p className="text-xs text-gray-500 mt-0.5">Reminders for due payments</p>
                      </div>
                      <Switch 
                        id="upcoming" 
                        checked={settings.transactions.upcomingPayments}
                        onCheckedChange={(checked) => updateSetting('transactions', 'upcomingPayments', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex-1">
                        <Label htmlFor="low-balance" className="text-sm text-gray-700">Low balance warnings</Label>
                      </div>
                      <Switch 
                        id="low-balance" 
                        checked={settings.transactions.lowBalance}
                        onCheckedChange={(checked) => updateSetting('transactions', 'lowBalance', checked)}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Delivery Channels */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4">Delivery Channels</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="trans-push" 
                      checked={settings.deliveryChannels.push}
                      onCheckedChange={(checked) => updateSetting('deliveryChannels', 'push', checked as boolean)}
                    />
                    <Label htmlFor="trans-push" className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                      <Bell className="w-4 h-4 text-gray-500" />
                      Push
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="trans-email" 
                      checked={settings.deliveryChannels.email}
                      onCheckedChange={(checked) => updateSetting('deliveryChannels', 'email', checked as boolean)}
                    />
                    <Label htmlFor="trans-email" className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email
                    </Label>
                  </div>
                </div>
              </div>

              {/* Team Notification - Admin Only */}
              {userRole === 'admin' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team Notification Routing
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="payroll-finance" 
                        checked={settings.teamNotifications?.payrollToFinance}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({
                            ...prev,
                            teamNotifications: {
                              ...prev.teamNotifications!,
                              payrollToFinance: checked as boolean,
                            }
                          }))
                        }
                      />
                      <Label htmlFor="payroll-finance" className="text-sm text-gray-700 cursor-pointer">
                        Send payroll alerts to Finance Team
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="card-cardholders" 
                        checked={settings.teamNotifications?.cardToCardholders}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({
                            ...prev,
                            teamNotifications: {
                              ...prev.teamNotifications!,
                              cardToCardholders: checked as boolean,
                            }
                          }))
                        }
                      />
                      <Label htmlFor="card-cardholders" className="text-sm text-gray-700 cursor-pointer">
                        Send card alerts to cardholders only
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Documents & Operations */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg text-[#001A72] mb-1">Documents & Operations</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Label htmlFor="statements" className="text-sm text-[#001A72]">Statements & Reports</Label>
                    <p className="text-xs text-gray-500 mt-0.5">Monthly statements, annual summaries</p>
                  </div>
                  <Switch 
                    id="statements" 
                    checked={settings.documents.statements}
                    onCheckedChange={(checked) => updateSetting('documents', 'statements', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Label htmlFor="compliance" className="text-sm text-[#001A72]">Compliance & Verification</Label>
                    <p className="text-xs text-gray-500 mt-0.5">KYC requests, verification status</p>
                  </div>
                  <Switch 
                    id="compliance" 
                    checked={settings.documents.kyc}
                    onCheckedChange={(checked) => updateSetting('documents', 'kyc', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Label htmlFor="case-updates" className="text-sm text-[#001A72]">Support Case Updates</Label>
                    <p className="text-xs text-gray-500 mt-0.5">Status changes on support tickets</p>
                  </div>
                  <Switch 
                    id="case-updates" 
                    checked={settings.documents.caseUpdates}
                    onCheckedChange={(checked) => updateSetting('documents', 'caseUpdates', checked)}
                  />
                </div>
              </div>

              {/* Delivery Channels */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4">Delivery Channels</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="docs-push" 
                      checked={settings.deliveryChannels.push}
                      onCheckedChange={(checked) => updateSetting('deliveryChannels', 'push', checked as boolean)}
                    />
                    <Label htmlFor="docs-push" className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                      <Bell className="w-4 h-4 text-gray-500" />
                      Push
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="docs-email" 
                      checked={settings.deliveryChannels.email}
                      onCheckedChange={(checked) => updateSetting('deliveryChannels', 'email', checked as boolean)}
                    />
                    <Label htmlFor="docs-email" className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Delivers statements and compliance docs to delegated external contacts.
                </p>
              </div>

              {/* Team Notification - Admin Only */}
              {userRole === 'admin' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team Notification Routing
                  </h3>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="compliance-admin" 
                      checked={settings.teamNotifications?.complianceToPrimaryAdmin}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          teamNotifications: {
                            ...prev.teamNotifications!,
                            complianceToPrimaryAdmin: checked as boolean,
                          }
                        }))
                      }
                    />
                    <Label htmlFor="compliance-admin" className="text-sm text-gray-700 cursor-pointer">
                      Send compliance alerts to primary admin
                    </Label>
                  </div>
                </div>
              )}
            </div>

            {/* Product Updates & Marketing */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg text-[#001A72] mb-1">Product & Marketing</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Label htmlFor="product-updates" className="text-sm text-[#001A72]">Product updates</Label>
                    <p className="text-xs text-gray-500 mt-0.5">New features and enhancements</p>
                  </div>
                  <Switch 
                    id="product-updates" 
                    checked={settings.productMarketing.productUpdates}
                    onCheckedChange={(checked) => updateSetting('productMarketing', 'productUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Label htmlFor="offers" className="text-sm text-[#001A72]">Offers & promotions</Label>
                  </div>
                  <Switch 
                    id="offers" 
                    checked={settings.productMarketing.offers}
                    onCheckedChange={(checked) => updateSetting('productMarketing', 'offers', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Label htmlFor="surveys" className="text-sm text-[#001A72]">Surveys & feedback</Label>
                  </div>
                  <Switch 
                    id="surveys" 
                    checked={settings.productMarketing.surveys}
                    onCheckedChange={(checked) => updateSetting('productMarketing', 'surveys', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Label htmlFor="announcements" className="text-sm text-[#001A72]">Service announcements</Label>
                  </div>
                  <Switch 
                    id="announcements" 
                    checked={settings.productMarketing.announcements}
                    onCheckedChange={(checked) => updateSetting('productMarketing', 'announcements', checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save/Cancel Actions */}
          <div className="sticky bottom-0 mt-8 pb-6 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={!hasChanges}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="bg-[#0033A0] hover:bg-[#002b87] text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}