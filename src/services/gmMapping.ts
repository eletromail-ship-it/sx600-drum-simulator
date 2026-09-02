/**
 * Mapeamento General MIDI para instrumentos de bateria
 * Referência: https://en.wikipedia.org/wiki/General_MIDI
 */

import type { DrumInstrument } from '@/types';

export const GM_DRUM_MAP: Record<DrumInstrument, number> = {
  'kick': 36,           // Acoustic Bass Drum
  'snare': 38,          // Acoustic Snare
  'hihat-closed': 42,   // Closed Hi-Hat
  'hihat-open': 46,     // Open Hi-Hat
  'tom-hi': 50,         // High Tom
  'tom-mid': 47,        // Low-Mid Tom
  'tom-low': 45,        // Low Tom
  'crash': 49,          // Crash Cymbal 1
  'ride': 51,           // Ride Cymbal 1
  'cowbell': 56,        // Cowbell
  'clap': 39,           // Hand Clap
  'perc': 37,           // Side Stick
};

export function getDrumMIDINote(instrument: DrumInstrument): number {
  return GM_DRUM_MAP[instrument];
}

export function getAllDrumInstruments(): DrumInstrument[] {
  return Object.keys(GM_DRUM_MAP) as DrumInstrument[];
}
