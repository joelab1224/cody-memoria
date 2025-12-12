'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Camera, Mic, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { PhotoUpload } from './PhotoUpload';
import { VoiceCreator } from './VoiceCreator';
import { cn } from '@/lib/utils';

type StoredConversationEntry = {
  question: string;
  answer: string;
  timestamp: string;
  type: 'voice' | 'file' | 'multi-select';
};

type StoredWizardData = {
  conversation: StoredConversationEntry[];
  memoryData: {
    name: string;
    relationship: string;
    description: string;
    favoriteMemories: string[];
    personalityTraits: string[];
    hasPhoto: boolean;
    hasAudio: boolean;
    photoPreview: string | null;
    audioPreview?: string | null;
  };
  metadata: {
    completedAt?: string;
    totalQuestions?: number;
    totalConversationEntries?: number;
  };
};

interface CreateMemoryWizardProps {
  onComplete: (memoryId: string) => void;
  className?: string;
}

type Step = 'photo' | 'voice';

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
];

const STORAGE_KEY = 'memoryWizardData';
const FALLBACK_SYSTEM_PROMPT =
  'You are a loved one speaking with the user. Be warm, empathetic, and conversational. Speak naturally as if reminiscing about shared memories.';

const buildSystemPrompt = (data: StoredWizardData): string => {
  const memoryData = data.memoryData || {
    name: '',
    relationship: '',
    description: '',
    favoriteMemories: [],
    personalityTraits: [],
    hasPhoto: false,
    hasAudio: false,
    photoPreview: null,
    audioPreview: null,
  };
  const conversation = data.conversation || [];
  const lines: string[] = [];

  const persona = memoryData.name
    ? `Habla como ${memoryData.name}${memoryData.relationship ? ` (${memoryData.relationship})` : ''}.`
    : 'Habla como un ser querido cercano al usuario.';
  lines.push(persona);

  if (memoryData.description) {
    lines.push(`Descripción: ${memoryData.description}`);
  }

  if (memoryData.personalityTraits?.length) {
    lines.push(`Rasgos de personalidad: ${memoryData.personalityTraits.join(', ')}.`);
  }

  if (memoryData.favoriteMemories?.length) {
    lines.push(`Recuerdos clave: ${memoryData.favoriteMemories.map((m) => `• ${m}`).join(' ')}`);
  }

  if (memoryData.hasPhoto || memoryData.hasAudio) {
    const assets: string[] = [];
    if (memoryData.hasPhoto) assets.push('foto disponible');
    if (memoryData.hasAudio) assets.push('audio/voz disponible');
    lines.push(`Recursos cargados: ${assets.join(' y ')}.`);
  }

  if (conversation?.length) {
    const answers = conversation
      .slice(-6) // keep recent for brevity
      .map((entry) => `Q: ${entry.question} A: ${entry.answer}`)
      .join(' | ');
    lines.push(`Respuestas proporcionadas: ${answers}`);
  }

  lines.push('Sé cálido, empático y natural. Usa respuestas concisas (2-3 oraciones).');

  return lines.join('\n');
};

export function CreateMemoryWizard({ onComplete, className }: CreateMemoryWizardProps) {
  const [currentStep, setCurrentStep] = React.useState<Step>('photo');
  const [avatarId, setAvatarId] = React.useState<string | null>(null);
  const [avatarImageUrl, setAvatarImageUrl] = React.useState<string | null>(null);
  const [voiceId, setVoiceId] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [wizardData, setWizardData] = React.useState<StoredWizardData | null>(null);
  const [systemPrompt, setSystemPrompt] = React.useState<string>(FALLBACK_SYSTEM_PROMPT);
  const [isLoadingData, setIsLoadingData] = React.useState(true);

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredWizardData;
        setWizardData(parsed);
        setSystemPrompt(buildSystemPrompt(parsed));
        // Surface any stored previews so the user sees what was captured
        if (parsed.memoryData?.photoPreview) {
          setAvatarImageUrl(parsed.memoryData.photoPreview);
        }
      }
    } catch (loadError) {
      console.warn('Unable to load wizard data', loadError);
      setSystemPrompt(FALLBACK_SYSTEM_PROMPT);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const canGoNext = () => {
    switch (currentStep) {
      case 'photo':
        return !!avatarId;
      case 'voice':
        return !!voiceId;
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

  const handleSaveMemory = async () => {
    if (!avatarId || !voiceId) {
      setError('Avatar and voice are required');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      if (!wizardData) {
        throw new Error('No se encontró la información de la memoria. Regresa y completa el formulario.');
      }

      const memoryName = wizardData.memoryData.name || 'Memory Avatar';
      const relationship = wizardData.memoryData.relationship || 'loved one';
      const description = wizardData.memoryData.description || '';
      const traits = wizardData.memoryData.personalityTraits || [];
      const favoriteMemories = wizardData.memoryData.favoriteMemories || [];

      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: memoryName,
          relationship,
          description,
          personalityTraits: traits,
          favoriteMemories,
          systemPrompt,
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
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      onComplete(memory.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create memory');
    } finally {
      setIsSaving(false);
    }
  };

  // Check if we're on the last step and can save
  const isLastStep = currentStep === 'voice';
  const canSave = isLastStep && !!voiceId && !!avatarId;
  const memoryInfo = wizardData?.memoryData;

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Stored info preview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Información capturada</CardTitle>
          <CardDescription>
            Datos provenientes del formulario conversacional guardado en tu navegador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingData ? (
            <p className="text-sm text-muted-foreground">Cargando datos guardados...</p>
          ) : memoryInfo ? (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Nombre:</span> {memoryInfo.name || '—'}
              </p>
              <p>
                <span className="font-medium">Relación:</span> {memoryInfo.relationship || '—'}
              </p>
              <p>
                <span className="font-medium">Descripción:</span>{' '}
                {memoryInfo.description || 'Sin descripción'}
              </p>
              <p>
                <span className="font-medium">Rasgos:</span>{' '}
                {memoryInfo.personalityTraits?.length
                  ? memoryInfo.personalityTraits.join(', ')
                  : 'Ninguno'}
              </p>
              <p>
                <span className="font-medium">Recuerdos:</span>{' '}
                {memoryInfo.favoriteMemories?.length
                  ? memoryInfo.favoriteMemories.map((m, idx) => (
                      <span key={m}>
                        {idx > 0 ? ' · ' : ''}
                        {m}
                      </span>
                    ))
                  : 'Sin recuerdos'}
              </p>
              <p className="text-muted-foreground">
                System prompt generado a partir de tus respuestas.
              </p>
            </div>
          ) : (
            <p className="text-sm text-destructive">
              No encontramos datos guardados. Vuelve al flujo anterior para completar la información.
            </p>
          )}
        </CardContent>
      </Card>

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
              key={avatarImageUrl || 'photo-empty'}
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
          disabled={currentStepIndex === 0 || isSaving}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {isLastStep ? (
          <Button onClick={handleSaveMemory} disabled={!canSave || isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Memory...
              </>
            ) : (
              'Create Memory'
            )}
          </Button>
        ) : (
          <Button onClick={goNext} disabled={!canGoNext()}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
