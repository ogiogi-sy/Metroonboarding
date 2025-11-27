import React, { useState } from 'react';
import { UserRole } from './cards/CardPermissionsContext';
import { ChevronDown, User, Settings, LogOut, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from './ui/utils';

interface ProfileDropdownProps {
  businessData: any;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function ProfileDropdown({ businessData, userRole, onRoleChange }: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:bg-gray-100 rounded-full pr-3 transition-colors">
          <div className="w-10 h-10 rounded-full bg-[#0033A0] text-white flex items-center justify-center">
            <span className="text-sm font-medium">
              {businessData.companyName ? businessData.companyName.charAt(0) : 'B'}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">{businessData.companyName || 'Business Name'}</span>
            <span className="text-xs text-gray-500 font-normal">
              {businessData.email || 'email@example.com'}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Developer Preview Mode */}
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase tracking-wider">
          Developer Mode
        </DropdownMenuLabel>
        <div className="px-2 py-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Viewing as:</span>
          </div>
          <div className="flex bg-gray-100 rounded p-0.5">
            <button 
              onClick={() => onRoleChange('admin')}
              className={cn(
                "flex-1 px-3 py-1.5 rounded text-xs font-medium transition-all",
                userRole === 'admin' 
                  ? 'bg-white text-[#0033A0] shadow-sm' 
                  : 'text-gray-600 hover:bg-white/50'
              )}
            >
              Admin
            </button>
            <button 
              onClick={() => onRoleChange('employee')}
              className={cn(
                "flex-1 px-3 py-1.5 rounded text-xs font-medium transition-all",
                userRole === 'employee' 
                  ? 'bg-white text-[#0033A0] shadow-sm' 
                  : 'text-gray-600 hover:bg-white/50'
              )}
            >
              Employee
            </button>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
