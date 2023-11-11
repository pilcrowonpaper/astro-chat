const listeners = new Map<string, (message: Message) => any>();

export function sendMessage(username: string, body: string): void {
  const message: Message = {
    username,
    body,
    date: new Date(),
  };
  for (const listener of listeners.values()) {
    listener(message);
  }
}

export function addMessageListener(callback: (message: Message) => any): () => void {
  const id = crypto.randomUUID();
  listeners.set(id, callback);
  return () => {
    listeners.delete(id);
  };
}

export interface Message {
  username: string;
  body: string;
  date: Date;
}
