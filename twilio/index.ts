// src/services/TwilioService.ts
export class TwilioService {
    generateTwilioResponse(message: string): string {
      return `
        <Response>
          <Message>${message}</Message>
        </Response>
      `;
    }
  }
  