import { Injectable } from '@nestjs/common';
import { ChromaClient, CloudClient } from 'chromadb';
import { Anthropic } from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService {
  private readonly chroma: CloudClient;
  private readonly anthropic: Anthropic;

  constructor() {
    this.chroma = new CloudClient({
      apiKey: process.env.CHROMA_API_KEY || '',
      tenant: process.env.CHROMA_TENANT || '',
      database: process.env.CHROMA_DATABASE || 'search_file',
    });
    this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });
  }

  getStatus() {
    return {
      app: 'NestJS + Anthropic + ChromaDB',
      anthropicApiKeyLoaded: !!process.env.ANTHROPIC_API_KEY,
    };
  }

  async query(prompt: string) {
    try {
      const response = await this.anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [
          { role: 'user', content: prompt }
        ]
      });
      return {
        prompt,
        response: response?.content || response,
      };
    } catch (err) {
      return { error: String(err) };
    }
  }
}
