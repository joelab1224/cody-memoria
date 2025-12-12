'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MemoryStep } from './types';

interface ProgressIndicatorProps {
  currentStep: MemoryStep;
  className?: string;
}

const steps = [
  { number: 1, label: 'Persona' },
  { number: 2, label: 'Foto' },
  { number: 3, label: 'Voz' },
  { number: 4, label: 'Historias' },
  { number: 5, label: 'Revisión' },
] as const;

export function ProgressIndicator({ currentStep, className }: ProgressIndicatorProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2 mb-8', className)}>
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
              step.number < currentStep &&
                'bg-[#B8952F] text-white shadow-md',
              step.number === currentStep &&
                'bg-[#7A8A76] text-white ring-4 ring-[rgba(122,138,118,0.2)] scale-110',
              step.number > currentStep &&
                'bg-[rgba(122,138,118,0.1)] text-[#7A8A76]'
            )}
          >
            {step.number < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              step.number
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'w-16 h-1 mx-2 transition-all duration-300',
                step.number < currentStep
                  ? 'bg-[#B8952F]'
                  : 'bg-[rgba(122,138,118,0.1)]'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

