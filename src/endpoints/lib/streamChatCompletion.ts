import { chatRequestSchema } from 'zodSchemas/chat/chatRequest';

import { CLUSTERS } from './constants/clasters';

import { ChatRequestBody } from 'endpoints/model/types/chat/chat';

export type StreamChatEvent =
  | { type: 'portfolioContextUsed'; value: boolean }
  | { type: 'delta'; value: string }
  | { type: 'done' }
  | { type: 'error'; value: string };

/**
 * Потоковый чат через middleware (SSE).
 * GigaChat вызывается только на сервере.
 */
export const streamChatCompletion = async (
  body: ChatRequestBody,
  onEvent: (event: StreamChatEvent) => void,
): Promise<string> => {
  const payload = chatRequestSchema.parse(body);

  const response = await fetch(`${CLUSTERS.BANKS}/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `HTTP ${response.status}`);
  }

  if (!response.body) {
    throw new Error('Пустой ответ сервера');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  const processLine = (line: string) => {
    if (!line.startsWith('data: ')) {
      return;
    }

    let data: Record<string, unknown>;

    try {
      data = JSON.parse(line.slice(6)) as Record<string, unknown>;
    } catch {
      return;
    }

    if (typeof data.error === 'string') {
      onEvent({ type: 'error', value: data.error });
      throw new Error(data.error);
    }

    if (data.portfolioContextUsed === true) {
      onEvent({ type: 'portfolioContextUsed', value: true });
    }

    if (typeof data.delta === 'string') {
      fullText += data.delta;
      onEvent({ type: 'delta', value: data.delta });
    }

    if (data.done === true) {
      onEvent({ type: 'done' });
    }
  };

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      processLine(line);
    }
  }

  if (buffer.startsWith('data: ')) {
    processLine(buffer);
  }

  return fullText;
};
