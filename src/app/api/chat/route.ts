// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GenerateChatResponse } from '../../../useCases/ChatResponse';
import { OpenAIRepository } from '../../../repositories/OpenAIRepository';
import { TwilioService } from '../../../../twilio';

export async function POST(request: NextRequest) {
    const body = await request.formData();
    const from = body.get('From')?.toString() || ''; 
    const userMessage = body.get('Body')?.toString() || 'No message received'; 
  
    console.log(`Mensaje recibido de ${from}: ${userMessage}`);
  
    const openAIRepository = new OpenAIRepository();
    const generateChatResponse = new GenerateChatResponse(openAIRepository);
    const twilioService = new TwilioService();
  
    try {
      const chatResponse = await generateChatResponse.execute(userMessage);
      const twilioResponse = twilioService.generateTwilioResponse(chatResponse);
  
      return new NextResponse(twilioResponse, {
        headers: { 'Content-Type': 'text/xml' },
      });
    } catch (error) {
      console.error('Error handling the request:', error);
      return new NextResponse('Error interno del servidor', { status: 500 });
    }
  }