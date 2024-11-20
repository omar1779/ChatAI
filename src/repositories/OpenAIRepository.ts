// src/repositories/OpenAIRepository.ts
import { openAIClient } from '../../openai';

export class OpenAIRepository {
  async generateChatResponse(systemMessage: string, userMessage: string) {
    try {
      const chatCompletion = await openAIClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage },
        ],
      });

      return chatCompletion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response from OpenAI:', error);
      throw new Error('Error con la API de OpenAI');
    }
  }
}
