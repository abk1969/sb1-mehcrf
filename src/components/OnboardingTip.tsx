import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface OnboardingTipProps {
  content: string;
}

export function OnboardingTip({ content }: OnboardingTipProps) {
  return (
    <Tooltip content={content}>
      <div className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <HelpCircle size={16} className="ml-1" />
      </div>
    </Tooltip>
  );
}