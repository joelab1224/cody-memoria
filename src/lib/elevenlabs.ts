const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

export interface VoiceDesignParams {
  name: string;
  voiceDescription: string;
  text?: string;
  autoGenerateText?: boolean;
}

export interface VoicePreview {
  audio_base_64: string;
  generated_voice_id: string;
  media_type: string;
  duration_secs: number;
}

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export class ElevenLabsClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async cloneVoice(
    name: string,
    audioFiles: File[],
    description?: string
  ): Promise<{ voice_id: string }> {
    const formData = new FormData();
    formData.append('name', name);
    audioFiles.forEach((file) => {
      formData.append('files', file);
    });
    if (description) formData.append('description', description);

    const response = await fetch(`${ELEVENLABS_API_BASE}/voices/add`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async designVoice(params: VoiceDesignParams): Promise<{ voice_id: string }> {
    // First, generate voice previews
    const previewResponse = await fetch(`${ELEVENLABS_API_BASE}/text-to-voice/create-previews`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voice_description: params.voiceDescription,
        text: params.text,
        auto_generate_text: params.autoGenerateText ?? !params.text,
      }),
    });

    if (!previewResponse.ok) {
      const errorText = await previewResponse.text();
      throw new Error(`ElevenLabs Voice Design API error: ${previewResponse.status} - ${errorText}`);
    }

    const previewData = await previewResponse.json();
    
    if (!previewData.previews || previewData.previews.length === 0) {
      throw new Error('No voice previews generated');
    }

    // Use the first preview
    const generatedVoiceId = previewData.previews[0].generated_voice_id;

    // Now create the voice from the preview
    const createResponse = await fetch(`${ELEVENLABS_API_BASE}/text-to-voice/create-voice-from-preview`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voice_name: params.name,
        voice_description: params.voiceDescription,
        generated_voice_id: generatedVoiceId,
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`ElevenLabs Create Voice API error: ${createResponse.status} - ${errorText}`);
    }

    return createResponse.json();
  }

  async createVoicePreviews(voiceDescription: string, text?: string): Promise<{ previews: VoicePreview[]; text: string }> {
    const response = await fetch(`${ELEVENLABS_API_BASE}/text-to-voice/create-previews`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voice_description: voiceDescription,
        text: text,
        auto_generate_text: !text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs Voice Preview API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async createVoiceFromPreview(
    voiceName: string,
    voiceDescription: string,
    generatedVoiceId: string
  ): Promise<{ voice_id: string }> {
    const response = await fetch(`${ELEVENLABS_API_BASE}/text-to-voice/create-voice-from-preview`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voice_name: voiceName,
        voice_description: voiceDescription,
        generated_voice_id: generatedVoiceId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs Create Voice API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async generateSpeech(
    text: string,
    voiceId: string,
    modelId = 'eleven_multilingual_v2',
    voiceSettings?: VoiceSettings
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
        voice_settings: voiceSettings || {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.arrayBuffer();
  }

  async previewVoice(voiceId: string, text: string): Promise<ArrayBuffer> {
    return this.generateSpeech(text, voiceId);
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

  async getVoice(voiceId: string) {
    const response = await fetch(`${ELEVENLABS_API_BASE}/voices/${voiceId}`, {
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

  async createConversationalAgent(config: {
    name: string;
    voiceId: string;
    systemPrompt: string;
    firstMessage?: string;
  }): Promise<{ agent_id: string }> {
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/agents/create`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: config.name,
        conversation_config: {
          agent: {
            prompt: {
              prompt: config.systemPrompt,
            },
            first_message: config.firstMessage,
          },
          tts: {
            voice_id: config.voiceId,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs Conversational AI API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  getConversationalWebSocketUrl(agentId: string): string {
    return `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;
  }
}

export const elevenLabsClient = new ElevenLabsClient(process.env.ELEVENLABS_API_KEY!);