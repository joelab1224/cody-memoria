# Gentle Memories Design System

A comprehensive design system for the Cody Memoria application, built on the **Gentle Memories** aesthetic with organic animations, glassmorphism, and warm, accessible color palettes.

## 🎨 Design Principles

- **Empathetic**: Design that acknowledges the emotional weight of memory preservation
- **Timeless**: Aesthetic that won't feel outdated as memories are accessed over years
- **Accessible**: Clear contrast, readable typography, intuitive interactions
- **Sophisticated**: Professional enough to handle sensitive family data
- **Warm**: Inviting rather than sterile, encouraging deeper engagement

## 📁 Architecture

```
src/
├── lib/
│   └── design-tokens.ts     # Core design tokens (colors, typography, spacing)
└── components/
    └── ui/
        ├── index.ts         # Main exports
        ├── Glass.tsx        # Base glassmorphism component
        ├── Button.tsx       # Button with multiple variants
        ├── Avatar.tsx       # Avatar with animations
        ├── Input.tsx        # Form inputs with glass styling
        └── Card.tsx         # Card layouts
```

## 🎯 Design Tokens

All components use centralized design tokens from `@/lib/design-tokens`:

### Colors
```typescript
colors: {
  cream: '#F7F5F3',
  sage: '#7A8A76',
  softGold: '#B8952F',
  peach: '#E6B8A2',
  text: {
    primary: '#3A4B39',    // High contrast
    secondary: '#5A6B59',  // Medium contrast
    light: '#7A8A76'       // Subtle text
  }
}
```

### Typography
- **Font**: Outfit (casual, modern, relaxed)
- **Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold)
- **Sizes**: xs (12px) → 4xl (36px)

### Animations
- **Breathe**: Gentle scaling effect for glass cards
- **Shimmer**: Light sweep across avatars
- **Gentle transitions**: 800ms with custom easing

## 🧩 Components

### Glass
Base glassmorphism component with breathing animations.

```tsx
import { Glass } from '@/components/ui';

<Glass animate="breathe" intensity="medium" animationDelay={1}>
  <p>Content with glassmorphism</p>
</Glass>
```

### Button
Multiple variants for different use cases.

```tsx
import { Button } from '@/components/ui';

// Primary action button
<Button variant="primary" size="lg">
  Create Memory
</Button>

// Voice control button
<Button variant="voicePrimary" size="voice">
  🎤
</Button>

// With icons
<Button leftIcon={<UserIcon />}>
  Profile
</Button>
```

### Avatar
Animated avatars with status indicators.

```tsx
import { Avatar } from '@/components/ui';

<Avatar 
  variant="profile" 
  size="profile"
  animation="shimmer"
  showStatus
  statusColor="online"
  src="/user-avatar.jpg"
  fallback="GM"
/>
```

### Input
Glass-styled form inputs.

```tsx
import { Input } from '@/components/ui';

<Input 
  variant="glass" 
  placeholder="Type your message..."
  leftIcon={<SearchIcon />}
/>
```

### Card
Flexible card component with multiple variants.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card variant="profile" animate="breathe" animationDelay={1}>
  <CardHeader>
    <CardTitle>Grandma Rose</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Beloved grandmother with endless wisdom</p>
  </CardContent>
</Card>
```

## 🎬 Animation System

### Breathing Effect
Subtle scaling animation that makes glass components feel alive:

```css
@keyframes breathe {
  0%, 100% { transform: scale(1); backdrop-filter: blur(20px); }
  50% { transform: scale(1.02); backdrop-filter: blur(25px); }
}
```

### Shimmer Effect
Light sweep animation for avatars:

```css
@keyframes shimmer {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}
```

## 🎨 Color Accessibility

All text color combinations meet WCAG 2.1 AA standards:
- **Primary text** (#3A4B39) on cream backgrounds: 7.2:1 contrast ratio
- **Secondary text** (#5A6B59) on light backgrounds: 4.8:1 contrast ratio
- **Interactive elements** maintain 3:1 minimum contrast

## 📱 Responsive Design

Components are mobile-first and include responsive variants:
- Touch-friendly button sizes (min 44px)
- Scalable spacing using rem units
- Flexible layouts with CSS Grid and Flexbox

## 🚀 Usage Examples

### Memory Card
```tsx
<Card variant="memory" animate="breathe">
  <Avatar variant="memory" size="lg" animation="shimmer" />
  <h3 className="text-[#3A4B39] font-medium">Grandma Rose</h3>
  <p className="text-[#7A8A76]">Beloved grandmother</p>
</Card>
```

### Voice Interface
```tsx
<Card variant="voice" animate="breatheSlow">
  <Avatar variant="voice" size="voice" animation="pulse" showStatus />
  <h2 className="text-[#3A4B39] font-medium">Speaking with Dad</h2>
  <div className="flex gap-4">
    <Button variant="voiceSecondary" size="voice">▶️</Button>
    <Button variant="voicePrimary" size="voice">🎤</Button>
    <Button variant="voiceSecondary" size="voice">⏸️</Button>
  </div>
</Card>
```

### Chat Input
```tsx
<div className="flex gap-4 items-center">
  <Input 
    variant="chat" 
    placeholder="Type your message..."
    className="flex-1"
  />
  <Button variant="primary" leftIcon={<MicIcon />}>
    Speak
  </Button>
  <Button variant="secondary" leftIcon={<SendIcon />}>
    Send
  </Button>
</div>
```

## 🛠️ Customization

### Extending Colors
Add new colors to the design tokens:

```typescript
// design-tokens.ts
colors: {
  // ... existing colors
  newColor: '#HEXCODE',
  newColorVariant: {
    light: '#HEXCODE',
    dark: '#HEXCODE'
  }
}
```

### Custom Variants
Extend component variants using `class-variance-authority`:

```typescript
const customButtonVariants = cva(baseStyles, {
  variants: {
    variant: {
      ...buttonVariants.config.variants.variant,
      custom: 'bg-custom text-white hover:bg-custom-dark'
    }
  }
});
```

## 🎯 Best Practices

1. **Always use design tokens** instead of hardcoded values
2. **Maintain animation delays** to create organic, staggered effects
3. **Use semantic component variants** (e.g., `variant="memory"` vs `variant="primary"`)
4. **Combine components** for complex layouts rather than creating monolithic components
5. **Test contrast ratios** when adding new color combinations
6. **Respect the breathing space** - let glassmorphism effects breathe with proper spacing

## 🔧 Development

### Adding New Components
1. Create component in `src/components/ui/ComponentName.tsx`
2. Use `cva` for variant management
3. Include design token references
4. Export from `src/components/ui/index.ts`
5. Add usage examples to this README

### Testing Components
```bash
npm run dev          # Start development server
npm run storybook    # Start component showcase (if configured)
npm run test         # Run component tests
```

---

**Built with 💝 for preserving precious family memories**