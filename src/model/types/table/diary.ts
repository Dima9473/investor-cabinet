export type Operation = {
  id: string;
  instrument: string;
  type: 'buy' | 'sell';
  entryReason: string;
  entryPrice: number;
  quantity: number;
  exitPrice: number;
  exitReason: string;
  profit: number;
  emotions: string;
  comments: string;
}

export type Operations = Operation[] | null;
