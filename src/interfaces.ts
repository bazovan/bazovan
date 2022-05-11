export declare interface SoroushClientOptions {}

// Interface to predict any method we need
// eslint-disable-next-line no-unused-vars
export declare interface Client {
  on: (type: SoroushDataTypes, callback: ClientMethodCallback) => void;
  message: (message: string, callback: ClientMethodCallback) => void;
  launch: (options: SoroushClientOptions) => void;
}

export declare type ClientMethodCallback = (income: object) => void;
export declare type SoroushDataTypes = 'text' | 'picture' | 'sticker';
export declare interface SSEHeaders {
  accept: string;
  contentType: string;
}

export interface SoroushEventData {
  from: string;
  type: string;
  time: number;
}
