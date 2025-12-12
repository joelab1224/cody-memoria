# Flujo de Conversación y Esquema de Base de Datos - Cody Memoria Agent

## Descripción del Sistema

Cody Memoria Agent es un agente conversacional empático diseñado para entrevistar naturalmente a miembros de la familia mediante voz, preservando sus historias, sabiduría y recuerdos para futuras generaciones. El sistema guía a los usuarios a través de conversaciones temáticas, utilizando seguimientos inteligentes y contextuales para explorar detalles interesantes, similar a un entrevistador experto.

---

## Flujo de Conversación

### Fase 1: Inicio y Bienvenida

**Objetivo**: Establecer confianza y explicar el propósito de la entrevista.

```
Agente: "Hola [Nombre del familiar]. Soy Cody, tu asistente de memoria. 
        Estoy aquí para ayudarte a preservar tus historias y recuerdos 
        más preciados. ¿Estás listo para comenzar esta conversación?"

Usuario: [Respuesta]

Agente: "Perfecto. Esta conversación será grabada y transcrita para que 
        tus seres queridos puedan acceder a estos recuerdos en el futuro. 
        Puedes hablar con total naturalidad, como si estuviéramos 
        conversando en persona. ¿Hay algún tema en particular que te 
        gustaría compartir hoy?"
```

### Fase 2: Selección de Tema

**Objetivo**: Identificar el tema o período de vida que el familiar desea explorar.

```
Agente: "Podemos explorar diferentes temas. Por ejemplo:
        - Tu infancia y primeros recuerdos
        - Tu juventud y experiencias formativas
        - Tu vida profesional o vocación
        - Relaciones familiares importantes
        - Momentos históricos que viviste
        - Lecciones de vida y sabiduría
        - Tradiciones familiares
        - ¿Cuál te gustaría compartir hoy?"

Usuario: [Selecciona un tema]

Agente: "Excelente elección. Me encantaría escuchar sobre [tema seleccionado]. 
        ¿Podrías contarme cuándo comenzó esta etapa de tu vida?"
```

### Fase 3: Exploración Profunda

**Objetivo**: Hacer preguntas de seguimiento inteligentes basadas en el contexto.

#### 3.1 Preguntas Abiertas Iniciales

```
Agente: "Cuéntame más sobre [tema]. ¿Qué recuerdas más vívidamente?"

Usuario: [Comparte recuerdos]

Agente: [Analiza la respuesta y hace seguimiento contextual]
        "Eso suena fascinante. Me mencionaste [detalle específico]. 
        ¿Podrías contarme más sobre cómo te sentiste en ese momento?"
```

#### 3.2 Preguntas de Profundización

El agente utiliza diferentes tipos de preguntas según el contexto:

**Preguntas de Emoción**:
- "¿Cómo te sentiste cuando [evento]?"
- "¿Qué emociones experimentaste?"
- "¿Qué significó eso para ti?"

**Preguntas de Detalle**:
- "¿Puedes describir [persona/lugar/evento] con más detalle?"
- "¿Quién más estaba involucrado?"
- "¿Dónde ocurrió esto exactamente?"

**Preguntas de Contexto Temporal**:
- "¿Qué edad tenías cuando esto sucedió?"
- "¿En qué año fue esto?"
- "¿Qué estaba pasando en el mundo en ese momento?"

**Preguntas de Reflexión**:
- "¿Qué aprendiste de esa experiencia?"
- "¿Cómo cambió eso tu perspectiva?"
- "¿Qué consejo le darías a alguien que pasa por algo similar?"

#### 3.3 Transiciones Naturales

```
Agente: "Esa es una historia increíble. Me pregunto si hay alguna 
        historia relacionada que te gustaría compartir, o si prefieres 
        que exploremos otro aspecto de [tema]."

Usuario: [Responde]

Agente: [Adapta la conversación según la respuesta]
```

### Fase 4: Captura de Detalles Específicos

**Objetivo**: Obtener información estructurada para mejor organización.

```
Agente: "Antes de continuar, me gustaría capturar algunos detalles 
        importantes. ¿Podrías ayudarme a identificar:
        - ¿Quiénes son las personas clave en esta historia?
        - ¿En qué lugar(s) ocurrió esto?
        - ¿Aproximadamente en qué período de tiempo?
        - ¿Hay algún objeto o fotografía relacionada con este recuerdo?"

Usuario: [Proporciona información]

Agente: "Perfecto, he registrado esa información. ¿Hay algo más que 
        te gustaría agregar sobre este tema?"
```

### Fase 5: Transición entre Temas

**Objetivo**: Explorar múltiples temas en una sesión o preparar para futuras sesiones.

```
Agente: "Hemos cubierto bastante sobre [tema actual]. ¿Te gustaría 
        explorar otro tema hoy, o prefieres continuar profundizando 
        en este?"

Usuario: [Responde]

Si elige nuevo tema:
Agente: "Excelente. ¿Qué tema te gustaría explorar ahora?"

Si elige continuar:
Agente: "Perfecto. ¿Hay algún aspecto de [tema] que no hayamos 
        cubierto y que te gustaría compartir?"
```

### Fase 6: Cierre y Resumen

**Objetivo**: Resumir lo compartido y preparar para futuras sesiones.

```
Agente: "Hemos tenido una conversación maravillosa. Has compartido 
        historias sobre [temas cubiertos]. 

        [Resumen breve de puntos clave]

        ¿Hay algo más que te gustaría agregar antes de terminar?"

Usuario: [Respuesta final]

Agente: "Gracias por compartir tus recuerdos conmigo. Estos momentos 
        quedarán preservados para que tus seres queridos puedan 
        conocerlos y apreciarlos. ¿Te gustaría programar otra sesión 
        para continuar explorando más historias?"

Usuario: [Responde]

Agente: "Perfecto. Hasta entonces, [Nombre]. Ha sido un placer 
        conversar contigo."
```

---

## Campos de Base de Datos para el Modelo Memory

### Modelo Memory (Actualizado)

El modelo `Memory` debe almacenar información sobre las historias y recuerdos capturados durante las entrevistas. Aquí están los campos necesarios:

```prisma
model Memory {
  id                String   @id @default(cuid())
  userId            String
  intervieweeName   String   // Nombre de la persona entrevistada
  intervieweeRelationship String // Relación con el usuario (abuelo, tía, etc.)
  intervieweeBirthDate DateTime? // Fecha de nacimiento (opcional)
  intervieweeBirthPlace String? // Lugar de nacimiento (opcional)
  
  // Metadatos de la entrevista
  title             String   // Título descriptivo de la memoria/sesión
  description       String?  @db.Text // Descripción general
  interviewDate     DateTime @default(now()) // Fecha de la entrevista
  duration          Int?     // Duración en segundos
  
  // Organización temática
  themes            String[] // Temas principales (infancia, juventud, trabajo, etc.)
  topics            String[] // Tópicos específicos dentro de los temas
  timePeriod        String?  // Período de tiempo (ej: "Década de 1950")
  locations         String[] // Lugares mencionados
  
  // Personas involucradas
  peopleMentioned   String[] // Nombres de personas mencionadas en la historia
  
  // Contenido
  transcription     String?  @db.Text // Transcripción completa de la conversación
  summary           String?  @db.Text // Resumen generado por IA
  keyMoments        String[] // Momentos clave extraídos
  wisdomQuotes      String[] // Frases de sabiduría o consejos destacados
  
  // Archivos multimedia
  audioUrl          String?  // URL del audio completo de la entrevista
  audioDuration     Int?     // Duración del audio en segundos
  
  // Metadatos de procesamiento
  transcriptionStatus String @default("pending") // pending, processing, completed, failed
  processingStatus    String @default("pending") // pending, processing, completed, failed
  language            String @default("es") // Idioma de la entrevista
  
  // Organización y búsqueda
  tags               String[] // Tags personalizados para búsqueda
  isFavorite         Boolean  @default(false) // Marcar como favorito
  isPrivate          Boolean  @default(false) // Control de privacidad
  
  // Timestamps
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  
  // Relaciones
  user               User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  segments           MemorySegment[] // Segmentos de la conversación
  attachments        MemoryAttachment[] // Archivos adjuntos (fotos, documentos)
  
  @@index([userId])
  @@index([themes])
  @@index([interviewDate])
  @@index([intervieweeName])
}
```

### Modelo MemorySegment (Nuevo)

Para organizar la conversación en segmentos temáticos:

```prisma
model MemorySegment {
  id                String   @id @default(cuid())
  memoryId          String
  segmentIndex      Int      // Orden del segmento en la conversación
  startTime         Int?     // Tiempo de inicio en segundos (si hay audio)
  endTime           Int?     // Tiempo de fin en segundos
  
  // Contenido del segmento
  theme             String?  // Tema del segmento
  topic             String?  // Tópico específico
  transcription     String   @db.Text // Transcripción del segmento
  summary           String?  @db.Text // Resumen del segmento
  
  // Metadatos
  speaker           String   @default("interviewee") // interviewee o interviewer
  emotionalTone     String?  // Tono emocional detectado
  keyPoints         String[] // Puntos clave del segmento
  
  // Timestamps
  createdAt         DateTime @default(now())
  
  // Relaciones
  memory            Memory   @relation(fields: [memoryId], references: [id], onDelete: Cascade)
  
  @@index([memoryId])
  @@index([theme])
}
```

### Modelo MemoryAttachment (Nuevo)

Para archivos relacionados con la memoria:

```prisma
model MemoryAttachment {
  id                String   @id @default(cuid())
  memoryId          String
  type              String   // 'photo', 'document', 'audio_clip', 'video'
  filename          String
  url               String
  size              Int      // Tamaño en bytes
  mimeType          String
  
  // Metadatos
  description       String?  // Descripción del archivo
  capturedDate      DateTime? // Fecha en que fue capturado el archivo (si es foto antigua)
  location          String?  // Lugar donde fue capturado
  
  // Relación con segmentos
  relatedSegmentId  String?  // Segmento relacionado si aplica
  
  // Timestamps
  createdAt         DateTime @default(now())
  
  // Relaciones
  memory            Memory   @relation(fields: [memoryId], references: [id], onDelete: Cascade)
  
  @@index([memoryId])
  @@index([type])
}
```

### Modelo InterviewSession (Nuevo)

Para rastrear sesiones de entrevista individuales:

```prisma
model InterviewSession {
  id                String   @id @default(cuid())
  userId            String
  memoryId          String?  // Puede ser null si la sesión aún no está asociada
  
  // Información de la sesión
  sessionNumber     Int      // Número de sesión con este entrevistado
  startTime         DateTime @default(now())
  endTime           DateTime?
  duration          Int?     // Duración en segundos
  
  // Estado
  status            String   @default("active") // active, completed, paused, cancelled
  quality           String?  // good, fair, poor (evaluación de calidad del audio/contenido)
  
  // Metadatos
  device            String?  // Dispositivo usado para la entrevista
  audioQuality      String?  // Calidad del audio capturado
  
  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relaciones
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  memory            Memory?  @relation(fields: [memoryId], references: [id], onDelete: SetNull)
  messages          InterviewMessage[] // Mensajes de la sesión
  
  @@index([userId])
  @@index([memoryId])
  @@index([startTime])
}
```

### Modelo InterviewMessage (Nuevo)

Para almacenar los mensajes individuales de la conversación:

```prisma
model InterviewMessage {
  id                String   @id @default(cuid())
  sessionId         String
  
  // Contenido
  role              String   // 'user' (entrevistado), 'assistant' (Cody), 'system'
  content           String   @db.Text // Contenido del mensaje
  audioUrl          String?  // URL del audio si es mensaje de voz
  
  // Metadatos
  timestamp         DateTime @default(now())
  sequenceNumber    Int      // Orden en la conversación
  
  // Procesamiento
  transcription     String?  @db.Text // Transcripción si es audio
  sentiment         String?  // Sentimiento detectado
  intent            String?  // Intención detectada
  
  // Relaciones
  session           InterviewSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  
  @@index([sessionId])
  @@index([timestamp])
}
```

### Actualización del Modelo User

El modelo `User` necesita una relación adicional:

```prisma
model User {
  // ... campos existentes ...
  
  memories          Memory[]
  interviewSessions InterviewSession[] // Nueva relación
}
```

---

## Índices Recomendados

Para optimizar las búsquedas y consultas:

```prisma
// En Memory
@@index([userId, interviewDate]) // Búsquedas por usuario y fecha
@@index([themes, topics]) // Búsquedas temáticas
@@fulltext([transcription, summary]) // Búsqueda de texto completo (si PostgreSQL lo soporta)

// En MemorySegment
@@index([memoryId, segmentIndex]) // Ordenar segmentos
@@fulltext([transcription]) // Búsqueda en segmentos

// En InterviewMessage
@@index([sessionId, sequenceNumber]) // Ordenar mensajes
```

---

## Consideraciones Adicionales

### 1. Búsqueda y Filtrado

Los campos `themes`, `topics`, `tags`, y `peopleMentioned` permiten:
- Filtrar por tema o tópico
- Buscar personas específicas
- Organizar por períodos de tiempo
- Encontrar ubicaciones mencionadas

### 2. Privacidad

El campo `isPrivate` permite controlar qué memorias son visibles para otros usuarios (si se implementa compartir).

### 3. Procesamiento Asíncrono

Los campos `transcriptionStatus` y `processingStatus` permiten rastrear el estado del procesamiento de audio y transcripción.

### 4. Escalabilidad

- Los arrays (`String[]`) permiten múltiples valores sin crear tablas adicionales
- Los índices mejoran el rendimiento de búsquedas
- La separación en segmentos permite cargar conversaciones grandes de forma incremental

### 5. Integración con IA

Los campos `summary`, `keyMoments`, `wisdomQuotes`, y `emotionalTone` pueden ser generados por IA para mejorar la organización y búsqueda.

---

## Flujo de Datos

1. **Inicio de Sesión**: Se crea un `InterviewSession`
2. **Conversación**: Cada mensaje se guarda como `InterviewMessage`
3. **Finalización**: Se crea un `Memory` con la transcripción completa
4. **Procesamiento**: Se generan `MemorySegment[]` organizados por tema
5. **Enriquecimiento**: Se extraen metadatos (personas, lugares, fechas)
6. **Almacenamiento**: Se guardan archivos como `MemoryAttachment[]`

---

## Notas de Implementación

- Los campos de tipo `String[]` en Prisma se almacenan como arrays en PostgreSQL
- Para búsqueda de texto completo, considerar usar `pg_trgm` extension de PostgreSQL
- Los campos opcionales (`?`) permiten flexibilidad durante la captura
- Los timestamps automáticos facilitan el ordenamiento cronológico
- Las relaciones con `onDelete: Cascade` aseguran la integridad referencial

