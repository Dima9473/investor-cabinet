import { z } from 'zod';
import { chatMessageSchema } from 'zodSchemas/chat/chatMessage';
import { chatRequestSchema } from 'zodSchemas/chat/chatRequest';
import { chatResponseSchema } from 'zodSchemas/chat/chatResponse';

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequestBody = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
