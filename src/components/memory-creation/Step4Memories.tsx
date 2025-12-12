'use client';

import { useState } from 'react';
import { Plus, X, Heart } from 'lucide-react';
import { Card, CardContent, Button, Glass, Textarea, Input } from '@/components/ui';
import { StepProps } from './types';

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
] as const;

export function Step4Memories({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [newMemory, setNewMemory] = useState('');

  const addMemory = () => {
    if (newMemory.trim() && newMemory.length >= 10) {
      updateFormData({
        favoriteMemories: [...formData.favoriteMemories, newMemory.trim()],
      });
      setNewMemory('');
    }
  };

  const removeMemory = (index: number) => {
    updateFormData({
      favoriteMemories: formData.favoriteMemories.filter((_, i) => i !== index),
    });
  };

  const toggleTrait = (traitId: string) => {
    const currentTraits = formData.personalityTraits;
    if (currentTraits.includes(traitId)) {
      updateFormData({
        personalityTraits: currentTraits.filter((t) => t !== traitId),
      });
    } else {
      updateFormData({
        personalityTraits: [...currentTraits, traitId],
      });
    }
  };

  const canContinue = formData.favoriteMemories.length >= 1 && formData.personalityTraits.length >= 2;

  return (
    <Card variant="flow" animate="breathe" className="max-w-3xl mx-auto">
      <CardContent className="p-12">
        {/* Mensaje de bienvenida */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full 
                        bg-gradient-to-br from-[#E6B8A2] to-[#B8952F]
                        flex items-center justify-center">
            <Heart className="w-8 h-8 text-[#F7F5F3]" />
          </div>
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-4 font-[Outfit]">
            Las historias son lo que realmente definen a una persona
          </h2>
          <p className="text-lg text-[#7A8A76] font-light font-[Outfit]">
            Comparte esos recuerdos especiales que quieres preservar
          </p>
        </div>

        <Glass intensity="medium" className="p-12 space-y-8">
          {/* Recuerdos favoritos */}
          <div>
            <label className="block text-sm font-medium text-[#3A4B39] mb-4 font-[Outfit]">
              Recuerdos favoritos
            </label>
            <p className="text-xs text-[#7A8A76] mb-4 font-light font-[Outfit]">
              Historias, anécdotas o momentos especiales (puedes agregar varios)
            </p>

            <div className="space-y-3 mb-4">
              {formData.favoriteMemories.map((memory, index) => (
                <Glass
                  key={index}
                  intensity="light"
                  className="p-4 flex items-center gap-4"
                  animate="breathe"
                  animationDelay={index * 0.1}
                >
                  <div className="flex-1">
                    <p className="text-sm text-[#5A6B59] font-[Outfit]">{memory}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMemory(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </Glass>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                variant="glass"
                placeholder="Ej: Cuando nos llevó a pescar por primera vez..."
                value={newMemory}
                onChange={(e) => setNewMemory(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addMemory();
                  }
                }}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="default"
                onClick={addMemory}
                disabled={!newMemory.trim() || newMemory.length < 10}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.favoriteMemories.length === 0 && (
              <p className="text-xs text-[#7A8A76] mt-2 font-light font-[Outfit]">
                Los recuerdos son el corazón de esta memoria. Por favor, comparte al menos un recuerdo especial.
              </p>
            )}
          </div>

          {/* Rasgos de personalidad */}
          <div>
            <label className="block text-sm font-medium text-[#3A4B39] mb-4 font-[Outfit]">
              Rasgos de personalidad
            </label>
            <p className="text-xs text-[#7A8A76] mb-4 font-light font-[Outfit]">
              Selecciona 3-7 rasgos que la definían
            </p>

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
            {formData.personalityTraits.length < 2 && (
              <p className="text-xs text-[#7A8A76] mt-4 font-light font-[Outfit]">
                Los rasgos de personalidad ayudan a que la IA se comporte de manera auténtica. Selecciona al menos 2 rasgos.
              </p>
            )}
          </div>

          {/* Información adicional */}
          <div>
            <label className="block text-sm font-medium text-[#3A4B39] mb-2 font-[Outfit]">
              Información adicional <span className="text-[#7A8A76] font-normal">(opcional)</span>
            </label>
            <Textarea
              variant="glass"
              placeholder="Pasatiempos, valores, frases características..."
              value={formData.additionalInfo}
              onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
              rows={4}
              className="w-full"
            />
          </div>
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
            disabled={!canContinue}
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

