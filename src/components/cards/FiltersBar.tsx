import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

export function FiltersBar() {
  return (
    <div className="py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-6">
        <div className="flex flex-col gap-1.5 min-w-[180px]">
          <Label className="text-sm font-medium text-[#64748B]">Entity</Label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 text-sm bg-white border-[#E2E8F0] focus:ring-[#0033A0] rounded-[8px] shadow-none text-[#000D45] font-medium">
              <SelectValue placeholder="Select entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="uk">Metro Bank UK Ltd</SelectItem>
              <SelectItem value="eu">Metro Bank EU</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 min-w-[180px]">
          <Label className="text-sm font-medium text-[#64748B]">Card Type</Label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 text-sm bg-white border-[#E2E8F0] focus:ring-[#0033A0] rounded-[8px] shadow-none text-[#000D45] font-medium">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="virtual">Virtual</SelectItem>
              <SelectItem value="disposable">Disposable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 min-w-[180px]">
          <Label className="text-sm font-medium text-[#64748B]">Status</Label>
          <Select defaultValue="active">
            <SelectTrigger className="h-10 text-sm bg-white border-[#E2E8F0] focus:ring-[#0033A0] rounded-[8px] shadow-none text-[#000D45] font-medium">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="frozen">Frozen</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}