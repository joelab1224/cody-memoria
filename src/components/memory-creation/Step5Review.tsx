'use client';

import { Check, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, Button, Glass, Avatar } from '@/components/ui';
import { StepProps } from './types';

export function Step5Review({ formData, updateFormData, onBack, isLoading }: StepProps) {
  if (isLoading) {
    return (
      <Card variant="flow" animate="breathe" className="max-w-3xl mx-auto">
        <CardContent className="p-12">
          <Glass intensity="medium" className="p-12">
            <div className="text-center space-y-6">
              <Avatar
                variant="profile"
                size="xl"
                src={formData.photoPreview || undefined}
                animation="pulse"
                className="mx-auto"
              />

              <h3 className="text-xl font-medium text-[#3A4B39] font-[Outfit]">
                Creando tu memoria...
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-[#B8952F]" />
                  <span className="text-sm text-[#5A6B59] font-[Outfit]">Validando información</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-[#B8952F]" />
                  <span className="text-sm text-[#5A6B59] font-[Outfit]">Procesando archivos</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 text-[#7A8A76] animate-spin" />
                  <span className="text-sm text-[#5A6B59] font-[Outfit]">Creando avatar</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 text-[#7A8A76] animate-spin" />
                  <span className="text-sm text-[#5A6B59] font-[Outfit]">Configurando personalidad</span>
                </div>
              </div>

              <p className="text-xs text-[#7A8A76] font-light italic font-[Outfit]">
                Estamos preservando su voz única...
              </p>
            </div>
          </Glass>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="flow" animate="breathe" className="max-w-3xl mx-auto">
      <CardContent className="p-12">
        {/* Mensaje de bienvenida */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-4 font-[Outfit]">
            Estás a punto de crear algo muy especial
          </h2>
          <p className="text-lg text-[#7A8A76] font-light font-[Outfit]">
            Revisemos juntos toda la información que has compartido
          </p>
        </div>

        {/* Resumen visual */}
        <div className="space-y-6">
          {/* Información básica */}
          <Glass intensity="light" className="p-6">
            <div className="flex items-start gap-6">
              <Avatar
                variant="profile"
                size="md"
                src={formData.photoPreview || undefined}
                animation="shimmer"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-[#3A4B39] mb-2 font-[Outfit]">
                  {formData.name}
                </h3>
                <p className="text-sm text-[#7A8A76] mb-2 font-[Outfit]">
                  {formData.relationship}
                </p>
                {formData.description && (
                  <p className="text-sm text-[#5A6B59] font-[Outfit]">
                    {formData.description}
                  </p>
                )}
              </div>
            </div>
          </Glass>

          {/* Multimedia */}
          <Glass intensity="light" className="p-6">
            <h4 className="text-sm font-medium text-[#3A4B39] mb-4 font-[Outfit]">
              Multimedia
            </h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#B8952F] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-[#5A6B59] font-[Outfit]">Foto subida</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#B8952F] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-[#5A6B59] font-[Outfit]">Audio listo</span>
              </div>
            </div>
          </Glass>

          {/* Historias y personalidad */}
          <Glass intensity="light" className="p-6">
            <h4 className="text-sm font-medium text-[#3A4B39] mb-4 font-[Outfit]">
              Historias y Personalidad
            </h4>
            <div className="space-y-3 mb-4">
              {formData.favoriteMemories.map((memory, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#B8952F] mt-2" />
                  <p className="text-sm text-[#5A6B59] flex-1 font-[Outfit]">{memory}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.personalityTraits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 rounded-full text-xs 
                           bg-[rgba(122,138,118,0.1)] text-[#5A6B59] font-[Outfit]"
                >
                  {trait}
                </span>
              ))}
            </div>
          </Glass>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 justify-end mt-8">
          <Button variant="outline" size="lg" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Atrás
          </Button>
          <Button
            variant="primary"
            size="lg"
            loading={isLoading}
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            Crear Memoria
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

