import { Injectable } from '@nestjs/common';
import { ChromaClient } from 'chromadb';
import { OpenAI } from 'langchain/llms/openai';

@Injectable()
export class AppService {
  private readonly chroma: ChromaClient;
  private readonly llm: OpenAI;

  constructor() {
    this.chroma = new ChromaClient(
      { path: process.env.CHROMA_DB_PATH || './db/chroma' }
    );
    this.llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY || '' });
  }

  getStatus() {
    return {
      app: 'NestJS + LangChain + ChromaDB',
      chromaPath: process.env.CHROMA_DB_PATH || './db/chroma',
      openAIApiKeyLoaded: !!process.env.OPENAI_API_KEY,
    };
  }

  async query(prompt: string) {
    const response = await this.llm.call(prompt);
    return {
      prompt,
      response,
    };
  }
}
