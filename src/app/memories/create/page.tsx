'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CreateMemoryWizard } from '@/components/memory-creation';
import { CreateMemoryWizard as CreateMemoryWizardPt2 } from '@/components/memory/CreateMemoryWizardPt2';

export default function CreateMemoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<'conversation' | 'avatar'>('conversation');

  useEffect(() => {
    // Check if we should show the avatar step (from localStorage or URL param)
    if (typeof window !== 'undefined') {
      const memoryData = localStorage.getItem('memory-data');
      const stepParam = searchParams.get('step');
      
      if (stepParam === 'avatar' || (memoryData && stepParam !== 'conversation')) {
        setStep('avatar');
      }
    }
  }, [searchParams]);

  const handleComplete = (memoryId: string) => {
    // Redirect to the memory chat page
    router.push(`/memories/chat/${memoryId}`);
  };

  if (step === 'avatar') {
    return <CreateMemoryWizardPt2 onComplete={handleComplete} />;
  }

  return <CreateMemoryWizard />;
}

