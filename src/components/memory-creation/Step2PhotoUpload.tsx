'use client';

import { useRef, useState } from 'react';
import { Camera, X, Check } from 'lucide-react';
import { Card, CardContent, Button, Glass, Avatar } from '@/components/ui';
import { StepProps } from './types';

export function Step2PhotoUpload({ formData, updateFormData, onNext, onBack }: StepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar formato
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, sube una imagen en formato JPG, PNG o WebP.');
      return;
    }

    // Validar tamaño (10 MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('La imagen es demasiado grande. Por favor, comprime la imagen o elige una de menor tamaño (máximo 10 MB).');
      return;
    }

    setIsUploading(true);

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      updateFormData({
        photoFile: file,
        photoPreview: reader.result as string,
      });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updateFormData({
      photoFile: null,
      photoPreview: null,
      photoUrl: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card variant="flow" animate="breathe" className="max-w-3xl mx-auto">
      <CardContent className="p-12">
        {/* Mensaje de bienvenida */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-4 font-[Outfit]">
            Una imagen vale más que mil palabras
          </h2>
          <p className="text-lg text-[#7A8A76] font-light font-[Outfit]">
            Comparte una foto que capture su esencia
          </p>
        </div>

        <Glass intensity="medium" className="p-12">
          {!formData.photoPreview ? (
            /* Área de drag & drop */
            <div
              className="border-2 border-dashed border-[rgba(122,138,118,0.3)] 
                        rounded-2xl p-16 text-center 
                        hover:border-[#B8952F] transition-all duration-300
                        hover:bg-[rgba(247,245,243,0.4)] cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto rounded-full 
                              bg-gradient-to-br from-[#E6B8A2] to-[#B8952F]
                              flex items-center justify-center
                              animate-[pulse_2s_ease-in-out_infinite]">
                  <Camera className="w-12 h-12 text-[#F7F5F3]" />
                </div>
              </div>

              <h3 className="text-xl font-medium text-[#3A4B39] mb-2 font-[Outfit]">
                Arrastra una foto aquí
              </h3>
              <p className="text-sm text-[#7A8A76] mb-4 font-[Outfit]">
                o haz clic para seleccionar
              </p>
              <p className="text-xs text-[#7A8A76] font-light font-[Outfit]">
                JPG, PNG o WebP • Máximo 10 MB
              </p>

              <Button
                variant="secondary"
                size="default"
                className="mt-6"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={isUploading}
              >
                {isUploading ? 'Subiendo...' : 'Seleccionar archivo'}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            /* Preview de foto */
            <Glass intensity="light" className="p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={formData.photoPreview}
                    alt="Preview"
                    className="w-32 h-32 rounded-2xl object-cover
                             shadow-[0_10px_30px_rgba(122,138,118,0.15)]"
                  />
                  <div className="absolute inset-0 rounded-2xl 
                                bg-gradient-to-t from-[rgba(122,138,118,0.2)] to-transparent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-[#B8952F]" />
                    <p className="text-sm font-medium text-[#3A4B39] font-[Outfit]">
                      Foto seleccionada
                    </p>
                  </div>
                  <p className="text-xs text-[#7A8A76] mb-4 font-[Outfit]">
                    Puedes cambiarla si lo deseas
                  </p>
                  <Button variant="ghost" size="sm" onClick={handleRemovePhoto}>
                    <X className="w-4 h-4 mr-2" />
                    Cambiar foto
                  </Button>
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
            disabled={!formData.photoPreview}
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

