import { AnamPersonaConfig, AnamSessionOptions } from '@/types/anam';

const ANAM_API_BASE = 'https://api.anam.ai/v1';

export class AnamClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createSessionToken(
    clientLabel: string,
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
        clientLabel,
        personaConfig,
        sessionOptions,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anam API error: ${response.status} ${response.statusText}`);
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