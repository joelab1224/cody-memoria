'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Camera, Mic, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { PhotoUpload } from './PhotoUpload';
import { VoiceCreator } from './VoiceCreator';
import { MemoryReview } from './MemoryReview';
import { cn } from '@/lib/utils';

interface CreateMemoryWizardProps {
  onComplete: (memoryId: string) => void;
  className?: string;
}

type Step = 'photo' | 'voice' | 'review';

const STEPS: { id: Step; title: string; description: string; icon: React.ElementType }[] = [
  {
    id: 'photo',
    title: 'Upload Photo',
    description: 'Upload a photo to create the avatar',
    icon: Camera,
  },
  {
    id: 'voice',
    title: 'Create Voice',
    description: 'Clone or design a voice',
    icon: Mic,
  },
  {
    id: 'review',
    title: 'Review & Save',
    description: 'Add details and save your memory',
    icon: CheckCircle,
  },
];

export function CreateMemoryWizard({ onComplete, className }: CreateMemoryWizardProps) {
  const [currentStep, setCurrentStep] = React.useState<Step>('photo');
  const [avatarId, setAvatarId] = React.useState<string | null>(null);
  const [avatarImageUrl, setAvatarImageUrl] = React.useState<string | null>(null);
  const [voiceId, setVoiceId] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  const canGoNext = () => {
    switch (currentStep) {
      case 'photo':
        return !!avatarId;
      case 'voice':
        return !!voiceId;
      case 'review':
        return false;
      default:
        return false;
    }
  };

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const goBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const handleAvatarCreated = (data: { avatarId: string; imageUrl: string }) => {
    setAvatarId(data.avatarId);
    setAvatarImageUrl(data.imageUrl);
  };

  const handleVoiceCreated = (id: string) => {
    setVoiceId(id);
  };

  const handleSave = async (data: {
    name: string;
    relationship: string;
    description: string;
    personalityTraits: string[];
    systemPrompt: string;
  }) => {
    if (!avatarId || !voiceId) {
      setError('Avatar and voice are required');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          anamAvatarId: avatarId,
          avatarImageUrl,
          voiceCloneId: voiceId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create memory');
      }

      const memory = await response.json();
      onComplete(memory.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create memory');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = step.id === currentStep;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                      isCompleted && 'bg-primary border-primary text-primary-foreground',
                      isCurrent && 'border-primary text-primary',
                      !isCompleted && !isCurrent && 'border-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium',
                      isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2',
                      index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStepIndex].title}</CardTitle>
          <CardDescription>{STEPS[currentStepIndex].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 'photo' && (
            <PhotoUpload
              onAvatarCreated={handleAvatarCreated}
              initialImageUrl={avatarImageUrl || undefined}
            />
          )}

          {currentStep === 'voice' && (
            <VoiceCreator
              onVoiceCreated={handleVoiceCreated}
              initialVoiceId={voiceId || undefined}
            />
          )}

          {currentStep === 'review' && (
            <MemoryReview
              avatarId={avatarId}
              avatarImageUrl={avatarImageUrl}
              voiceId={voiceId}
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}

          {error && (
            <p className="mt-4 text-sm text-destructive text-center">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goBack}
          disabled={currentStepIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep !== 'review' && (
          <Button onClick={goNext} disabled={!canGoNext()}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
