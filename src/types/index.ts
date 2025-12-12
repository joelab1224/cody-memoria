export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  id: string;
  userId: string;
  emotionalPreferences: string[];
  objectives: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Memory {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  description?: string;
  personalityTraits: string[];
  favoriteMemories: string[];
  voiceCloneId?: string;
  avatarImageUrl?: string;
  systemPrompt: string;
  createdAt: Date;
  updatedAt: Date;
  conversations?: Conversation[];
  files?: MemoryFile[];
}

export interface Conversation {
  id: string;
  memoryId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  timestamp: Date;
}

export interface MemoryFile {
  id: string;
  memoryId: string;
  type: 'image' | 'audio';
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: Date;
}

export interface CreateMemoryData {
  name: string;
  relationship: string;
  description?: string;
  personalityTraits: string[];
  favoriteMemories: string[];
  imageFile?: File;
  audioFiles?: File[];
}

export interface EmotionalPreference {
  id: string;
  label: string;
  description: string;
}