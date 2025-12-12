import { AnamPersonaConfig, AnamSessionOptions, AnamOneShotAvatarResponse } from '@/types/anam';

const ANAM_API_BASE = 'https://api.anam.ai/v1';

export class AnamClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createSessionToken(
    personaConfig: AnamPersonaConfig,
    sessionOptions?: AnamSessionOptions
  ): Promise<{ sessionToken: string }> {
    const response = await fetch(`${ANAM_API_BASE}/auth/session-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personaConfig,
        sessionOptions,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anam API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async createOneShotAvatar(
    imageFile: File | Blob,
    displayName: string
  ): Promise<AnamOneShotAvatarResponse> {
    const formData = new FormData();
    formData.append('displayName', displayName);
    formData.append('imageFile', imageFile);

    const response = await fetch(`${ANAM_API_BASE}/avatars`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anam API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async createOneShotAvatarFromUrl(
    imageUrl: string,
    displayName: string
  ): Promise<AnamOneShotAvatarResponse> {
    const formData = new FormData();
    formData.append('displayName', displayName);
    formData.append('imageUrl', imageUrl);

    const response = await fetch(`${ANAM_API_BASE}/avatars`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anam API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async listAvatars() {
    const response = await fetch(`${ANAM_API_BASE}/avatars`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Anam API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async listVoices() {
    const response = await fetch(`${ANAM_API_BASE}/voices`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Anam API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export const anamClient = new AnamClient(process.env.ANAM_API_KEY!);