# Design System - Cody Memoria

## 🎨 Paleta de Colores

### Colores Base

El sistema utiliza una paleta cálida y empática llamada **"Gentle Memories"**:

| Color | Hex | Uso |
|-------|-----|-----|
| **Cream** | `#F7F5F3` | Fondo principal, superficie primaria |
| **Warm Beige** | `#E8D5B7` | Superficie secundaria, acentos suaves |
| **Sage** | `#7A8A76` | Color primario, botones, bordes |
| **Sage Dark** | `#4A5D49` | Texto primario, elementos oscuros |
| **Sage Light** | `#A8B5A0` | Superficie terciaria, elementos sutiles |
| **Soft Gold** | `#B8952F` | Acentos, hover states, gradientes |
| **Peach** | `#E6B8A2` | Acentos cálidos, avatares |

### Colores Semánticos

#### Texto
- **Primary**: `#3A4B39` - Texto principal (alto contraste)
- **Secondary**: `#5A6B59` - Texto secundario (contraste medio)
- **Light**: `#7A8A76` - Texto sutil (bajo contraste)
- **Inverse**: `#F7F5F3` - Texto sobre fondos oscuros

#### Superficies
- **Primary**: `#F7F5F3` (Cream)
- **Secondary**: `#E8D5B7` (Warm Beige)
- **Tertiary**: `#A8B5A0` (Sage Light)

#### Glass Morphism
- **Background**: `rgba(247, 245, 243, 0.25)` - Fondo de vidrio base
- **Border**: `rgba(122, 138, 118, 0.3)` - Borde de vidrio
- **Hover**: `rgba(247, 245, 243, 0.35)` - Estado hover

#### Estados Interactivos
- **Primary**: `#7A8A76` (Sage)
- **Primary Hover**: `#B8952F` (Soft Gold)
- **Secondary**: `rgba(122, 138, 118, 0.1)`
- **Secondary Hover**: `rgba(122, 138, 118, 0.2)`

### Gradientes

Los gradientes se usan frecuentemente para crear profundidad:

- **Botón Primary**: `from-[#7A8A76] to-[#B8952F]` (Sage a Gold)
- **Avatar Memory**: `from-[#E6B8A2] to-[#B8952F]` (Peach a Gold)
- **Avatar Chat**: `from-[#7A8A76] to-[#E6B8A2]` (Sage a Peach)
- **Fondo**: `linear-gradient(135deg, #F7F5F3 0%, #E8D5B7 50%, #7A8A76 100%)`

---

## 🔤 Tipografía

### Fuentes

#### Fuente Principal: **Outfit**
- **Familia**: `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Características**: Casual, moderna, relajada
- **Uso**: Toda la interfaz principal

#### Fuentes del Sistema (Next.js)
- **Geist Sans**: `--font-geist-sans` (configurada pero no usada actualmente)
- **Geist Mono**: `--font-geist-mono` (para código)

### Tamaños de Fuente

| Tamaño | Valor | Uso |
|--------|-------|-----|
| **xs** | `0.75rem` (12px) | Texto muy pequeño, etiquetas |
| **sm** | `0.875rem` (14px) | Texto secundario, descripciones |
| **base** | `1rem` (16px) | Texto base, párrafos |
| **lg** | `1.125rem` (18px) | Texto destacado |
| **xl** | `1.25rem` (20px) | Subtítulos |
| **2xl** | `1.5rem` (24px) | Títulos de sección |
| **3xl** | `1.875rem` (30px) | Títulos principales |
| **4xl** | `2.25rem` (36px) | Títulos hero |

### Pesos de Fuente

- **Light**: `300` - Texto sutil, descripciones
- **Normal**: `400` - Texto base
- **Medium**: `500` - Títulos, elementos destacados
- **Semibold**: `600` - Títulos principales, énfasis

### Altura de Línea

- **Tight**: `1.25` - Títulos
- **Normal**: `1.5` - Texto base
- **Relaxed**: `1.6` - Texto cómodo de leer
- **Loose**: `2` - Texto espaciado

### Espaciado de Letras

- **Tight**: `-0.02em` - Títulos grandes
- **Normal**: `0em` - Texto base
- **Wide**: `0.01em` - Texto destacado
- **Wider**: `0.05em` - Títulos especiales

---

## 🧩 Componentes UI

### 1. Glass (Base Glassmorphism)

Componente base para efectos de vidrio esmerilado.

**Props:**
- `animate`: `'breathe' | 'none'` - Animación de respiración
- `animationDelay`: `number` - Retraso de animación en segundos
- `intensity`: `'light' | 'medium' | 'strong'` - Intensidad del efecto glass

**Características:**
- Backdrop blur de 20px (30px en hover)
- Borde sutil con color sage
- Sombra suave
- Transición suave de 800ms
- Animación de "respiración" opcional

**Uso:**
```tsx
<Glass animate="breathe" intensity="medium">
  Contenido con efecto glass
</Glass>
```

---

### 2. Button

Botón con múltiples variantes y estados.

**Variantes:**
- `primary` - Botón principal con gradiente sage a gold
- `secondary` - Botón secundario con fondo sage sutil
- `outline` - Botón con borde
- `ghost` - Botón sin fondo
- `voicePrimary` - Botón circular para voz (primary)
- `voiceSecondary` - Botón circular para voz (secondary)

**Tamaños:**
- `sm`, `default`, `lg`, `xl`
- `icon`, `iconSm`, `iconLg` - Para botones solo con iconos
- `voice`, `voiceLg` - Para botones de voz circulares

**Props adicionales:**
- `loading` - Muestra spinner de carga
- `leftIcon` - Icono a la izquierda
- `rightIcon` - Icono a la derecha
- `rounded` - Control de border-radius

**Características:**
- Efecto shimmer en hover (primary)
- Transformación suave en hover
- Sombras dinámicas
- Transiciones de 300ms con easing suave

**Uso:**
```tsx
<Button variant="primary" size="lg" loading={isLoading}>
  Crear Memoria
</Button>
```

---

### 3. Card

Tarjeta con variantes para diferentes contextos.

**Variantes:**
- `memory` - Para tarjetas de memoria
- `profile` - Para perfiles de persona
- `chat` - Para mensajes de chat
- `voice` - Para interfaz de voz
- `flow` - Para flujos de creación
- `simple` - Tarjeta simple (default)

**Animaciones:**
- `none` - Sin animación
- `breathe` - Animación de respiración (10s)
- `breatheSlow` - Respiración lenta (15s)

**Sub-componentes:**
- `CardHeader` - Encabezado de la tarjeta
- `CardTitle` - Título de la tarjeta
- `CardDescription` - Descripción de la tarjeta
- `CardContent` - Contenido principal
- `CardFooter` - Pie de la tarjeta

**Uso:**
```tsx
<Card variant="memory" animate="breathe">
  <CardHeader>
    <CardTitle>Mi Abuela</CardTitle>
    <CardDescription>Memoria creada el 2024</CardDescription>
  </CardHeader>
  <CardContent>
    Contenido de la memoria
  </CardContent>
</Card>
```

---

### 4. Input

Campo de entrada con variantes glass.

**Variantes:**
- `default` - Input estándar con fondo sutil
- `glass` - Input con efecto glass más pronunciado
- `chat` - Input redondeado para chat

**Tamaños:**
- `sm`, `default`, `lg`, `xl`

**Props adicionales:**
- `leftIcon` - Icono a la izquierda
- `rightIcon` - Icono a la derecha
- `error` - Estado de error
- `errorMessage` - Mensaje de error

**Características:**
- Backdrop blur en focus
- Sombra suave en focus
- Placeholder con color sage light
- Transiciones suaves

**Uso:**
```tsx
<Input 
  variant="glass" 
  placeholder="Nombre de la persona"
  leftIcon={<UserIcon />}
  error={hasError}
  errorMessage="Este campo es requerido"
/>
```

---

### 5. Avatar

Avatar circular con gradientes y animaciones.

**Variantes:**
- `memory` - Para tarjetas de memoria
- `chat` - Para mensajes de chat
- `voice` - Para interfaz de voz
- `profile` - Para perfiles

**Tamaños:**
- `sm` (40px), `default` (48px), `md` (64px), `lg` (80px), `xl` (128px)
- `profile` (120px), `voice` (160px)

**Animaciones:**
- `none` - Sin animación
- `shimmer` - Efecto de brillo deslizante
- `pulse` - Pulso suave
- `rotate` - Rotación (solo para voice)

**Props adicionales:**
- `src` - URL de la imagen
- `alt` - Texto alternativo
- `fallback` - Texto/emoji de respaldo
- `showStatus` - Mostrar indicador de estado
- `statusColor` - Color del estado (`'online' | 'offline' | 'speaking'`)

**Características:**
- Gradientes automáticos según variante
- Bordes sutiles
- Sombras suaves
- Animaciones opcionales

**Uso:**
```tsx
<Avatar 
  variant="memory" 
  size="lg" 
  src="/avatar.jpg"
  fallback="MA"
  showStatus
  statusColor="online"
  animation="shimmer"
/>
```

---

## 🎭 Animaciones

### Breathe (Respiración)
- **Duración**: 10s (normal) o 15s (lenta)
- **Efecto**: Escala sutil (1 → 1.02) y cambio de blur
- **Uso**: Tarjetas glass, elementos principales

### Shimmer (Brillo)
- **Duración**: 4s
- **Efecto**: Barrido de luz diagonal
- **Uso**: Avatares, botones primary

### Pulse (Pulso)
- **Duración**: 2s
- **Efecto**: Escala y opacidad suave
- **Uso**: Indicadores de estado, elementos activos

### Float (Flotación)
- **Duración**: 20s
- **Efecto**: Partículas flotantes en el fondo
- **Uso**: Elementos decorativos de fondo

---

## 📏 Espaciado

Sistema de espaciado basado en múltiplos de 4px:

| Token | Valor | Uso |
|-------|-------|-----|
| `0.5` | `0.125rem` (2px) | Espaciado mínimo |
| `1` | `0.25rem` (4px) | Espaciado pequeño |
| `2` | `0.5rem` (8px) | Espaciado base |
| `4` | `1rem` (16px) | Espaciado estándar |
| `6` | `1.5rem` (24px) | Espaciado medio |
| `8` | `2rem` (32px) | Espaciado grande |
| `12` | `3rem` (48px) | Espaciado extra grande |
| `16` | `4rem` (64px) | Espaciado hero |

---

## 🔲 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `sm` | `0.125rem` (2px) | Elementos pequeños |
| `base` | `0.25rem` (4px) | Elementos estándar |
| `md` | `0.375rem` (6px) | Botones |
| `lg` | `0.5rem` (8px) | Inputs |
| `xl` | `0.75rem` (12px) | Tarjetas pequeñas |
| `2xl` | `1rem` (16px) | Tarjetas medianas |
| `3xl` | `1.5rem` (24px) | Tarjetas grandes |
| `full` | `9999px` | Círculos completos |

---

## 🌑 Sombras

### Sombras Estándar
- `sm`, `base`, `md`, `lg`, `xl`, `2xl` - Escala estándar de Tailwind

### Sombras Específicas (Gentle Memories)
- `gentle`: `0 8px 32px rgba(122, 138, 118, 0.1)` - Sombra suave base
- `gentleHover`: `0 16px 64px rgba(122, 138, 118, 0.15)` - Sombra en hover
- `avatar`: `0 10px 30px rgba(122, 138, 118, 0.15)` - Sombra para avatares
- `glass`: `0 12px 40px rgba(0, 0, 0, 0.1)` - Sombra para elementos glass

---

## ⚡ Transiciones

### Duración
- `fast`: `150ms` - Cambios rápidos
- `base`: `300ms` - Transiciones estándar
- `slow`: `600ms` - Transiciones suaves
- `gentle`: `800ms` - Transiciones muy suaves

### Easing
- `linear`: Transición lineal
- `easeIn`: Aceleración inicial
- `easeOut`: Desaceleración final
- `easeInOut`: Aceleración y desaceleración
- `gentle`: `cubic-bezier(0.23, 1, 0.320, 1)` - Curva suave personalizada

---

## 🎯 Principios de Diseño

### 1. Empatía
El diseño reconoce el peso emocional de preservar memorias. Los colores cálidos y las animaciones suaves crean un ambiente acogedor.

### 2. Timeless (Atemporal)
La estética no se sentirá desactualizada cuando se acceda a las memorias en el futuro.

### 3. Accesibilidad
- Alto contraste en textos principales
- Tipografía legible
- Interacciones intuitivas
- Cumplimiento WCAG 2.1 AA

### 4. Sofisticación
Diseño profesional que maneja datos familiares sensibles con respeto.

### 5. Calidez
Interfaz acogedora que invita a una participación más profunda, en lugar de sentirse estéril.

---

## 📦 Uso de los Componentes

Todos los componentes están exportados desde `@/components/ui`:

```tsx
import { 
  Button, 
  Card, 
  Input, 
  Avatar, 
  Glass 
} from '@/components/ui';
```

Los design tokens están disponibles en `@/lib/design-tokens`:

```tsx
import { tokens } from '@/lib/design-tokens';

// Acceder a colores
const primaryColor = tokens.colors.sage;

// Acceder a tipografía
const fontFamily = tokens.typography.fonts.primary;
```

---

## 🎨 Ejemplo de Uso Completo

```tsx
import { Card, CardHeader, CardTitle, CardContent, Button, Avatar } from '@/components/ui';

export function MemoryCard({ memory }) {
  return (
    <Card variant="memory" animate="breathe">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar 
            variant="memory" 
            size="lg" 
            src={memory.avatarImageUrl}
            fallback={memory.name[0]}
            animation="shimmer"
          />
          <div>
            <CardTitle>{memory.name}</CardTitle>
            <p className="text-sm text-[#7A8A76]">{memory.relationship}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[#5A6B59] mb-4">{memory.description}</p>
        <Button variant="primary" size="default">
          Iniciar Conversación
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

**Última actualización**: Basado en el estado actual del código  
**Sistema de Diseño**: Gentle Memories  
**Versión**: 1.0.0

