'use client';

import { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { Card, CardContent, Input, Textarea, Button, Avatar, Glass, cn } from '@/components/ui';
import { StepProps } from './types';

export function Step1PersonInfo({ formData, updateFormData, onNext }: StepProps) {
  const [errors, setErrors] = useState<{
    name?: string;
    relationship?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Por favor, comparte el nombre de la persona que quieres preservar.';
    }
    
    if (!formData.relationship.trim()) {
      newErrors.relationship = 'Cuéntanos cómo te relacionas con esta persona.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <Card variant="flow" animate="breathe" className="max-w-3xl mx-auto">
      <CardContent className="p-12">
        {/* Mensaje de bienvenida */}
        <div className="text-center mb-8">
          <Avatar
            variant="profile"
            size="lg"
            animation="shimmer"
            className="mx-auto mb-4"
            fallback={<User className="w-8 h-8" />}
          />
          <h1 className="text-3xl font-medium text-[#3A4B39] mb-2 font-[Outfit]">
            Cada historia comienza con una persona
          </h1>
          <p className="text-lg text-[#7A8A76] font-light font-[Outfit]">
            Cuéntanos sobre esa persona especial que quieres preservar
          </p>
        </div>

        {/* Formulario */}
        <Glass intensity="light" className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#3A4B39] mb-2 font-[Outfit]">
              Nombre de la persona
            </label>
            <Input
              variant="glass"
              placeholder="Ej: María García, Abuelo José..."
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              error={!!errors.name}
              errorMessage={errors.name}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A4B39] mb-2 font-[Outfit]">
              Tu relación con esta persona
            </label>
            <Input
              variant="glass"
              placeholder="Ej: Mi abuela materna, Mi padre..."
              value={formData.relationship}
              onChange={(e) => updateFormData({ relationship: e.target.value })}
              error={!!errors.relationship}
              errorMessage={errors.relationship}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A4B39] mb-2 font-[Outfit]">
              Cuéntanos sobre ella <span className="text-[#7A8A76] font-normal">(opcional)</span>
            </label>
            <Textarea
              variant="glass"
              placeholder="¿Qué la hace especial? ¿Qué recuerdas más de ella?"
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              rows={4}
              className="w-full"
              maxLength={500}
            />
            <p className="text-xs text-[#7A8A76] mt-2 font-light font-[Outfit]">
              {formData.description.length}/500 • No te preocupes por ser perfecto. Escribe desde el corazón.
            </p>
          </div>
        </Glass>

        {/* Botón de continuar */}
        <div className="mt-8 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="min-w-[200px]"
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

