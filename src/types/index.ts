/**
 * Tipos para o Simulador SX600
 */

export interface MIDINote {
  note: number;      // 0-127
  velocity: number;  // 0-127
  duration: number;  // milliseconds
  timestamp: number; // milliseconds from start
}

export interface DrumPattern {
  beat: number;                    // 0-3 (para 4/4)
  instrument: DrumInstrument;
  velocity: number;               // 0-127
  duration: number;               // milliseconds
}

export type DrumInstrument =
  | 'kick'
  | 'snare'
  | 'hihat-closed'
  | 'hihat-open'
  | 'tom-hi'
  | 'tom-mid'
  | 'tom-low'
  | 'crash'
  | 'ride'
  | 'cowbell'
  | 'clap'
  | 'perc';

export interface StylePattern {
  intro: DrumPattern[];
  mainA: DrumPattern[];
  mainB: DrumPattern[];
  mainC: DrumPattern[];
  mainD: DrumPattern[];
  fill: DrumPattern[];
  ending: DrumPattern[];
}

export interface StyleFile {
  name: string;
  bpm: number;
  timeSignature: [number, number];
  genre: string;
  patterns: StylePattern;
}

export interface RhythmState {
  isPlaying: boolean;
  currentVariation: 'A' | 'B' | 'C' | 'D' | 'intro' | 'fill' | 'ending';
  bpm: number;
  currentStyle: StyleFile | null;
  syncStartEnabled: boolean;
  acmpEnabled: boolean;
}

export interface ControlEvent {
  control: RhythmControl;
  timestamp: number;
}

export type RhythmControl =
  | 'START_STOP'
  | 'SYNC_START'
  | 'SYNC_STOP'
  | 'INTRO'
  | 'MAIN_A'
  | 'MAIN_B'
  | 'MAIN_C'
  | 'MAIN_D'
  | 'FILL'
  | 'ENDING'
  | 'BREAK'
  | 'TEMPO_UP'
  | 'TEMPO_DOWN'
  | 'TAP_TEMPO'
  | 'ACMP_TOGGLE';
