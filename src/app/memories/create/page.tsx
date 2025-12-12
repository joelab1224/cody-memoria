'use client';

import { useRouter } from 'next/navigation';
import { CreateMemoryWizard } from '@/components/memory/CreateMemoryWizardPt2';

export default function CreateMemoryPage() {
  const router = useRouter();

  const handleComplete = (memoryId: string) => {
    router.push(`/memories/${memoryId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Create a Memory</h1>
          <p className="text-muted-foreground">
            Preserve the memory of a loved one by creating an AI avatar you can talk to
          </p>
        </div>

        <CreateMemoryWizard onComplete={handleComplete} />
      </div>
    </div>
  );
}
