export interface AnamPersonaConfig {
  // Either personaId OR (avatarId with other config) is required
  personaId?: string;
  avatarId?: string;
  voiceId?: string;
  llmId?: string;
  systemPrompt?: string;
  maxSessionLengthSeconds?: number;
}

export interface AnamSessionOptions {
  sessionReplay?: {
    enableSessionReplay: boolean;
  };
  disableInputAudio?: boolean;
}

export interface AnamAvatar {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface AnamVoice {
  id: string;
  name: string;
  description?: string;
  language?: string;
  gender?: 'male' | 'female';
}

export interface AnamSessionToken {
  sessionToken: string;
  expiresAt?: string;
}

export interface AnamOneShotAvatarResponse {
  id: string;
  name?: string;
  status: 'processing' | 'ready' | 'failed';
  createdAt: string;
  imageUrl?: string;
}

export interface AnamClientOptions {
  disableInputAudio?: boolean;
}

export interface AnamAudioInputStreamConfig {
  encoding: 'pcm_s16le';
  sampleRate: number;
  channels: number;
}