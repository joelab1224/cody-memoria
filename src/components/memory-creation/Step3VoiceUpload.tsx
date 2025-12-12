'use client';

import { useRef, useState } from 'react';
import { Mic, X, Play, Pause, Check } from 'lucide-react';
import { Card, CardContent, Button, Glass, Avatar } from '@/components/ui';
import { StepProps } from './types';

export function Step3VoiceUpload({ formData, updateFormData, onNext, onBack }: StepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState<string>('');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar formato
    const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/x-m4a'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, sube un archivo de audio en formato MP3, WAV o M4A.');
      return;
    }

    // Validar tamaño (50 MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Por favor, comprime el audio o elige un archivo más pequeño (máximo 50 MB).');
      return;
    }

    setIsUploading(true);

    // Crear preview y obtener duración
    const reader = new FileReader();
    reader.onloadend = () => {
      const audio = new Audio(reader.result as string);
      audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        setAudioDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        
        updateFormData({
          audioFile: file,
          audioPreview: reader.result as string,
        });
        setIsUploading(false);
      });
    };
    reader.readAsDataURL(file);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRemoveAudio = () => {
    updateFormData({
      audioFile: null,
      audioPreview: null,
      audioUrl: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Card variant="flow" animate="breathe" className="max-w-3xl mx-auto">
      <CardContent className="p-12">
        {/* Mensaje de bienvenida */}
        <div className="text-center mb-8">
          <Avatar
            variant="voice"
            size="voice"
            animation="pulse"
            className="mx-auto mb-6"
            fallback={<Mic className="w-16 h-16" />}
          />
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-4 font-[Outfit]">
            La voz de una persona es única e irreemplazable
          </h2>
          <p className="text-lg text-[#7A8A76] font-light max-w-2xl mx-auto font-[Outfit]">
            Es el sonido que recordamos, el tono que nos reconforta, las palabras que nos acompañan.
          </p>
        </div>

        <Glass intensity="medium" className="p-12">
          {!formData.audioPreview ? (
            /* Área de subida */
            <div
              className="border-2 border-dashed border-[rgba(122,138,118,0.3)] 
                        rounded-2xl p-16 text-center
                        hover:border-[#B8952F] transition-all duration-300
                        hover:bg-[rgba(247,245,243,0.4)] cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Avatar
                variant="voice"
                size="voice"
                animation="pulse"
                className="mx-auto mb-6"
                fallback={<Mic className="w-16 h-16" />}
              />

              <h3 className="text-xl font-medium text-[#3A4B39] mb-2 font-[Outfit]">
                Comparte una grabación de su voz
              </h3>
              <p className="text-sm text-[#7A8A76] mb-4 font-[Outfit]">
                Mínimo 1 minuto recomendado para mejor calidad
              </p>

              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Mic className="w-5 h-5" />}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={isUploading}
                className="mt-4"
              >
                {isUploading ? 'Subiendo...' : 'Seleccionar audio'}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="audio/mpeg,audio/mp3,audio/wav,audio/m4a"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            /* Preview de audio */
            <Glass intensity="light" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-5 h-5 text-[#B8952F]" />
                      <p className="text-sm font-medium text-[#3A4B39] font-[Outfit]">
                        Audio seleccionado
                      </p>
                    </div>
                    <p className="text-xs text-[#7A8A76] font-[Outfit]">
                      Duración: {audioDuration}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRemoveAudio}>
                    <X className="w-4 h-4 mr-2" />
                    Cambiar
                  </Button>
                </div>

                {/* Reproductor de audio */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="voiceSecondary"
                    size="voice"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <div className="h-2 bg-[rgba(122,138,118,0.1)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#7A8A76] to-[#B8952F] 
                                    rounded-full w-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>

                {/* Audio oculto para reproducción */}
                {formData.audioPreview && (
                  <audio
                    ref={audioRef}
                    src={formData.audioPreview}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                )}

                {/* Indicador de calidad */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#B8952F] animate-pulse" />
                  <p className="text-xs text-[#7A8A76] font-[Outfit]">
                    Calidad: Buena
                  </p>
                </div>
              </div>
            </Glass>
          )}
        </Glass>

        {/* Botones de navegación */}
        <div className="mt-8 flex justify-between">
          <Button variant="outline" size="lg" onClick={onBack}>
            Atrás
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={onNext}
            disabled={!formData.audioPreview}
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

