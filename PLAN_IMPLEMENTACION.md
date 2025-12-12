# Plan de Implementación - Flujo de Creación de Memorias

## Estructura del Proyecto Actual

```
src/
├── app/                    # Next.js App Router
│   ├── examples/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/                 # Componentes base (Button, Card, Input, Avatar, Glass)
├── lib/
│   ├── anam.ts             # ✅ Cliente Anam.ai
│   ├── elevenlabs.ts       # ✅ Cliente ElevenLabs
│   ├── db.ts               # ✅ Cliente Prisma
│   └── utils.ts            # ✅ Utilidades
└── types/
    ├── anam.ts
    └── index.ts
```

## Archivos a Crear

### 1. Rutas de la Aplicación

```
src/app/
├── memories/
│   ├── create/
│   │   ├── page.tsx                    # Página principal del flujo
│   │   └── layout.tsx                  # Layout con progreso
│   ├── [id]/
│   │   └── page.tsx                    # Vista de memoria individual
│   └── chat/
│       └── [id]/
│           └── page.tsx                # Interfaz de chat
└── api/
    ├── memories/
    │   ├── route.ts                    # GET (listar) y POST (crear)
    │   └── [id]/
    │       └── route.ts                # GET, PUT, DELETE
    ├── upload/
    │   ├── image/route.ts              # POST - Subir imagen
    │   └── audio/route.ts              # POST - Subir audio
    ├── elevenlabs/
    │   └── clone/route.ts              # POST - Clonar voz
    └── anam/
        └── avatar/route.ts             # POST - Crear avatar
```

### 2. Componentes de Memoria

```
src/components/
├── memory/
│   ├── CreateMemoryWizard.tsx          # Wizard principal (5 pasos)
│   ├── Step1PersonInfo.tsx             # Paso 1: Información básica
│   ├── Step2PhotoUpload.tsx             # Paso 2: Subida de foto
│   ├── Step3VoiceUpload.tsx             # Paso 3: Subida de voz
│   ├── Step4Memories.tsx                # Paso 4: Historias y personalidad
│   ├── Step5Review.tsx                  # Paso 5: Revisión final
│   ├── ProgressIndicator.tsx           # Indicador de progreso
│   └── MemoryCard.tsx                   # Tarjeta de memoria
└── ui/
    ├── Textarea.tsx                     # Componente Textarea (nuevo)
    ├── FileUpload.tsx                   # Componente de subida de archivos
    └── ProgressBar.tsx                  # Barra de progreso
```

### 3. Hooks y Utilidades

```
src/hooks/
├── useMemoryForm.ts                     # Hook para gestión del formulario
├── useFileUpload.ts                     # Hook para subida de archivos
└── useVoiceClone.ts                     # Hook para clonación de voz

src/lib/
├── memory-utils.ts                      # Utilidades para memorias
│   ├── generateSystemPrompt()           # Generar system prompt
│   └── validateMemoryData()            # Validar datos
└── vercel-blob.ts                       # Cliente Vercel Blob (si no existe)
```

### 4. Tipos TypeScript

```
src/types/
└── memory.ts                            # Tipos específicos de memoria
    ├── MemoryFormData
    ├── MemoryStep
    └── MemoryValidation
```

---

## Fase 1: Configuración Base

### 1.1 Crear estructura de carpetas
- [ ] Crear `src/app/memories/create/`
- [ ] Crear `src/app/memories/[id]/`
- [ ] Crear `src/app/api/memories/`
- [ ] Crear `src/app/api/upload/`
- [ ] Crear `src/components/memory/`
- [ ] Crear `src/hooks/`

### 1.2 Configurar tipos TypeScript
- [ ] Crear `src/types/memory.ts` con tipos del formulario
- [ ] Actualizar `src/types/index.ts` si es necesario

### 1.3 Configurar Vercel Blob
- [ ] Crear `src/lib/vercel-blob.ts` para manejo de archivos
- [ ] Verificar variables de entorno

---

## Fase 2: API Routes

### 2.1 API de Memorias

**`src/app/api/memories/route.ts`**
- [ ] `GET` - Listar memorias del usuario autenticado
- [ ] `POST` - Crear nueva memoria (guardar como draft inicialmente)

**`src/app/api/memories/[id]/route.ts`**
- [ ] `GET` - Obtener memoria por ID
- [ ] `PUT` - Actualizar memoria
- [ ] `DELETE` - Eliminar memoria

### 2.2 API de Subida de Archivos

**`src/app/api/upload/image/route.ts`**
- [ ] Validar formato (JPG, PNG, WebP)
- [ ] Validar tamaño (máx 10MB)
- [ ] Subir a Vercel Blob
- [ ] Retornar URL

**`src/app/api/upload/audio/route.ts`**
- [ ] Validar formato (MP3, WAV, M4A)
- [ ] Validar tamaño (máx 50MB)
- [ ] Validar duración mínima (1 minuto)
- [ ] Subir a Vercel Blob
- [ ] Retornar URL y metadata

### 2.3 API de Integraciones

**`src/app/api/elevenlabs/clone/route.ts`**
- [ ] Recibir audio URL
- [ ] Clonar voz usando ElevenLabsClient
- [ ] Retornar voiceCloneId

**`src/app/api/anam/avatar/route.ts`**
- [ ] Recibir configuración de persona
- [ ] Crear avatar usando AnamClient
- [ ] Retornar anamAvatarId

---

## Fase 3: Componentes de UI

### 3.1 Componentes Base Adicionales

**`src/components/ui/Textarea.tsx`**
- [ ] Crear componente Textarea con estilo glass
- [ ] Variantes: default, glass
- [ ] Soporte para error states

**`src/components/ui/FileUpload.tsx`**
- [ ] Componente drag & drop
- [ ] Preview de archivos
- [ ] Indicadores de progreso
- [ ] Validación visual

**`src/components/ui/ProgressBar.tsx`**
- [ ] Barra de progreso con animación
- [ ] Variantes de color

### 3.2 Componentes de Memoria

**`src/components/memory/ProgressIndicator.tsx`**
- [ ] Mostrar paso actual (1-5)
- [ ] Indicadores visuales de completado
- [ ] Navegación entre pasos

**`src/components/memory/Step1PersonInfo.tsx`**
- [ ] Formulario: nombre, relación, descripción
- [ ] Validación en tiempo real
- [ ] Mensajes empáticos

**`src/components/memory/Step2PhotoUpload.tsx`**
- [ ] Upload de imagen
- [ ] Preview de foto
- [ ] Validación de formato y tamaño

**`src/components/memory/Step3VoiceUpload.tsx`**
- [ ] Upload de audio
- [ ] Indicador de duración
- [ ] Preview de audio
- [ ] Validación de calidad

**`src/components/memory/Step4Memories.tsx`**
- [ ] Input múltiple para recuerdos favoritos
- [ ] Selector de rasgos de personalidad
- [ ] Campo de texto libre opcional

**`src/components/memory/Step5Review.tsx`**
- [ ] Resumen de toda la información
- [ ] Opción de editar cada sección
- [ ] Botón de confirmación
- [ ] Indicador de procesamiento

**`src/components/memory/CreateMemoryWizard.tsx`**
- [ ] Orquestador principal
- [ ] Gestión de estado del formulario
- [ ] Navegación entre pasos
- [ ] Guardado automático

---

## Fase 4: Páginas

### 4.1 Página de Creación

**`src/app/memories/create/page.tsx`**
- [ ] Server Component que renderiza el wizard
- [ ] Verificación de autenticación
- [ ] Layout con ProgressIndicator

**`src/app/memories/create/layout.tsx`**
- [ ] Layout con header
- [ ] Breadcrumbs
- [ ] Botón de salir/guardar borrador

### 4.2 Página de Vista de Memoria

**`src/app/memories/[id]/page.tsx`**
- [ ] Cargar memoria por ID
- [ ] Mostrar información completa
- [ ] Botón "Iniciar Conversación"
- [ ] Opciones de edición

### 4.3 Página de Chat

**`src/app/memories/chat/[id]/page.tsx`**
- [ ] Interfaz de chat con avatar
- [ ] Integración con Anam.ai
- [ ] Reproducción de audio

---

## Fase 5: Hooks y Lógica

### 5.1 Hook de Formulario

**`src/hooks/useMemoryForm.ts`**
- [ ] Estado del formulario (5 pasos)
- [ ] Validación por paso
- [ ] Guardado automático en localStorage
- [ ] Carga de draft guardado

### 5.2 Hook de Subida de Archivos

**`src/hooks/useFileUpload.ts`**
- [ ] Manejo de subida de archivos
- [ ] Indicadores de progreso
- [ ] Manejo de errores
- [ ] Preview de archivos

### 5.3 Hook de Clonación de Voz

**`src/hooks/useVoiceClone.ts`**
- [ ] Iniciar clonación
- [ ] Polling de estado
- [ ] Manejo de errores
- [ ] Callbacks de éxito/error

---

## Fase 6: Utilidades

### 6.1 Generación de System Prompt

**`src/lib/memory-utils.ts`**
```typescript
export function generateSystemPrompt(memory: MemoryFormData): string {
  // Generar prompt basado en:
  // - name, relationship, description
  // - personalityTraits
  // - favoriteMemories
}
```

### 6.2 Validación

**`src/lib/memory-utils.ts`**
```typescript
export function validateMemoryData(data: Partial<MemoryFormData>): ValidationResult {
  // Validar cada paso
  // Retornar errores específicos
}
```

---

## Orden de Implementación Recomendado

### Semana 1: Fundación
1. ✅ Crear estructura de carpetas
2. ✅ Configurar tipos TypeScript
3. ✅ Crear componentes UI base (Textarea, FileUpload, ProgressBar)
4. ✅ Implementar API de upload (imagen y audio)

### Semana 2: Formulario Base
5. ✅ Crear ProgressIndicator
6. ✅ Implementar Step1PersonInfo
7. ✅ Implementar Step2PhotoUpload
8. ✅ Crear hook useMemoryForm básico

### Semana 3: Voz y Personalización
9. ✅ Implementar Step3VoiceUpload
10. ✅ Implementar API de clonación de voz
11. ✅ Implementar Step4Memories
12. ✅ Crear hook useVoiceClone

### Semana 4: Finalización
13. ✅ Implementar Step5Review
14. ✅ Crear CreateMemoryWizard
15. ✅ Implementar generación de system prompt
16. ✅ Integrar con Anam.ai para crear avatar

### Semana 5: Pulido
17. ✅ Implementar guardado automático
18. ✅ Manejo de errores completo
19. ✅ Validaciones en todos los pasos
20. ✅ Testing y ajustes finales

---

## Consideraciones Técnicas

### Autenticación
- Todas las rutas protegidas con Clerk
- Verificar `userId` en todas las operaciones
- Middleware ya configurado ✅

### Validación
- Validación en cliente (UX inmediata)
- Validación en servidor (seguridad)
- Mensajes de error empáticos

### Manejo de Estado
- Zustand para estado global (si es necesario)
- React Hook Form para formularios
- localStorage para drafts

### Procesamiento Asíncrono
- Clonación de voz: procesamiento en background
- Creación de avatar: procesamiento en background
- Polling o webhooks para estado

### Optimización
- Lazy loading de componentes pesados
- Optimización de imágenes con Next.js Image
- Compresión de audio antes de subir

### Accesibilidad
- Labels descriptivos
- Mensajes de error claros
- Navegación por teclado
- ARIA labels donde sea necesario

---

## Dependencias Adicionales Necesarias

```json
{
  "react-hook-form": "^7.x",        // Para formularios
  "@hookform/resolvers": "^3.x",    // Resolvers de validación
  "zod": "^3.x",                    // Validación de esquemas
  "@vercel/blob": "^2.0.0"          // Ya existe ✅
}
```

---

## Variables de Entorno Necesarias

```env
# Ya configuradas
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ANAM_API_KEY=
ELEVENLABS_API_KEY=
BLOB_READ_WRITE_TOKEN=
```

---

## Testing Checklist

- [ ] Validación de cada paso del formulario
- [ ] Subida de archivos (imagen y audio)
- [ ] Clonación de voz exitosa
- [ ] Creación de avatar en Anam.ai
- [ ] Generación correcta de system prompt
- [ ] Guardado y carga de drafts
- [ ] Manejo de errores en cada paso
- [ ] Responsive design
- [ ] Accesibilidad básica

---

## Notas Importantes

1. **Procesamiento Asíncrono**: La clonación de voz y creación de avatar pueden tardar. Considerar:
   - Guardar memoria como "draft" inicialmente
   - Procesar en background
   - Notificar cuando esté listo

2. **Guardado Automático**: Implementar guardado en localStorage cada vez que el usuario avanza de paso.

3. **Validación Empática**: Los mensajes de error deben ser amigables y ayudar al usuario, no solo indicar el problema.

4. **Progreso Visual**: El usuario debe saber siempre en qué paso está y cuánto falta.

5. **Cancelación**: Permitir al usuario salir y continuar después sin perder progreso.

---

**Última actualización**: Basado en estructura actual del proyecto  
**Versión**: 1.0.0

