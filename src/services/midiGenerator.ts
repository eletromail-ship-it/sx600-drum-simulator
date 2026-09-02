/**
 * Gerador de MIDI Notes a partir de padrões de ritmo
 */

import type { DrumPattern, MIDINote } from '@/types';
import { getDrumMIDINote } from './gmMapping';

export class MIDIGenerator {
  /**
   * Converte padrões de bateria para MIDI Notes
   * @param patterns Array de padrões de bateria
   * @param bpm Tempo em batidas por minuto
   * @param timeSignature Assinatura de tempo [num, denom]
   * @returns Array de MIDI Notes
   */
  static patternsToMIDI(
    patterns: DrumPattern[],
    bpm: number,
    timeSignature: [number, number] = [4, 4]
  ): MIDINote[] {
    const msPerBeat = (60000 / bpm) * (4 / timeSignature[1]);

    return patterns.map((pattern) => ({
      note: getDrumMIDINote(pattern.instrument),
      velocity: pattern.velocity,
      duration: pattern.duration,
      timestamp: Math.round(pattern.beat * msPerBeat),
    }));
  }

  /**
   * Calcula millisegundos por beat
   */
  static getMsPerBeat(bpm: number, timeSignature: [number, number] = [4, 4]): number {
    return (60000 / bpm) * (4 / timeSignature[1]);
  }

  /**
   * Calcula duração total de um padrão em ms
   */
  static getPatternDuration(
    patterns: DrumPattern[],
    bpm: number,
    timeSignature: [number, number] = [4, 4]
  ): number {
    if (patterns.length === 0) return 0;

    const msPerBeat = this.getMsPerBeat(bpm, timeSignature);
    const maxBeat = Math.max(...patterns.map((p) => p.beat));

    return Math.round((maxBeat + 1) * msPerBeat);
  }
}
