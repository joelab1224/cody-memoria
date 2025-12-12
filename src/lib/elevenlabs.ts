const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

export class ElevenLabsClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async cloneVoice(
    name: string,
    audioFile: File,
    description?: string
  ): Promise<{ voice_id: string }> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('files', audioFile);
    if (description) formData.append('description', description);

    const response = await fetch(`${ELEVENLABS_API_BASE}/voices/add`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async generateSpeech(
    text: string,
    voiceId: string,
    modelId = 'eleven_multilingual_v2'
  ): Promise<ArrayBuffer> {
    const response = await fetch(`${ELEVENLABS_API_BASE}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }

    return response.arrayBuffer();
  }

  async getVoices() {
    const response = await fetch(`${ELEVENLABS_API_BASE}/voices`, {
      headers: {
        'xi-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async deleteVoice(voiceId: string): Promise<void> {
    const response = await fetch(`${ELEVENLABS_API_BASE}/voices/${voiceId}`, {
      method: 'DELETE',
      headers: {
        'xi-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }
  }
}

export const elevenLabsClient = new ElevenLabsClient(process.env.ELEVENLABS_API_KEY!);