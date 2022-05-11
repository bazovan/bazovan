export * from './connection';

export type SoroushFilter = () => void;
export type SoroushEventType = {
  type: 'text' | 'image' | 'voice';
};
