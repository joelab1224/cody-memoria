'use client';

import * as React from 'react';
import { User, Volume2, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface MemoryReviewProps {
  avatarId: string | null;
  avatarImageUrl: string | null;
  voiceId: string | null;
  onSave: (data: {
    name: string;
    relationship: string;
    description: string;
    personalityTraits: string[];
    systemPrompt: string;
  }) => void;
  isSaving?: boolean;
  className?: string;
}

export function MemoryReview({
  avatarId,
  avatarImageUrl,
  voiceId,
  onSave,
  isSaving = false,
  className,
}: MemoryReviewProps) {
  const [name, setName] = React.useState('');
  const [relationship, setRelationship] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [personalityTraits, setPersonalityTraits] = React.useState('');
  const [systemPrompt, setSystemPrompt] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (!relationship.trim()) {
      setError('Please enter the relationship');
      return;
    }

    if (!avatarId) {
      setError('Please upload a photo and create an avatar first');
      return;
    }

    if (!voiceId) {
      setError('Please create a voice first');
      return;
    }

    setError(null);

    // Generate system prompt if empty
    const finalSystemPrompt = systemPrompt.trim() || generateDefaultPrompt();

    onSave({
      name: name.trim(),
      relationship: relationship.trim(),
      description: description.trim(),
      personalityTraits: personalityTraits
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      systemPrompt: finalSystemPrompt,
    });
  };

  const generateDefaultPrompt = () => {
    const traits = personalityTraits
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    
    return `You are ${name}, ${relationship} of the person you're speaking with. ${
      description ? `About you: ${description}. ` : ''
    }${
      traits.length > 0
        ? `Your personality traits include: ${traits.join(', ')}. `
        : ''
    }Speak naturally and warmly, as if reminiscing about shared memories and experiences. Be empathetic, loving, and authentic. Keep responses conversational and heartfelt.`;
  };

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Status Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className={cn(avatarId ? 'border-green-500' : 'border-destructive')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <User className="w-4 h-4" />
              Avatar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {avatarImageUrl ? (
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarImageUrl}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-1" />
                  <span className="text-sm">Ready</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not created</p>
            )}
          </CardContent>
        </Card>

        <Card className={cn(voiceId ? 'border-green-500' : 'border-destructive')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Voice
            </CardTitle>
          </CardHeader>
          <CardContent>
            {voiceId ? (
              <div className="flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-sm">Ready</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not created</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Memory Details Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Grandma Mary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship *</Label>
            <Input
              id="relationship"
              placeholder="e.g., grandmother, father, aunt"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Share some details about this person..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="traits">Personality Traits</Label>
          <Input
            id="traits"
            placeholder="e.g., warm, funny, wise, storyteller (comma-separated)"
            value={personalityTraits}
            onChange={(e) => setPersonalityTraits(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Separate multiple traits with commas
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt">
            Custom System Prompt{' '}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="prompt"
            placeholder="Leave empty to auto-generate based on the information above..."
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            This defines how the AI will behave during conversations
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={isSaving || !avatarId || !voiceId}
        className="w-full"
        size="lg"
      >
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating Memory...
          </>
        ) : (
          'Create Memory'
        )}
      </Button>
    </div>
  );
}
