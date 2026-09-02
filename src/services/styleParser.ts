/**
 * Parser para arquivos .STY (Yamaha Style Format)
 * Por enquanto, usa um formato JSON simplificado
 * TODO: Implementar parsing do formato SFF nativo
 */

import type { StyleFile, DrumPattern, StylePattern } from '@/types';

export class StyleParser {
  /**
   * Parse um arquivo STY (por enquanto suporta JSON)
   * @param file ArrayBuffer do arquivo
   * @returns StyleFile parseado
   */
  static parse(file: ArrayBuffer): StyleFile {
    try {
      const text = new TextDecoder().decode(file);
      const json = JSON.parse(text);
      return this.validateStyleFile(json);
    } catch (error) {
      throw new Error(`Erro ao parsear arquivo STY: ${error}`);
    }
  }

  /**
   * Valida estrutura do StyleFile
   */
  private static validateStyleFile(data: unknown): StyleFile {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Arquivo inválido: não é um objeto JSON');
    }

    const file = data as Record<string, unknown>;

    if (typeof file.name !== 'string') {
      throw new Error('Campo "name" é obrigatório');
    }

    if (typeof file.bpm !== 'number' || file.bpm < 30 || file.bpm > 300) {
      throw new Error('BPM deve estar entre 30 e 300');
    }

    if (!Array.isArray(file.timeSignature) || file.timeSignature.length !== 2) {
      throw new Error('timeSignature deve ser um array [numerador, denominador]');
    }

    if (typeof file.genre !== 'string') {
      throw new Error('Campo "genre" é obrigatório');
    }

    if (typeof file.patterns !== 'object' || file.patterns === null) {
      throw new Error('Campo "patterns" é obrigatório');
    }

    return file as StyleFile;
  }

  /**
   * Cria um StyleFile de exemplo para teste
   */
  static createDemoStyle(): StyleFile {
    return {
      name: 'Demo Rhythm',
      bpm: 120,
      timeSignature: [4, 4],
      genre: 'Pop',
      patterns: {
        intro: [
          { beat: 0, instrument: 'kick', velocity: 100, duration: 100 },
          { beat: 2, instrument: 'snare', velocity: 80, duration: 100 },
        ],
        mainA: [
          { beat: 0, instrument: 'kick', velocity: 100, duration: 100 },
          { beat: 0.5, instrument: 'hihat-closed', velocity: 60, duration: 50 },
          { beat: 1, instrument: 'hihat-closed', velocity: 60, duration: 50 },
          { beat: 2, instrument: 'snare', velocity: 90, duration: 100 },
          { beat: 2.5, instrument: 'hihat-closed', velocity: 60, duration: 50 },
          { beat: 3, instrument: 'hihat-closed', velocity: 60, duration: 50 },
        ],
        mainB: [
          { beat: 0, instrument: 'kick', velocity: 100, duration: 100 },
          { beat: 0.5, instrument: 'hihat-closed', velocity: 70, duration: 50 },
          { beat: 1, instrument: 'kick', velocity: 80, duration: 100 },
          { beat: 1.5, instrument: 'hihat-closed', velocity: 70, duration: 50 },
          { beat: 2, instrument: 'snare', velocity: 90, duration: 100 },
          { beat: 3, instrument: 'hihat-closed', velocity: 70, duration: 50 },
        ],
        mainC: [
          { beat: 0, instrument: 'kick', velocity: 110, duration: 100 },
          { beat: 0.5, instrument: 'hihat-closed', velocity: 80, duration: 50 },
          { beat: 1, instrument: 'kick', velocity: 90, duration: 100 },
          { beat: 1.5, instrument: 'hihat-closed', velocity: 80, duration: 50 },
          { beat: 2, instrument: 'snare', velocity: 100, duration: 100 },
          { beat: 2.5, instrument: 'tom-hi', velocity: 70, duration: 80 },
          { beat: 3, instrument: 'hihat-closed', velocity: 80, duration: 50 },
        ],
        mainD: [
          { beat: 0, instrument: 'kick', velocity: 120, duration: 100 },
          { beat: 0.25, instrument: 'hihat-closed', velocity: 90, duration: 30 },
          { beat: 0.5, instrument: 'hihat-closed', velocity: 90, duration: 50 },
          { beat: 1, instrument: 'kick', velocity: 100, duration: 100 },
          { beat: 1.5, instrument: 'hihat-closed', velocity: 90, duration: 50 },
          { beat: 2, instrument: 'snare', velocity: 110, duration: 100 },
          { beat: 3, instrument: 'hihat-closed', velocity: 90, duration: 50 },
        ],
        fill: [
          { beat: 0, instrument: 'kick', velocity: 100, duration: 100 },
          { beat: 0.5, instrument: 'tom-hi', velocity: 80, duration: 80 },
          { beat: 1, instrument: 'tom-mid', velocity: 85, duration: 80 },
          { beat: 1.5, instrument: 'tom-low', velocity: 90, duration: 80 },
          { beat: 2, instrument: 'snare', velocity: 95, duration: 100 },
          { beat: 3, instrument: 'crash', velocity: 100, duration: 200 },
        ],
        ending: [
          { beat: 0, instrument: 'kick', velocity: 110, duration: 100 },
          { beat: 2, instrument: 'snare', velocity: 100, duration: 100 },
          { beat: 3, instrument: 'crash', velocity: 110, duration: 300 },
        ],
      },
    };
  }
}
