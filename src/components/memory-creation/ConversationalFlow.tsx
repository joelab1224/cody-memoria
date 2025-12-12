'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { Glass, Button } from '@/components/ui';
import { MemoryFormData } from './types';

interface ConversationQuestion {
  id: string;
  key: keyof MemoryFormData | 'name' | 'relationship' | 'description';
  question: string;
  subtitle?: string;
  type: 'voice' | 'file' | 'multi-select';
  validation?: (value: any) => boolean;
  errorMessage?: string;
}

const QUESTIONS: ConversationQuestion[] = [
  {
    id: 'name',
    key: 'name',
    question: 'Cada historia comienza con una persona.',
    subtitle: '¿Cómo se llama esa persona especial que quieres preservar?',
    type: 'voice',
    validation: (v) => v && v.length >= 2,
    errorMessage: 'Por favor, comparte el nombre de la persona.',
  },
  {
    id: 'relationship',
    key: 'relationship',
    question: `¿Cuál es tu relación con {name}?`,
    type: 'voice',
    validation: (v) => v && v.trim().length > 0,
    errorMessage: 'Cuéntanos cómo te relacionas con esta persona.',
  },
  {
    id: 'description',
    key: 'description',
    question: 'Cuéntame sobre {name}.',
    subtitle: '¿Qué la hace especial? ¿Qué recuerdas más de ella?',
    type: 'voice',
    validation: () => true,
  },
  {
    id: 'photo',
    key: 'photoFile',
    question: 'Una imagen vale más que mil palabras.',
    subtitle: '¿Tienes una foto de {name} que capture su esencia?',
    type: 'file',
    validation: (v) => !!v,
    errorMessage: 'La foto es opcional, pero recomendamos subir una.',
  },
  {
    id: 'voice',
    key: 'audioFile',
    question: 'La voz de una persona es única.',
    subtitle: '¿Tienes una grabación de {name} hablando?',
    type: 'file',
    validation: (v) => !!v,
    errorMessage: 'El audio es necesario para clonar la voz.',
  },
  {
    id: 'memories',
    key: 'favoriteMemories',
    question: 'Las historias definen a una persona.',
    subtitle: '¿Qué recuerdos o anécdotas de {name} quieres preservar?',
    type: 'voice',
    validation: (v) => Array.isArray(v) && v.length >= 1,
    errorMessage: 'Comparte al menos un recuerdo especial.',
  },
  {
    id: 'traits',
    key: 'personalityTraits',
    question: '¿Qué rasgos de personalidad definían a {name}?',
    type: 'multi-select',
    validation: (v) => Array.isArray(v) && v.length >= 2,
    errorMessage: 'Selecciona al menos 2 rasgos.',
  },
];

const INITIAL_FORM_DATA: MemoryFormData = {
  name: '',
  relationship: '',
  description: '',
  photoFile: null,
  photoPreview: null,
  photoUrl: null,
  audioFile: null,
  audioPreview: null,
  audioUrl: null,
  voiceCloneId: null,
  voiceCloneStatus: 'idle',
  favoriteMemories: [],
  personalityTraits: [],
  additionalInfo: '',
  systemPrompt: '',
  anamAvatarId: null,
  processingStatus: 'idle',
};

const PERSONALITY_TRAITS = [
  { id: 'cariñoso', label: 'Cariñoso/a' },
  { id: 'divertido', label: 'Divertido/a' },
  { id: 'sabio', label: 'Sabio/a' },
  { id: 'paciente', label: 'Paciente' },
  { id: 'optimista', label: 'Optimista' },
  { id: 'generoso', label: 'Generoso/a' },
  { id: 'trabajador', label: 'Trabajador/a' },
  { id: 'humoristico', label: 'Humorístico/a' },
  { id: 'empativo', label: 'Empático/a' },
  { id: 'valiente', label: 'Valiente' },
  { id: 'creativo', label: 'Creativo/a' },
  { id: 'honesto', label: 'Honesto/a' },
];

export function ConversationalFlow() {
  const [formData, setFormData] = useState<MemoryFormData>(INITIAL_FORM_DATA);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
  const questionText = currentQuestion.question.replace('{name}', formData.name || 'esta persona');
  const questionSubtitle = currentQuestion.subtitle?.replace('{name}', formData.name || 'esta persona');

  // Fade in animation on mount and question change
  useEffect(() => {
    setIsFadingIn(true);
    const timer = setTimeout(() => setIsFadingIn(false), 600);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // Initialize speech recognition if available
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    }
  }, []);

  const updateFormData = (key: keyof MemoryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setTranscript('');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    let value: any;
    let isValid = true;

    if (currentQuestion.type === 'multi-select') {
      value = formData.personalityTraits;
      isValid = formData.personalityTraits.length >= 2;
    } else if (currentQuestion.type === 'file') {
      value = currentQuestion.key === 'photoFile' ? formData.photoFile : formData.audioFile;
      isValid = !!value;
    } else if (currentQuestion.type === 'voice') {
      if (!transcript.trim()) {
        setError(currentQuestion.errorMessage || 'Por favor, comparte tu respuesta.');
        return;
      }
      value = transcript;
    }

    if (currentQuestion.validation && !currentQuestion.validation(value)) {
      setError(currentQuestion.errorMessage || 'Por favor, completa esta información.');
      return;
    }

    setError(null);
    
    // Fade out current question
    setIsFadingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Update form data
    if (currentQuestion.type === 'voice') {
      if (currentQuestion.key === 'favoriteMemories') {
        const newMemories = [...formData.favoriteMemories, transcript.trim()];
        updateFormData('favoriteMemories', newMemories);
        setTranscript('');
        setIsProcessing(false);
        setIsFadingOut(false);
        return; // Allow adding more memories
      }
      updateFormData(currentQuestion.key as keyof MemoryFormData, value);
    }

    setIsProcessing(false);
    setTranscript('');
    setIsFadingOut(false);

    if (isLastQuestion) {
      handleFinalSubmit();
    } else {
      // Move to next question with fade in
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setError(null);
      }, 200);
    }
  };

  const handleFinalSubmit = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`¡Memoria de ${formData.name} creada exitosamente!`);
    }, 2000);
  };

  const toggleTrait = (traitId: string) => {
    const currentTraits = formData.personalityTraits;
    if (currentTraits.includes(traitId)) {
      updateFormData('personalityTraits', currentTraits.filter((t) => t !== traitId));
    } else {
      updateFormData('personalityTraits', [...currentTraits, traitId]);
    }
  };

  const canContinue = () => {
    if (currentQuestion.type === 'multi-select') {
      return formData.personalityTraits.length >= 2;
    }
    if (currentQuestion.type === 'file') {
      return currentQuestion.key === 'photoFile' ? !!formData.photoFile : !!formData.audioFile;
    }
    if (currentQuestion.type === 'voice' && currentQuestion.key === 'favoriteMemories') {
      return formData.favoriteMemories.length >= 1 || transcript.trim().length > 0;
    }
    return transcript.trim().length > 0;
  };

  const renderContent = () => {
    if (currentQuestion.type === 'multi-select') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PERSONALITY_TRAITS.map((trait) => (
              <Button
                key={trait.id}
                variant={formData.personalityTraits.includes(trait.id) ? 'primary' : 'outline'}
                size="default"
                onClick={() => toggleTrait(trait.id)}
                className="justify-start"
              >
                {trait.label}
              </Button>
            ))}
          </div>
          {error && (
            <p className="text-sm text-red-600 font-light font-[Outfit] text-center">{error}</p>
          )}
        </div>
      );
    }

    if (currentQuestion.type === 'file') {
      return (
        <div className="space-y-6">
          <input
            type="file"
            accept={currentQuestion.key === 'photoFile' ? 'image/*' : 'audio/*'}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (currentQuestion.key === 'photoFile') {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    updateFormData('photoFile', file);
                    updateFormData('photoPreview', reader.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  updateFormData('audioFile', file);
                }
              }
            }}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="block w-full p-12 border-2 border-dashed border-[rgba(122,138,118,0.3)] 
                     rounded-2xl text-center cursor-pointer hover:border-[#B8952F] 
                     transition-all duration-300 hover:bg-[rgba(247,245,243,0.4)]"
          >
            {currentQuestion.key === 'photoFile' && formData.photoPreview ? (
              <div className="space-y-4">
                <img
                  src={formData.photoPreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-lg"
                />
                <p className="text-sm text-[#3A4B39] font-medium font-[Outfit]">Foto seleccionada</p>
              </div>
            ) : (
              <>
                <p className="text-lg text-[#5A6B59] mb-2 font-[Outfit]">
                  Haz clic para seleccionar archivo
                </p>
                <p className="text-sm text-[#7A8A76] font-[Outfit]">
                  {currentQuestion.key === 'photoFile' ? 'JPG, PNG, WebP • Máx 10MB' : 'MP3, WAV, M4A • Máx 50MB'}
                </p>
              </>
            )}
          </label>
          {error && (
            <p className="text-sm text-red-600 font-light font-[Outfit] text-center">{error}</p>
          )}
        </div>
      );
    }

    // Voice input with waveform
    return (
      <div className="space-y-8">
        {/* Voice waveform */}
        <div className="flex items-center justify-center gap-1 h-12">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-[#A8B5A0] rounded-full transition-all duration-300"
              style={{
                height: isRecording ? `${8 + Math.random() * 24}px` : '8px',
                opacity: isRecording ? 1 : 0.3,
                animation: isRecording
                  ? `waveform 1.5s ease-in-out infinite`
                  : 'none',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Transcript display */}
        <Glass intensity="light" className="p-8 min-h-[120px]">
          <div className="text-center">
            {transcript ? (
              <p className="text-lg text-[#5A6B59] font-light font-[Outfit] leading-relaxed">
                {transcript}
              </p>
            ) : (
              <p className="text-sm text-[#7A8A76] font-light font-[Outfit] italic">
                {isRecording ? 'Escuchando...' : 'Tu respuesta aparecerá aquí'}
              </p>
            )}
          </div>
        </Glass>

        {/* Memories list if applicable */}
        {currentQuestion.key === 'favoriteMemories' && formData.favoriteMemories.length > 0 && (
          <div className="space-y-3">
            {formData.favoriteMemories.map((memory, idx) => (
              <Glass key={idx} intensity="light" className="p-4">
                <p className="text-sm text-[#5A6B59] font-[Outfit]">{memory}</p>
              </Glass>
            ))}
          </div>
        )}

        {/* Voice control button */}
        <div className="flex justify-center">
          <Button
            variant={isRecording ? 'primary' : 'outline'}
            size="xl"
            onClick={isRecording ? stopRecording : startRecording}
            leftIcon={isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            className="min-w-[250px] text-lg rounded-full"
          >
            {isRecording ? 'Detener' : 'Presiona para hablar'}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-600 font-light font-[Outfit] text-center">{error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5F3] via-[#E8D5B7] to-[#7A8A76] flex items-center justify-center p-4">
      <style jsx>{`
        @keyframes waveform {
          0%, 100% { 
            height: 8px; 
            opacity: 0.3; 
          }
          50% { 
            height: 32px; 
            opacity: 1; 
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .fade-out {
          animation: fadeOut 0.4s ease-in;
        }
      `}</style>

      <div className="w-full max-w-2xl">
        <Glass 
          animate="breathe" 
          intensity="medium" 
          className={`p-12 transition-opacity duration-300 ${
            isFadingOut ? 'fade-out' : isFadingIn ? 'fade-in' : ''
          }`}
        >
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {QUESTIONS.map((_, idx) => (
              <div
                key={idx}
                className={`
                  h-2 rounded-full transition-all duration-500
                  ${idx <= currentQuestionIndex ? 'bg-[#B8952F] flex-1' : 'bg-[rgba(122,138,118,0.2)] w-2'}
                `}
              />
            ))}
          </div>

          {/* Question */}
          <div className={`text-center mb-12 space-y-4 ${isFadingIn ? 'fade-in' : ''}`}>
            <h1 className="text-4xl font-medium text-[#3A4B39] font-[Outfit] leading-tight">
              {questionText}
            </h1>
            {questionSubtitle && (
              <p className="text-xl text-[#7A8A76] font-light font-[Outfit]">
                {questionSubtitle}
              </p>
            )}
          </div>

          {/* Content area */}
          <div className="mb-8">
            {renderContent()}
          </div>

          {/* Action button */}
          {!isProcessing && (
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="xl"
                onClick={handleSubmit}
                disabled={!canContinue()}
                rightIcon={isLastQuestion ? <Sparkles className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                className="min-w-[250px] text-lg"
              >
                {isLastQuestion ? 'Crear Memoria' : 'Continuar'}
              </Button>
            </div>
          )}

          {isProcessing && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-5 text-[#7A8A76] animate-spin" />
              <p className="text-sm text-[#7A8A76] font-[Outfit]">
                {isLastQuestion ? 'Creando tu memoria...' : 'Procesando...'}
              </p>
            </div>
          )}
        </Glass>
      </div>
    </div>
  );
}
