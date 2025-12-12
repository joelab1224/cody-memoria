# Experiencia Conversacional de Perfilamiento - Guía Visual

## Visión General

Esta guía describe cómo crear una experiencia envolvente y conversacional para el perfilamiento de memorias, utilizando todos los componentes del sistema de diseño "Gentle Memories". La experiencia se siente como una conversación íntima y cálida, guiando al usuario paso a paso mientras preserva recuerdos preciosos.

---

## 🎭 Escenario: El Espacio de Creación

### Ambiente Visual

El usuario entra a un espacio que se siente como un **salón acogedor** con:

- **Fondo**: Gradiente suave `linear-gradient(135deg, #F7F5F3 0%, #E8D5B7 50%, #7A8A76 100%)`
- **Partículas flotantes**: Pequeños puntos dorados (`#B8952F`) que flotan suavemente, creando un ambiente mágico
- **Iluminación suave**: Todo se siente cálido, no estéril ni técnico

### Componente Principal: El Contenedor

```tsx
<Glass 
  animate="breathe" 
  intensity="medium"
  className="max-w-4xl mx-auto p-12"
>
  {/* Contenido del wizard */}
</Glass>
```

El contenedor principal "respira" suavemente, creando una sensación de vida y calidez.

---

## 📍 Paso 1: Conocer a la Persona

### Entrada al Paso

**Animación de entrada:**
- El Card aparece con un fade-in suave (800ms)
- Los elementos internos aparecen con un stagger (delay escalonado)

### Estructura Visual

```tsx
<Card variant="flow" animate="breathe" animationDelay={0}>
  {/* Mensaje de bienvenida empático */}
  <div className="text-center mb-8">
    <Avatar 
      variant="profile" 
      size="lg" 
      animation="shimmer"
      className="mx-auto mb-4"
    />
    <h1 className="text-3xl font-medium text-[#3A4B39] mb-2">
      Cada historia comienza con una persona
    </h1>
    <p className="text-lg text-[#7A8A76] font-light">
      Cuéntanos sobre esa persona especial que quieres preservar
    </p>
  </div>

  {/* Formulario con efecto glass */}
  <Glass intensity="light" className="p-8 space-y-6">
    <div>
      <label className="block text-sm font-medium text-[#3A4B39] mb-2">
        Nombre de la persona
      </label>
      <Input 
        variant="glass"
        placeholder="Ej: María García, Abuelo José..."
        className="w-full"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-[#3A4B39] mb-2">
        Tu relación con esta persona
      </label>
      <Input 
        variant="glass"
        placeholder="Ej: Mi abuela materna, Mi padre..."
        className="w-full"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-[#3A4B39] mb-2">
        Cuéntanos sobre ella (opcional)
      </label>
      <Textarea 
        variant="glass"
        placeholder="¿Qué la hace especial? ¿Qué recuerdas más de ella?"
        rows={4}
        className="w-full"
      />
      <p className="text-xs text-[#7A8A76] mt-2 font-light">
        No te preocupes por ser perfecto. Escribe desde el corazón.
      </p>
    </div>
  </Glass>

  {/* Botón de continuar */}
  <div className="mt-8 flex justify-end">
    <Button 
      variant="primary" 
      size="lg"
      rightIcon={<ArrowRightIcon />}
      className="min-w-[200px]"
    >
      Continuar
    </Button>
  </div>
</Card>
```

### Interacciones Conversacionales

**Mientras el usuario escribe:**
- Los inputs tienen un efecto glass que se intensifica al hacer focus
- Mensajes de ayuda aparecen suavemente debajo de cada campo
- El botón "Continuar" se activa cuando los campos requeridos están completos

**Validación empática:**
- Si falta información, aparece un mensaje en un Card pequeño con animación suave:
  ```tsx
  <Glass intensity="light" className="p-4 mt-4 border-l-4 border-[#B8952F]">
    <p className="text-sm text-[#5A6B59]">
      💡 Por favor, comparte el nombre de la persona que quieres preservar.
    </p>
  </Glass>
  ```

### Transición al Siguiente Paso

Cuando el usuario hace clic en "Continuar":
1. El Card actual hace fade-out (400ms)
2. El nuevo paso hace fade-in (600ms)
3. El ProgressIndicator se actualiza suavemente
4. Un mensaje de confirmación aparece brevemente: "¡Perfecto! Ya conocemos a [Nombre]"

---

## 📸 Paso 2: Capturar su Esencia Visual

### Entrada al Paso

**Mensaje de transición:**
```tsx
<Card variant="flow" animate="breathe">
  <div className="text-center mb-8">
    <h2 className="text-2xl font-medium text-[#3A4B39] mb-4">
      Una imagen vale más que mil palabras
    </h2>
    <p className="text-lg text-[#7A8A76] font-light">
      Comparte una foto que capture su esencia
    </p>
  </div>
</Card>
```

### Zona de Subida de Foto

```tsx
<Glass intensity="medium" className="p-12">
  {/* Área de drag & drop */}
  <div className="border-2 border-dashed border-[rgba(122,138,118,0.3)] 
                  rounded-2xl p-16 text-center 
                  hover:border-[#B8952F] transition-all duration-300
                  hover:bg-[rgba(247,245,243,0.4)]">
    
    {/* Icono de cámara con animación */}
    <div className="mb-6">
      <div className="w-24 h-24 mx-auto rounded-full 
                      bg-gradient-to-br from-[#E6B8A2] to-[#B8952F]
                      flex items-center justify-center
                      animate-[pulse_2s_ease-in-out_infinite]">
        <CameraIcon className="w-12 h-12 text-[#F7F5F3]" />
      </div>
    </div>

    <h3 className="text-xl font-medium text-[#3A4B39] mb-2">
      Arrastra una foto aquí
    </h3>
    <p className="text-sm text-[#7A8A76] mb-4">
      o haz clic para seleccionar
    </p>
    <p className="text-xs text-[#7A8A76] font-light">
      JPG, PNG o WebP • Máximo 10 MB
    </p>

    <Button variant="secondary" size="default" className="mt-6">
      Seleccionar archivo
    </Button>
  </div>

  {/* Preview de foto (cuando se sube) */}
  {photoPreview && (
    <Glass intensity="light" className="mt-8 p-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img 
            src={photoPreview} 
            alt="Preview" 
            className="w-32 h-32 rounded-2xl object-cover
                       shadow-[0_10px_30px_rgba(122,138,118,0.15)]"
          />
          <div className="absolute inset-0 rounded-2xl 
                          bg-gradient-to-t from-[rgba(122,138,118,0.2)] to-transparent" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#3A4B39] mb-1">
            Foto seleccionada
          </p>
          <p className="text-xs text-[#7A8A76] mb-4">
            Puedes cambiarla si lo deseas
          </p>
          <Button variant="ghost" size="sm">
            Cambiar foto
          </Button>
        </div>
      </div>
    </Glass>
  )}
</Glass>
```

### Estados de Interacción

**Durante la subida:**
- Barra de progreso animada con colores del gradiente
- Mensaje: "Subiendo tu foto... Esto solo tomará un momento"

**Después de subir:**
- La foto aparece con un efecto shimmer
- Mensaje de confirmación: "¡Hermosa foto! Esta imagen ayudará a crear un avatar que capture su esencia."

---

## 🎤 Paso 3: Preservar su Voz

### Entrada al Paso

**Mensaje más emotivo:**
```tsx
<Card variant="flow" animate="breathe">
  <div className="text-center mb-8">
    <Avatar 
      variant="voice" 
      size="voice" 
      animation="pulse"
      className="mx-auto mb-6"
    />
    <h2 className="text-2xl font-medium text-[#3A4B39] mb-4">
      La voz de una persona es única e irreemplazable
    </h2>
    <p className="text-lg text-[#7A8A76] font-light max-w-2xl mx-auto">
      Es el sonido que recordamos, el tono que nos reconforta, 
      las palabras que nos acompañan.
    </p>
  </div>
</Card>
```

### Zona de Subida de Audio

```tsx
<Glass intensity="medium" className="p-12">
  {/* Área de subida similar a foto pero con icono de micrófono */}
  <div className="border-2 border-dashed border-[rgba(122,138,118,0.3)] 
                  rounded-2xl p-16 text-center">
    
    {/* Avatar grande con animación de pulso */}
    <Avatar 
      variant="voice" 
      size="voice" 
      animation="pulse"
      className="mx-auto mb-6"
    />

    <h3 className="text-xl font-medium text-[#3A4B39] mb-2">
      Comparte una grabación de su voz
    </h3>
    <p className="text-sm text-[#7A8A76] mb-4">
      Mínimo 1 minuto recomendado para mejor calidad
    </p>

    <Button variant="secondary" size="lg" leftIcon={<MicIcon />}>
      Seleccionar audio
    </Button>
  </div>

  {/* Preview de audio con reproductor */}
  {audioPreview && (
    <Glass intensity="light" className="mt-8 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#3A4B39]">
              Audio seleccionado
            </p>
            <p className="text-xs text-[#7A8A76]">
              Duración: {audioDuration}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            Cambiar
          </Button>
        </div>

        {/* Reproductor de audio estilizado */}
        <div className="flex items-center gap-4">
          <Button variant="voiceSecondary" size="voice">
            <PlayIcon />
          </Button>
          <div className="flex-1">
            <div className="h-2 bg-[rgba(122,138,118,0.1)] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7A8A76] to-[#B8952F] 
                            rounded-full w-0 transition-all duration-300" 
                   style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Indicador de calidad */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#B8952F] animate-pulse" />
          <p className="text-xs text-[#7A8A76]">
            Calidad: {qualityIndicator}
          </p>
        </div>
      </div>
    </Glass>
  )}
</Glass>
```

### Proceso de Clonación

**Cuando el usuario continúa:**
```tsx
<Glass intensity="medium" className="p-12">
  <div className="text-center space-y-6">
    <Avatar 
      variant="voice" 
      size="voice" 
      animation="pulse"
      className="mx-auto"
    />
    <h3 className="text-xl font-medium text-[#3A4B39]">
      Clonando voz...
    </h3>
    <p className="text-sm text-[#7A8A76]">
      Esto puede tomar 2-5 minutos. No cierres esta ventana.
    </p>
    
    {/* Barra de progreso animada */}
    <div className="max-w-md mx-auto">
      <ProgressBar 
        value={cloningProgress} 
        className="h-2"
      />
    </div>

    {/* Mensaje de apoyo */}
    <p className="text-xs text-[#7A8A76] font-light italic">
      Estamos preservando su voz única...
    </p>
  </div>
</Glass>
```

**Cuando completa:**
- Animación de éxito con confeti sutil
- Mensaje: "¡Voz clonada exitosamente! Su voz única ha sido preservada."

---

## 💭 Paso 4: Compartir sus Historias

### Entrada al Paso

```tsx
<Card variant="flow" animate="breathe">
  <div className="text-center mb-8">
    <h2 className="text-2xl font-medium text-[#3A4B39] mb-4">
      Las historias son lo que realmente definen a una persona
    </h2>
    <p className="text-lg text-[#7A8A76] font-light">
      Comparte esos recuerdos especiales que quieres preservar
    </p>
  </div>
</Card>
```

### Formulario de Historias

```tsx
<Glass intensity="medium" className="p-12 space-y-8">
  {/* Recuerdos favoritos - Input múltiple */}
  <div>
    <label className="block text-sm font-medium text-[#3A4B39] mb-4">
      Recuerdos favoritos
    </label>
    <p className="text-xs text-[#7A8A76] mb-4 font-light">
      Historias, anécdotas o momentos especiales (puedes agregar varios)
    </p>
    
    <div className="space-y-3">
      {memories.map((memory, index) => (
        <Glass 
          key={index} 
          intensity="light" 
          className="p-4 flex items-center gap-4"
          animate="breathe"
          animationDelay={index * 0.1}
        >
          <div className="flex-1">
            <Input 
              variant="glass"
              placeholder="Ej: Cuando nos llevó a pescar por primera vez..."
              value={memory}
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => removeMemory(index)}
          >
            <XIcon />
          </Button>
        </Glass>
      ))}
    </div>

    <Button 
      variant="outline" 
      size="sm"
      leftIcon={<PlusIcon />}
      onClick={addMemory}
      className="mt-4"
    >
      Agregar otro recuerdo
    </Button>
  </div>

  {/* Rasgos de personalidad - Selector múltiple */}
  <div>
    <label className="block text-sm font-medium text-[#3A4B39] mb-4">
      Rasgos de personalidad
    </label>
    <p className="text-xs text-[#7A8A76] mb-4 font-light">
      Selecciona 3-7 rasgos que la definían
    </p>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {personalityTraits.map((trait) => (
        <Button
          key={trait.id}
          variant={selectedTraits.includes(trait.id) ? "primary" : "outline"}
          size="default"
          onClick={() => toggleTrait(trait.id)}
          className="justify-start"
        >
          {trait.label}
        </Button>
      ))}
    </div>
  </div>

  {/* Información adicional opcional */}
  <div>
    <label className="block text-sm font-medium text-[#3A4B39] mb-2">
      Información adicional (opcional)
    </label>
    <Textarea 
      variant="glass"
      placeholder="Pasatiempos, valores, frases características..."
      rows={4}
    />
  </div>
</Glass>
```

### Interacciones

- Cada recuerdo agregado aparece con animación fade-in
- Los botones de rasgos cambian de outline a primary con transición suave
- Mensajes de ayuda aparecen cuando hay pocos elementos

---

## ✨ Paso 5: Personalización Final

### Vista de Revisión

```tsx
<Card variant="flow" animate="breathe">
  <div className="text-center mb-8">
    <h2 className="text-2xl font-medium text-[#3A4B39] mb-4">
      Estás a punto de crear algo muy especial
    </h2>
    <p className="text-lg text-[#7A8A76] font-light">
      Revisemos juntos toda la información que has compartido
    </p>
  </div>
</Card>

{/* Resumen visual */}
<div className="space-y-6">
  {/* Información básica */}
  <Glass intensity="light" className="p-6">
    <div className="flex items-start gap-6">
      <Avatar 
        variant="profile" 
        size="md"
        src={formData.avatarImageUrl}
        animation="shimmer"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium text-[#3A4B39] mb-2">
          {formData.name}
        </h3>
        <p className="text-sm text-[#7A8A76] mb-2">
          {formData.relationship}
        </p>
        <p className="text-sm text-[#5A6B59]">
          {formData.description}
        </p>
      </div>
      <Button variant="ghost" size="sm">
        Editar
      </Button>
    </div>
  </Glass>

  {/* Multimedia */}
  <Glass intensity="light" className="p-6">
    <h4 className="text-sm font-medium text-[#3A4B39] mb-4">
      Multimedia
    </h4>
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#B8952F] flex items-center justify-center">
          <CheckIcon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm text-[#5A6B59]">Foto subida</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#B8952F] flex items-center justify-center">
          <CheckIcon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm text-[#5A6B59]">Voz clonada</span>
      </div>
    </div>
  </Glass>

  {/* Historias y personalidad */}
  <Glass intensity="light" className="p-6">
    <h4 className="text-sm font-medium text-[#3A4B39] mb-4">
      Historias y Personalidad
    </h4>
    <div className="space-y-3">
      {formData.favoriteMemories.map((memory, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-[#B8952F] mt-2" />
          <p className="text-sm text-[#5A6B59] flex-1">{memory}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {formData.personalityTraits.map((trait) => (
        <span 
          key={trait}
          className="px-3 py-1 rounded-full text-xs 
                   bg-[rgba(122,138,118,0.1)] text-[#5A6B59]"
        >
          {trait}
        </span>
      ))}
    </div>
  </Glass>
</div>

{/* Botones de acción */}
<div className="flex gap-4 justify-end mt-8">
  <Button variant="outline" size="lg">
    Guardar como borrador
  </Button>
  <Button 
    variant="primary" 
    size="lg"
    loading={isProcessing}
    rightIcon={<SparklesIcon />}
  >
    Crear Memoria
  </Button>
</div>
```

### Procesamiento Final

**Durante el procesamiento:**
```tsx
<Glass intensity="medium" className="p-12">
  <div className="text-center space-y-6">
    <Avatar 
      variant="profile" 
      size="xl"
      src={formData.avatarImageUrl}
      animation="pulse"
      className="mx-auto"
    />
    
    <h3 className="text-xl font-medium text-[#3A4B39]">
      Creando tu memoria...
    </h3>
    
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-2">
        <CheckIcon className="w-5 h-5 text-[#B8952F]" />
        <span className="text-sm text-[#5A6B59]">Validando información</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <CheckIcon className="w-5 h-5 text-[#B8952F]" />
        <span className="text-sm text-[#5A6B59]">Procesando archivos</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <LoaderIcon className="w-5 h-5 text-[#7A8A76] animate-spin" />
        <span className="text-sm text-[#5A6B59]">Creando avatar</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <LoaderIcon className="w-5 h-5 text-[#7A8A76] animate-spin" />
        <span className="text-sm text-[#5A6B59]">Configurando personalidad</span>
      </div>
    </div>
  </div>
</Glass>
```

**Cuando completa:**
```tsx
<Card variant="profile" animate="breathe">
  <div className="text-center space-y-6">
    <Avatar 
      variant="profile" 
      size="xl"
      src={memory.avatarImageUrl}
      animation="shimmer"
      className="mx-auto"
    />
    
    <h2 className="text-3xl font-medium text-[#3A4B39]">
      ¡Tu memoria está lista!
    </h2>
    
    <p className="text-lg text-[#7A8A76]">
      Ahora puedes comenzar a conversar con {memory.name}
    </p>
    
    <div className="flex gap-4 justify-center">
      <Button variant="primary" size="lg">
        Iniciar Conversación
      </Button>
      <Button variant="secondary" size="lg">
        Ver Detalles
      </Button>
    </div>
  </div>
</Card>
```

---

## 🎨 Elementos de Diseño Conversacional

### 1. Indicador de Progreso

```tsx
<div className="flex items-center justify-center gap-2 mb-8">
  {[1, 2, 3, 4, 5].map((step) => (
    <div key={step} className="flex items-center">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        step < currentStep && "bg-[#B8952F] text-white",
        step === currentStep && "bg-[#7A8A76] text-white ring-4 ring-[rgba(122,138,118,0.2)]",
        step > currentStep && "bg-[rgba(122,138,118,0.1)] text-[#7A8A76]"
      )}>
        {step < currentStep ? <CheckIcon /> : step}
      </div>
      {step < 5 && (
        <div className={cn(
          "w-16 h-1 mx-2",
          step < currentStep ? "bg-[#B8952F]" : "bg-[rgba(122,138,118,0.1)]"
        )} />
      )}
    </div>
  ))}
</div>
```

### 2. Mensajes Empáticos

Cada paso tiene mensajes que:
- Reconocen la importancia emocional
- Guían sin presionar
- Validan las decisiones del usuario
- Usan lenguaje cálido y personal

### 3. Animaciones Orgánicas

- **Breathe**: Todos los Cards principales respiran suavemente
- **Shimmer**: Avatares tienen un brillo sutil
- **Pulse**: Elementos importantes pulsan suavemente
- **Stagger**: Elementos de lista aparecen con delay escalonado

### 4. Feedback Visual Inmediato

- Inputs cambian de color al hacer focus
- Botones muestran estado de carga
- Mensajes de error aparecen suavemente
- Confirmaciones con animaciones sutiles

---

## 🎯 Principios de la Experiencia

### 1. **No Presionar**
- El usuario puede guardar y continuar después
- Los campos opcionales están claramente marcados
- No hay límites de tiempo

### 2. **Validar y Apoyar**
- Mensajes positivos cuando completa un paso
- Sugerencias útiles, no críticas
- Ejemplos concretos para guiar

### 3. **Hacer Sentir Cómodo**
- Diseño cálido, no técnico
- Animaciones suaves, no distractoras
- Espacio para respirar visualmente

### 4. **Mostrar Progreso**
- Siempre claro dónde está el usuario
- Cuánto falta por completar
- Qué se ha logrado hasta ahora

### 5. **Celebrar los Logros**
- Confirmaciones cuando completa cada paso
- Animaciones de éxito sutiles
- Mensajes que reconocen el esfuerzo

---

## 📱 Responsive Design

En móviles:
- Cards se apilan verticalmente
- Inputs ocupan todo el ancho
- Botones son más grandes para touch
- Animaciones se mantienen pero más sutiles

---

## 🎬 Flujo Completo Visualizado

```
[Fondo con gradiente y partículas]
    ↓
[Glass Card principal con animación breathe]
    ↓
[Avatar con shimmer] + [Mensaje empático]
    ↓
[Formulario en Glass con inputs]
    ↓
[Botón primary con hover effect]
    ↓
[Transición suave al siguiente paso]
    ↓
[ProgressIndicator actualizado]
    ↓
[Repetir para cada paso]
    ↓
[Vista de revisión final]
    ↓
[Procesamiento con indicadores]
    ↓
[Pantalla de éxito con celebración]
```

---

## 💡 Tips de Implementación

1. **Usar delays escalonados** para crear ritmo:
   ```tsx
   animationDelay={index * 0.1}
   ```

2. **Combinar componentes** para crear profundidad:
   ```tsx
   <Glass>
     <Card>
       <Avatar />
     </Card>
   </Glass>
   ```

3. **Mantener consistencia** en animaciones:
   - Todas las transiciones: 300-800ms
   - Mismo easing: `cubic-bezier(0.23, 1, 0.320, 1)`

4. **Usar colores semánticamente**:
   - Sage para acciones principales
   - Gold para éxito/confirmación
   - Peach para elementos cálidos

5. **Espaciado generoso**:
   - Dejar que los elementos respiren
   - Usar el sistema de spacing del design tokens

---

**Esta experiencia transforma un formulario técnico en una conversación íntima y significativa, guiando al usuario mientras preserva recuerdos preciosos con empatía y calidez.**

