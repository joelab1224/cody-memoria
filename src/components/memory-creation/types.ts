export interface MemoryFormData {
  // Paso 1: Información básica
  name: string;
  relationship: string;
  description: string;
  
  // Paso 2: Foto
  photoFile: File | null;
  photoPreview: string | null;
  photoUrl: string | null;
  
  // Paso 3: Voz
  audioFile: File | null;
  audioPreview: string | null;
  audioUrl: string | null;
  voiceCloneId: string | null;
  voiceCloneStatus: 'idle' | 'processing' | 'completed' | 'error';
  
  // Paso 4: Historias y personalidad
  favoriteMemories: string[];
  personalityTraits: string[];
  additionalInfo: string;
  
  // Paso 5: Procesamiento
  systemPrompt: string;
  anamAvatarId: string | null;
  processingStatus: 'idle' | 'processing' | 'completed' | 'error';
}

export type MemoryStep = 1 | 2 | 3 | 4 | 5;

export interface StepProps {
  formData: MemoryFormData;
  updateFormData: (data: Partial<MemoryFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

