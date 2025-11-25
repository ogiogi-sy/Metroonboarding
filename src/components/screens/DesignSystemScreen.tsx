import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Terminal, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DesignSystemScreenProps {
  onBack: () => void;
}

export function DesignSystemScreen({ onBack }: DesignSystemScreenProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              ← Back
            </Button>
            <h1 className="text-xl text-[#001A72]">Design System</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#E9F2FF] text-[#0033A0] border-[#0033A0]">v1.0</Badge>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Introduction */}
        <div className="space-y-4">
          <h2 className="text-3xl text-[#001A72]">Metro Banking Design System</h2>
          <p className="text-lg text-[#475569] max-w-3xl">
            A unified design language for our business banking web app. 
            Built with a flat aesthetic, Primary Blue (#0033A0), and Inter typography.
            <br />

          </p>
        </div>

        <Separator />

        {/* Colors */}
        <section className="space-y-6">
          <h3 className="text-2xl text-[#001A72]">Colors</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Colors */}
            <div className="space-y-3">
              <h4 className="text-lg text-[#000D45]">Primary</h4>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#0033A0] flex items-end p-3 shadow-sm">
                  <div className="text-white text-sm">Primary Blue<br/>#0033A0</div>
                </div>
                <div className="h-24 rounded-lg bg-[#001A72] flex items-end p-3 shadow-sm">
                  <div className="text-white text-sm">Dark Blue<br/>#001A72</div>
                </div>
                <div className="h-24 rounded-lg bg-[#E4002B] flex items-end p-3 shadow-sm">
                  <div className="text-white text-sm">Primary Red<br/>#E4002B</div>
                </div>
              </div>
            </div>

            {/* Neutral Colors */}
            <div className="space-y-3">
              <h4 className="text-lg text-[#000D45]">Neutrals</h4>
              <div className="space-y-2">
                <div className="h-12 rounded-lg bg-[#000D45] flex items-center px-3 shadow-sm">
                  <div className="text-white text-sm">Black #000D45</div>
                </div>
                <div className="h-12 rounded-lg bg-[#334155] flex items-center px-3 shadow-sm">
                  <div className="text-white text-sm">Gray 700 #334155</div>
                </div>
                <div className="h-12 rounded-lg bg-[#475569] flex items-center px-3 shadow-sm">
                  <div className="text-white text-sm">Gray 600 #475569</div>
                </div>
                <div className="h-12 rounded-lg bg-[#94A3B8] flex items-center px-3 shadow-sm">
                  <div className="text-white text-sm">Gray 400 #94A3B8</div>
                </div>
                <div className="h-12 rounded-lg bg-[#CBD5E1] flex items-center px-3 shadow-sm border border-gray-200">
                  <div className="text-[#000D45] text-sm">Gray 300 #CBD5E1</div>
                </div>
                <div className="h-12 rounded-lg bg-[#E2E8F0] flex items-center px-3 shadow-sm border border-gray-200">
                  <div className="text-[#000D45] text-sm">Gray 200 #E2E8F0</div>
                </div>
                <div className="h-12 rounded-lg bg-[#F5F7FA] flex items-center px-3 shadow-sm border border-gray-200">
                  <div className="text-[#000D45] text-sm">Gray 100 #F5F7FA</div>
                </div>
                <div className="h-12 rounded-lg bg-white flex items-center px-3 shadow-sm border border-gray-200">
                  <div className="text-[#000D45] text-sm">White #FFFFFF</div>
                </div>
              </div>
            </div>

            {/* Backgrounds */}
            <div className="space-y-3">
              <h4 className="text-lg text-[#000D45]">Backgrounds</h4>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#E9F2FF] flex items-end p-3 shadow-sm border border-blue-100">
                  <div className="text-[#0033A0] text-sm">Light Blue BG<br/>#E9F2FF</div>
                </div>
                <div className="h-24 rounded-lg bg-[#F5F7FA] flex items-end p-3 shadow-sm border border-gray-200">
                  <div className="text-[#000D45] text-sm">Page BG<br/>#F5F7FA</div>
                </div>
              </div>
            </div>

            {/* Semantic Colors */}
            <div className="space-y-3">
              <h4 className="text-lg text-[#000D45]">Semantic</h4>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-[#16A34A] flex items-end p-3 shadow-sm">
                  <div className="text-white text-sm">Success #16A34A</div>
                </div>
                <div className="h-16 rounded-lg bg-[#EA580C] flex items-end p-3 shadow-sm">
                  <div className="text-white text-sm">Warning #EA580C</div>
                </div>
                <div className="h-16 rounded-lg bg-[#B91C1C] flex items-end p-3 shadow-sm">
                  <div className="text-white text-sm">Error #B91C1C</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Typography */}
        <section className="space-y-6">
          <h3 className="text-2xl text-[#001A72]">Typography</h3>
          <p className="text-[#475569]">Font Family: Inter. <strong>No bold weights allowed.</strong></p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Headings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">H1 - 48px (3rem)</p>
                  <h1 className="text-[48px] leading-[1.2] text-[#001A72]">48px — The quick brown fox</h1>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">H2 - 32px (2rem)</p>
                  <h2 className="text-[32px] leading-[1.3] text-[#001A72]">32px — The quick brown fox</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">H3 - 24px (1.5rem)</p>
                  <h3 className="text-[24px] leading-[1.4] text-[#001A72]">24px — The quick brown fox</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">H4 - 20px (1.25rem)</p>
                  <h4 className="text-[20px] leading-[1.4] text-[#001A72]">20px — The quick brown fox</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">H5 - 18px (1.125rem)</p>
                  <h5 className="text-[18px] leading-[1.4] text-[#001A72]">18px — The quick brown fox</h5>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Body Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Body Large - 18px (1.125rem)</p>
                  <p className="text-lg">
                    Use this for lead paragraphs or emphasized text. It provides a good reading experience for longer form content introduction.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Body - 16px (1rem)</p>
                  <p>
                    This is the default body text size. Used for most content, including articles, descriptions, and general information. It balances readability and information density.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Body Small - 14px (0.875rem)</p>
                  <p className="text-sm">
                    Used for secondary information, captions, and UI elements where space is limited but readability is still important.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Tiny - 12px (0.75rem)</p>
                  <p className="text-xs text-muted-foreground">
                    Used for legal text, fine print, or very secondary UI labels.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* UI Components */}
        <section className="space-y-10">
          <h3 className="text-2xl text-[#001A72]">Components</h3>

          <Tabs defaultValue="buttons" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
            
            {/* Buttons Tab */}
            <TabsContent value="buttons" className="mt-6 space-y-8">
              <div className="space-y-4">
                <h4 className="text-lg text-[#000D45]">Variants</h4>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="link">Link Button</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg text-[#000D45]">Sizes</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg">Large Button</Button>
                  <Button size="default">Default Button</Button>
                  <Button size="sm">Small Button</Button>
                  <Button size="icon"><CheckCircle2 className="h-4 w-4" /></Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg text-[#000D45]">States</h4>
                <div className="flex flex-wrap gap-4">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                </div>
              </div>
            </TabsContent>

            {/* Inputs Tab */}
            <TabsContent value="inputs" className="mt-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg text-[#000D45]">Text Inputs</h4>
                  <div className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input type="email" id="email" placeholder="name@example.com" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="disabled-input">Disabled Input</Label>
                      <Input disabled type="text" id="disabled-input" placeholder="Cannot type here" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="with-icon">With Description</Label>
                      <Input type="text" id="with-icon" placeholder="Enter value" />
                      <p className="text-xs text-muted-foreground">Helper text goes here.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg text-[#000D45]">Selection Controls</h4>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="airplane-mode" />
                      <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>

                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="space-y-4">
                   <h4 className="text-lg text-[#000D45]">Select & Textarea</h4>
                   <div className="space-y-4 max-w-sm">
                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="current">Current Account</SelectItem>
                          <SelectItem value="savings">Savings Account</SelectItem>
                          <SelectItem value="business">Business Account</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea placeholder="Type your message here." />
                    </div>
                   </div>
                </div>
              </div>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="mt-6 space-y-8">
               <div className="space-y-4">
                <h4 className="text-lg text-[#000D45]">Alerts</h4>
                <div className="space-y-4">
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      You can add components to your app using the cli.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Your session has expired. Please log in again.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-blue-200 bg-blue-50 text-[#0033A0]">
                    <Info className="h-4 w-4 text-[#0033A0]" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      New features are available in your dashboard.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg text-[#000D45]">Badges</h4>
                <div className="flex gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-[#0033A0] hover:bg-[#001A72]">Brand</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg text-[#000D45]">Toasts</h4>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => toast("Event has been created", {
                      description: "Sunday, December 03, 2023 at 9:00 AM",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })}
                  >
                    Show Toast
                  </Button>
                  <Button 
                     variant="outline"
                     onClick={() => toast.success("Operation successful")}
                  >
                    Success Toast
                  </Button>
                  <Button 
                     variant="outline"
                     onClick={() => toast.error("Something went wrong")}
                  >
                    Error Toast
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Cards Tab */}
            <TabsContent value="cards" className="mt-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card Content</p>
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>

                <Card className="border-t-4 border-t-[#0033A0]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                         <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Balance</p>
                         <CardTitle className="text-3xl">£24,500.00</CardTitle>
                      </div>
                      <div className="p-2 bg-[#E9F2FF] rounded-full">
                        <CreditCard className="w-6 h-6 text-[#0033A0]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Available to spend</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      

    </div>
  );
}

function CreditCard({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}
