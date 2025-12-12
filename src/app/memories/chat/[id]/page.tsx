'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';  
import { ConversationView } from '@/components/chat/ConversationView';

interface Memory {
  id: string;
  name: string;
  relationship: string;
  systemPrompt: string;
  anamAvatarId: string | null;
  voiceCloneId: string | null;
  avatarImageUrl: string | null;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [memory, setMemory] = React.useState<Memory | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchMemory = async () => {
      try {
        const response = await fetch(`/api/memories/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Memory not found');
        }

        const data = await response.json();
        setMemory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load memory');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchMemory();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !memory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-destructive mb-4">{error || 'Memory not found'}</p>
        <Button onClick={() => router.push('/memories')}>
          Back to Memories
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{memory.name}</h1>
            <p className="text-muted-foreground">{memory.relationship}</p>
          </div>
        </div>

        {/* Conversation */}
        <div className="h-[calc(100vh-160px)]">
          <ConversationView memory={memory} />
        </div>
      </div>
    </div>
  );
}
