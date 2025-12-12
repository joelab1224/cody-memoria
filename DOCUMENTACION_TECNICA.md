# Documentación Técnica y Conceptual - Cody Memoria Agent

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Modelo de Datos](#modelo-de-datos)
5. [Integraciones Externas](#integraciones-externas)
6. [Flujos Principales](#flujos-principales)
7. [Conceptos Clave](#conceptos-clave)
8. [Arquitectura de Componentes](#arquitectura-de-componentes)
9. [Seguridad y Privacidad](#seguridad-y-privacidad)
10. [Consideraciones de Escalabilidad](#consideraciones-de-escalabilidad)

---

## Visión General

### Propósito

**Cody Memoria Agent** es un agente conversacional empático diseñado para preservar la historia familiar mediante entrevistas de voz naturales. El sistema aborda el problema crítico de la pérdida irreemplazable de historias familiares, permitiendo que las generaciones futuras accedan a los recuerdos, sabiduría y experiencias de sus seres queridos.

### Problema que Resuelve

- **Pérdida de historias familiares**: Muchas historias y recuerdos se pierden cuando los miembros mayores de la familia fallecen
- **Falta de documentación**: Las conversaciones casuales rara vez se documentan de manera estructurada
- **Barreras técnicas**: Las herramientas existentes requieren conocimientos técnicos avanzados
- **Falta de personalización**: Las soluciones genéricas no capturan la esencia única de cada persona

### Solución Propuesta

Un sistema que combina:
- **Entrevistas guiadas por IA**: Conversaciones naturales que exploran temas profundos
- **Clonación de voz**: Preservación del timbre y características vocales únicas
- **Avatares conversacionales**: Representaciones interactivas que permiten "conversar" con los recuerdos
- **Organización inteligente**: Categorización automática por temas, personas, lugares y períodos temporales

---

## Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    Cliente (Next.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   React UI   │  │  Zustand     │  │  Clerk Auth  │     │
│  │  Components  │  │  State Mgmt  │  │   Client     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js App Router (Backend)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  API Routes  │  │  Server      │  │  Middleware  │     │
│  │  /api/*      │  │  Components  │  │  (Auth)      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  PostgreSQL  │ │   Anam.ai    │ │ ElevenLabs   │ │ Vercel Blob  │
│   (Prisma)   │ │     API      │ │     API      │ │   Storage    │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

### Capas de la Aplicación

1. **Capa de Presentación (Frontend)**
   - Componentes React con Tailwind CSS
   - Shadcn/ui para componentes UI reutilizables
   - Zustand para gestión de estado del cliente
   - Clerk para autenticación del lado del cliente

2. **Capa de Aplicación (Backend)**
   - Next.js App Router con Server Components
   - API Routes para endpoints RESTful
   - Middleware para autenticación y autorización
   - Validación de datos y manejo de errores

3. **Capa de Datos**
   - PostgreSQL como base de datos relacional
   - Prisma ORM para abstracción de base de datos
   - Vercel Blob para almacenamiento de archivos

4. **Capa de Servicios Externos**
   - Anam.ai para avatares conversacionales
   - ElevenLabs para clonación y síntesis de voz
   - Clerk para autenticación y gestión de usuarios

---

## Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.0.9 | Framework React con App Router para SSR/SSG |
| **React** | 19.2.1 | Biblioteca UI declarativa |
| **TypeScript** | 5.x | Tipado estático para seguridad de tipos |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |
| **Shadcn/ui** | - | Componentes UI accesibles y personalizables |
| **Zustand** | 5.0.9 | Gestión de estado ligera |
| **Lucide React** | 0.560.0 | Iconos SVG |

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js API Routes** | 16.0.9 | Endpoints RESTful |
| **Prisma** | 6.0.0 | ORM y migraciones de base de datos |
| **PostgreSQL** | - | Base de datos relacional |
| **NextAuth.js** | 4.24.13 | Autenticación y autorización |
| **Clerk** | 6.36.2 | Autenticación como servicio |

### Servicios Externos

| Servicio | Propósito | Integración |
|----------|-----------|-------------|
| **Anam.ai** | Avatares conversacionales con IA | API REST |
| **ElevenLabs** | Clonación y síntesis de voz | API REST |
| **Vercel Blob** | Almacenamiento de archivos | SDK oficial |
| **Vercel** | Hosting y despliegue | Plataforma nativa |

### Herramientas de Desarrollo

- **ESLint**: Linting de código
- **TypeScript**: Verificación de tipos
- **Prisma Studio**: GUI para base de datos
- **PostCSS**: Procesamiento de CSS

---

## Modelo de Datos

### Esquema de Base de Datos

El sistema utiliza un esquema relacional basado en Prisma que organiza la información en las siguientes entidades principales:

#### 1. User (Usuario)

Representa a los usuarios del sistema que crean y gestionan memorias.

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  preferences   UserPreferences?
  memories      Memory[]
}
```

**Campos clave:**
- `id`: Identificador único (CUID)
- `email`: Email único para autenticación
- Relaciones con preferencias y memorias

#### 2. UserPreferences (Preferencias del Usuario)

Almacena las preferencias emocionales y objetivos del usuario para la creación de memorias.

```prisma
model UserPreferences {
  id                   String   @id @default(cuid())
  userId               String   @unique
  emotionalPreferences String[]
  objectives           String?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**Campos clave:**
- `emotionalPreferences`: Array de preferencias emocionales (ej: "nostalgia", "alegría")
- `objectives`: Objetivo del usuario para crear memorias

#### 3. Memory (Memoria)

Entidad central que representa a una persona y sus recuerdos preservados.

```prisma
model Memory {
  id               String   @id @default(cuid())
  userId           String
  name             String
  relationship     String
  description      String?
  personalityTraits String[]
  favoriteMemories String[]
  voiceCloneId     String?
  avatarImageUrl   String?
  anamAvatarId     String?
  systemPrompt     String   @db.Text
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  user          User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  conversations Conversation[]
  files         MemoryFile[]
}
```

**Campos clave:**
- `name`: Nombre de la persona representada
- `relationship`: Relación con el usuario (ej: "abuelo", "tía")
- `personalityTraits`: Array de rasgos de personalidad
- `voiceCloneId`: ID del clon de voz en ElevenLabs
- `anamAvatarId`: ID del avatar en Anam.ai
- `systemPrompt`: Prompt del sistema para el avatar conversacional

#### 4. Conversation (Conversación)

Representa una sesión de conversación con un avatar de memoria.

```prisma
model Conversation {
  id        String   @id @default(cuid())
  memoryId  String
  title     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  memory   Memory    @relation(fields: [memoryId], references: [id], onDelete: Cascade)
  messages Message[]
}
```

#### 5. Message (Mensaje)

Almacena mensajes individuales dentro de una conversación.

```prisma
model Message {
  id             String   @id @default(cuid())
  conversationId String
  role           String   // 'user' or 'assistant'
  content        String   @db.Text
  audioUrl       String?
  timestamp      DateTime @default(now())
  
  conversation Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
}
```

**Campos clave:**
- `role`: Rol del emisor ('user' o 'assistant')
- `content`: Contenido textual del mensaje
- `audioUrl`: URL opcional del audio generado

#### 6. MemoryFile (Archivo de Memoria)

Gestiona archivos multimedia asociados a una memoria.

```prisma
model MemoryFile {
  id        String   @id @default(cuid())
  memoryId  String
  type      String   // 'image' or 'audio'
  filename  String
  url       String
  size      Int
  mimeType  String
  createdAt DateTime @default(now())
  
  memory Memory @relation(fields: [memoryId], references: [id], onDelete: Cascade)
}
```

### Relaciones entre Entidades

```
User
  ├── UserPreferences (1:1)
  └── Memory (1:N)
        ├── Conversation (1:N)
        │     └── Message (1:N)
        └── MemoryFile (1:N)
```

### Índices y Optimizaciones

- Índice en `Memory.userId` para búsquedas rápidas por usuario
- Índice en `Conversation.memoryId` para cargar conversaciones
- Índice en `Message.conversationId` para ordenar mensajes
- Índice en `MemoryFile.memoryId` para listar archivos

---

## Integraciones Externas

### 1. Anam.ai - Avatares Conversacionales

**Propósito**: Crear avatares conversacionales con IA que representen a las personas en las memorias.

#### Cliente Implementado

```typescript
// src/lib/anam.ts
export class AnamClient {
  async createSessionToken(
    clientLabel: string,
    personaConfig: AnamPersonaConfig,
    sessionOptions?: AnamSessionOptions
  ): Promise<{ sessionToken: string }>
  
  async listAvatars()
  async listVoices()
}
```

#### Configuración de Persona

```typescript
interface AnamPersonaConfig {
  name: string;
  avatarId: string;        // ID del avatar visual
  voiceId: string;         // ID de la voz clonada
  brainType: 'ANAM_GPT_4O_MINI_V1' | 'ANAM_LLAMA_v3_3_70B_V1' | 'CUSTOMER_CLIENT_V1';
  systemPrompt: string;     // Prompt personalizado con información de la persona
  maxSessionLengthSeconds: number;
}
```

#### Flujo de Integración

1. **Creación de Avatar**: Usuario sube foto → Se crea avatar en Anam.ai
2. **Configuración de Voz**: Se asocia el `voiceCloneId` de ElevenLabs
3. **Generación de Prompt**: Se crea un prompt del sistema basado en:
   - Rasgos de personalidad
   - Recuerdos favoritos
   - Descripción de la persona
4. **Creación de Sesión**: Se genera un token de sesión para iniciar conversación
5. **Conversación**: El cliente se conecta usando el token para interactuar

### 2. ElevenLabs - Clonación y Síntesis de Voz

**Propósito**: Clonar voces a partir de muestras de audio y generar síntesis de voz.

#### Cliente Implementado

```typescript
// src/lib/elevenlabs.ts
export class ElevenLabsClient {
  async cloneVoice(
    name: string,
    audioFile: File,
    description?: string
  ): Promise<{ voice_id: string }>
  
  async generateSpeech(
    text: string,
    voiceId: string,
    modelId?: string
  ): Promise<ArrayBuffer>
  
  async getVoices()
  async deleteVoice(voiceId: string)
}
```

#### Flujo de Clonación

1. **Subida de Muestra**: Usuario sube archivo de audio (mínimo recomendado: 1 minuto)
2. **Validación**: Verificación de formato y calidad del audio
3. **Clonación**: Llamada a API de ElevenLabs para crear el clon
4. **Almacenamiento**: Se guarda el `voice_id` en la base de datos
5. **Síntesis**: Uso del `voice_id` para generar respuestas de voz

#### Modelos de Voz

- **Modelo por defecto**: `eleven_multilingual_v2`
- **Configuración de voz**:
  - `stability: 0.5` - Estabilidad de la voz
  - `similarity_boost: 0.75` - Similitud con la voz original

### 3. Vercel Blob - Almacenamiento de Archivos

**Propósito**: Almacenar imágenes y archivos de audio de forma segura y escalable.

#### Tipos de Archivos

- **Imágenes**: Fotos de la persona para avatares (JPG, PNG, WebP)
- **Audio**: Muestras de voz para clonación (MP3, WAV, M4A)

#### Características

- Almacenamiento distribuido globalmente
- URLs seguras con expiración opcional
- Integración nativa con Vercel
- Escalabilidad automática

### 4. Clerk - Autenticación

**Propósito**: Gestión completa de autenticación y autorización.

#### Características

- Autenticación con email/password
- OAuth (Google, etc.)
- Gestión de sesiones
- Middleware de protección de rutas

---

## Flujos Principales

### 1. Flujo de Registro y Onboarding

```
1. Usuario se registra → Clerk maneja autenticación
2. Redirección a onboarding
3. Usuario completa preferencias emocionales
4. Usuario establece objetivos para crear memorias
5. Guardado en UserPreferences
6. Redirección al dashboard
```

### 2. Flujo de Creación de Memoria

```
1. Usuario inicia creación de memoria
2. Paso 1: Información básica
   - Nombre de la persona
   - Relación
   - Descripción
3. Paso 2: Personalidad
   - Rasgos de personalidad (array)
   - Recuerdos favoritos (array)
4. Paso 3: Multimedia
   - Subida de foto (opcional) → Vercel Blob
   - Subida de muestra de voz → Vercel Blob
5. Paso 4: Procesamiento
   - Clonación de voz → ElevenLabs API
   - Creación de avatar → Anam.ai API
   - Generación de system prompt
6. Guardado en base de datos
7. Redirección a vista de memoria
```

### 3. Flujo de Conversación con Avatar

```
1. Usuario selecciona memoria
2. Clic en "Iniciar Conversación"
3. Sistema genera token de sesión → Anam.ai
4. Cliente se conecta con token
5. Usuario envía mensaje (texto o voz)
6. Sistema procesa con Anam.ai
7. Respuesta del avatar generada
8. Síntesis de voz → ElevenLabs (usando voiceCloneId)
9. Reproducción de audio al usuario
10. Guardado de mensajes en base de datos
11. Actualización de conversación
```

### 4. Flujo de Búsqueda y Exploración

```
1. Usuario accede al dashboard
2. Listado de memorias (filtrado por userId)
3. Opciones de filtrado:
   - Por nombre de persona
   - Por relación
   - Por fecha de creación
4. Búsqueda de texto en descripciones
5. Visualización de detalles de memoria
6. Acceso a conversaciones previas
```

---

## Conceptos Clave

### 1. System Prompt

El **system prompt** es un texto que define la personalidad, conocimiento y comportamiento del avatar conversacional. Se genera automáticamente basándose en:

- Nombre y relación de la persona
- Rasgos de personalidad
- Recuerdos favoritos
- Descripción general

**Ejemplo de estructura:**
```
Eres [Nombre], [relación] de [Usuario]. 
Tus rasgos de personalidad incluyen: [rasgos].
Algunos de tus recuerdos favoritos son: [recuerdos].
[Descripción adicional]

Responde de manera natural y empática, como si estuvieras 
conversando con un ser querido. Comparte historias y 
recuerdos cuando sea apropiado.
```

### 2. Voice Cloning

El proceso de **clonación de voz** permite recrear las características vocales únicas de una persona:

1. **Requisitos de muestra**:
   - Mínimo 1 minuto de audio claro
   - Preferiblemente sin ruido de fondo
   - Variedad de entonaciones

2. **Proceso técnico**:
   - ElevenLabs analiza patrones vocales
   - Crea un modelo de voz único
   - Genera un `voice_id` para síntesis futura

3. **Uso en conversaciones**:
   - Cada respuesta del avatar se sintetiza usando el clon
   - Mantiene consistencia vocal a lo largo del tiempo

### 3. Conversational Avatar

Un **avatar conversacional** combina:

- **Visual**: Imagen/foto de la persona (opcional)
- **Voz**: Clon de voz de ElevenLabs
- **Personalidad**: System prompt con información contextual
- **IA**: Modelo de lenguaje (GPT-4, Llama, etc.) para generar respuestas

### 4. Memory Organization

Las memorias se organizan mediante:

- **Relaciones**: Familiares, amigos, etc.
- **Rasgos de personalidad**: Para búsqueda semántica
- **Recuerdos favoritos**: Puntos de entrada para conversaciones
- **Conversaciones**: Historial de interacciones

---

## Arquitectura de Componentes

### Estructura de Directorios

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rutas de autenticación (grupo)
│   ├── dashboard/         # Dashboard principal
│   ├── memories/          # Gestión de memorias
│   │   ├── create/        # Flujo de creación
│   │   ├── [id]/          # Vista individual
│   │   └── chat/[id]/     # Interfaz de chat
│   └── api/               # API Routes
│       ├── memories/      # CRUD de memorias
│       ├── upload/        # Subida de archivos
│       ├── anam/          # Integración Anam.ai
│       └── elevenlabs/    # Integración ElevenLabs
├── components/            # Componentes React
│   ├── ui/               # Componentes Shadcn/ui
│   ├── memory/           # Componentes de memoria
│   └── chat/             # Componentes de chat
├── lib/                  # Utilidades y clientes
│   ├── auth.ts          # Configuración NextAuth
│   ├── db.ts            # Cliente Prisma
│   ├── anam.ts          # Cliente Anam.ai
│   ├── elevenlabs.ts    # Cliente ElevenLabs
│   └── utils.ts         # Utilidades generales
└── types/               # Definiciones TypeScript
    ├── anam.ts          # Tipos de Anam.ai
    └── index.ts         # Tipos generales
```

### Patrones de Diseño

#### 1. Server Components

Next.js 16 utiliza Server Components por defecto, permitiendo:
- Carga de datos directamente en componentes
- Menor JavaScript enviado al cliente
- Mejor rendimiento inicial

#### 2. API Routes

Endpoints RESTful organizados por dominio:
- `/api/memories/*` - Operaciones CRUD de memorias
- `/api/upload/*` - Gestión de archivos
- `/api/anam/*` - Proxy para Anam.ai
- `/api/elevenlabs/*` - Proxy para ElevenLabs

#### 3. Clientes de Servicio

Cada servicio externo tiene su propio cliente:
- Encapsulación de lógica de API
- Manejo centralizado de errores
- Reutilización en múltiples endpoints

---

## Seguridad y Privacidad

### Autenticación

- **Clerk**: Gestión completa de autenticación
- **NextAuth.js**: Alternativa con OAuth providers
- **JWT**: Tokens de sesión seguros
- **Middleware**: Protección de rutas en servidor

### Autorización

- **Ownership**: Los usuarios solo acceden a sus propias memorias
- **Validación**: Verificación de `userId` en todas las operaciones
- **Cascade Deletes**: Eliminación en cascada para integridad

### Protección de Datos

- **Encriptación en tránsito**: TLS 1.3
- **Encriptación en reposo**: Base de datos y almacenamiento
- **API Keys**: Almacenadas en variables de entorno
- **Validación de entrada**: Sanitización de datos del usuario

### Privacidad

- **Datos personales**: Solo almacenados con consentimiento
- **GDPR**: Cumplimiento con regulaciones europeas
- **Derecho al olvido**: Capacidad de eliminar todos los datos
- **Control de acceso**: Memorias privadas por defecto

---

## Consideraciones de Escalabilidad

### Base de Datos

- **Índices**: Optimización de consultas frecuentes
- **Paginación**: Para listados grandes de memorias/conversaciones
- **Conexiones**: Pool de conexiones con Prisma
- **Migraciones**: Versionado de esquema con Prisma Migrate

### Almacenamiento

- **Vercel Blob**: Escalado automático
- **CDN**: Distribución global de archivos
- **Límites de tamaño**: Validación antes de subida

### API Externa

- **Rate Limiting**: Control de llamadas a APIs externas
- **Caching**: Cacheo de respuestas cuando sea posible
- **Retry Logic**: Reintentos automáticos en fallos
- **Timeouts**: Límites de tiempo para evitar bloqueos

### Rendimiento

- **Server Components**: Renderizado en servidor
- **Code Splitting**: Carga diferida de componentes
- **Image Optimization**: Next.js Image component
- **Streaming**: Respuestas progresivas

---

## Próximos Pasos y Mejoras Futuras

### Funcionalidades Pendientes

1. **Sistema de Entrevistas Guiadas**
   - Implementación del flujo de entrevista documentado
   - Segmentación automática de conversaciones
   - Extracción de metadatos (personas, lugares, fechas)

2. **Búsqueda Avanzada**
   - Búsqueda de texto completo en transcripciones
   - Filtros por tema, período, ubicación
   - Búsqueda semántica con embeddings

3. **Procesamiento de Audio**
   - Transcripción automática de entrevistas
   - Análisis de sentimiento
   - Detección de temas clave

4. **Compartir y Colaboración**
   - Compartir memorias con familiares
   - Permisos granulares
   - Comentarios y anotaciones

### Mejoras Técnicas

1. **Testing**
   - Tests unitarios con Jest
   - Tests de integración
   - Tests E2E con Playwright

2. **Monitoreo**
   - Logging estructurado
   - Métricas de rendimiento
   - Alertas de errores

3. **Optimización**
   - Lazy loading de conversaciones
   - Compresión de audio
   - Optimización de imágenes

---

## Conclusión

Cody Memoria Agent representa una solución innovadora para la preservación de historias familiares, combinando tecnologías de IA conversacional, clonación de voz y gestión de datos de manera intuitiva y accesible. La arquitectura modular y escalable permite futuras expansiones mientras mantiene la simplicidad para los usuarios finales.

El sistema está diseñado para ser:
- **Empático**: Entiende la importancia emocional de los recuerdos
- **Técnicamente sólido**: Arquitectura moderna y escalable
- **Seguro**: Protección de datos personales sensibles
- **Extensible**: Fácil agregar nuevas funcionalidades

---

**Documento generado**: 2024  
**Versión del proyecto**: 0.1.0  
**Última actualización**: Basado en el estado actual del código

