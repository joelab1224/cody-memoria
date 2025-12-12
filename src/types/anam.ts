export interface AnamPersonaConfig {
  name: string;
  avatarId: string;
  voiceId: string;
  brainType: 'ANAM_GPT_4O_MINI_V1' | 'ANAM_LLAMA_v3_3_70B_V1' | 'CUSTOMER_CLIENT_V1';
  systemPrompt: string;
  maxSessionLengthSeconds: number;
}

export interface AnamSessionOptions {
  sessionReplay?: {
    enableSessionReplay: boolean;
  };
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