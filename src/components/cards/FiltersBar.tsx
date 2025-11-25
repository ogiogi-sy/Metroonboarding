import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

export function FiltersBar() {
  return (
    <div className="bg-white border-b border-gray-200 py-4 px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
        <div className="flex flex-col gap-1 min-w-[160px]">
          <Label className="text-xs text-gray-600 font-normal">Entity</Label>
          <Select defaultValue="all">
            <SelectTrigger className="h-[38px] text-[13px] border-gray-300 focus:ring-[#0033A0] rounded-lg">
              <SelectValue placeholder="Select entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="uk">Metro Bank UK Ltd</SelectItem>
              <SelectItem value="eu">Metro Bank EU</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 min-w-[160px]">
          <Label className="text-xs text-gray-600 font-normal">Card Type</Label>
          <Select defaultValue="all">
            <SelectTrigger className="h-[38px] text-[13px] border-gray-300 focus:ring-[#0033A0] rounded-lg">
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

        <div className="flex flex-col gap-1 min-w-[160px]">
          <Label className="text-xs text-gray-600 font-normal">Status</Label>
          <Select defaultValue="active">
            <SelectTrigger className="h-[38px] text-[13px] border-gray-300 focus:ring-[#0033A0] rounded-lg">
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
