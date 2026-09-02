/**
 * Controlador de ritmos - gerencia reprodução e variações
 */

import type { StyleFile, RhythmState, RhythmControl } from '@/types';
import { MIDIGenerator } from './midiGenerator';
import { AudioEngine } from './audioEngine';

export class RhythmController {
  private state: RhythmState = {
    isPlaying: false,
    currentVariation: 'mainA',
    bpm: 120,
    currentStyle: null,
    syncStartEnabled: false,
    acmpEnabled: true,
  };

  private audioEngine: AudioEngine;
  private currentPlaybackId: number | null = null;
  private tapTempoTimes: number[] = [];
  private observers: ((state: RhythmState) => void)[] = [];

  constructor() {
    this.audioEngine = new AudioEngine();
  }

  /**
   * Inicializa o controlador
   */
  async initialize(): Promise<void> {
    await this.audioEngine.initialize();
  }

  /**
   * Carrega um arquivo de estilo
   */
  loadStyle(style: StyleFile): void {
    this.state.currentStyle = style;
    this.state.bpm = style.bpm;
    this.notifyObservers();
  }

  /**
   * Processa um comando de controle
   */
  handleControl(control: RhythmControl): void {
    switch (control) {
      case 'START_STOP':
        this.togglePlayback();
        break;
      case 'SYNC_START':
        this.state.syncStartEnabled = !this.state.syncStartEnabled;
        break;
      case 'SYNC_STOP':
        this.stop();
        break;
      case 'INTRO':
        this.playIntro();
        break;
      case 'MAIN_A':
        this.setVariation('mainA');
        break;
      case 'MAIN_B':
        this.setVariation('mainB');
        break;
      case 'MAIN_C':
        this.setVariation('mainC');
        break;
      case 'MAIN_D':
        this.setVariation('mainD');
        break;
      case 'FILL':
        this.playFill();
        break;
      case 'ENDING':
        this.playEnding();
        break;
      case 'BREAK':
        this.break();
        break;
      case 'TEMPO_UP':
        this.increaseTempo();
        break;
      case 'TEMPO_DOWN':
        this.decreaseTempo();
        break;
      case 'TAP_TEMPO':
        this.tapTempo();
        break;
      case 'ACMP_TOGGLE':
        this.state.acmpEnabled = !this.state.acmpEnabled;
        break;
    }
    this.notifyObservers();
  }

  /**
   * Inicia/para reprodução
   */
  private togglePlayback(): void {
    if (this.state.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  /**
   * Inicia reprodução do ritmo atual
   */
  private play(): void {
    if (!this.state.currentStyle) return;

    this.state.isPlaying = true;
    this.playPattern(this.state.currentVariation);
  }

  /**
   * Para a reprodução
   */
  private stop(): void {
    this.state.isPlaying = false;
    this.audioEngine.stopAll();

    if (this.currentPlaybackId !== null) {
      clearTimeout(this.currentPlaybackId);
      this.currentPlaybackId = null;
    }
  }

  /**
   * Toca intro
   */
  private playIntro(): void {
    this.playPattern('intro');
  }

  /**
   * Toca fill
   */
  private playFill(): void {
    this.playPattern('fill');
  }

  /**
   * Toca ending
   */
  private playEnding(): void {
    this.playPattern('ending');
  }

  /**
   * Break (silêncio curto)
   */
  private break(): void {
    this.audioEngine.stopAll();
    // Silêncio por 2 beats
    const duration = MIDIGenerator.getMsPerBeat(this.state.bpm) * 2;
    setTimeout(() => {
      if (this.state.isPlaying) {
        this.playPattern(this.state.currentVariation);
      }
    }, duration);
  }

  /**
   * Define variação ativa
   */
  private setVariation(variation: RhythmState['currentVariation']): void {
    if (variation === 'intro' || variation === 'fill' || variation === 'ending') {
      return; // Essas são comandos, não variações
    }
    this.state.currentVariation = variation;
    if (this.state.isPlaying) {
      this.playPattern(variation);
    }
  }

  /**
   * Reproduz um padrão
   */
  private playPattern(patternName: string): void {
    if (!this.state.currentStyle) return;

    const patterns = this.state.currentStyle.patterns[patternName as keyof typeof this.state.currentStyle.patterns];
    if (!patterns || patterns.length === 0) return;

    const midiNotes = MIDIGenerator.patternsToMIDI(
      patterns,
      this.state.bpm,
      this.state.currentStyle.timeSignature
    );

    this.audioEngine.playSequence(midiNotes, 0);

    // Agenda próxima repetição
    const patternDuration = MIDIGenerator.getPatternDuration(
      patterns,
      this.state.bpm,
      this.state.currentStyle.timeSignature
    );

    if (this.currentPlaybackId !== null) {
      clearTimeout(this.currentPlaybackId);
    }

    this.currentPlaybackId = window.setTimeout(() => {
      if (this.state.isPlaying) {
        this.playPattern(patternName);
      }
    }, patternDuration);
  }

  /**
   * Aumenta o tempo
   */
  private increaseTempo(): void {
    const newBpm = Math.min(this.state.bpm + 2, 300);
    this.state.bpm = newBpm;
  }

  /**
   * Diminui o tempo
   */
  private decreaseTempo(): void {
    const newBpm = Math.max(this.state.bpm - 2, 30);
    this.state.bpm = newBpm;
  }

  /**
   * Tap Tempo - clique em tempo para definir BPM
   */
  private tapTempo(): void {
    const now = Date.now();
    this.tapTempoTimes.push(now);

    // Mantém apenas os últimos 4 tempos (4 batidas)
    if (this.tapTempoTimes.length > 4) {
      this.tapTempoTimes.shift();
    }

    // Se temos pelo menos 2 tempos, calcula o BPM
    if (this.tapTempoTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < this.tapTempoTimes.length; i++) {
        intervals.push(this.tapTempoTimes[i] - this.tapTempoTimes[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avgInterval);

      if (newBpm >= 30 && newBpm <= 300) {
        this.state.bpm = newBpm;
      }
    }
  }

  /**
   * Retorna estado atual
   */
  getState(): RhythmState {
    return { ...this.state };
  }

  /**
   * Observer pattern - notifica mudanças de estado
   */
  subscribe(observer: (state: RhythmState) => void): () => void {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter((o) => o !== observer);
    };
  }

  private notifyObservers(): void {
    this.observers.forEach((observer) => observer(this.getState()));
  }

  /**
   * Limpeza
   */
  dispose(): void {
    this.stop();
    this.audioEngine.dispose();
    this.observers = [];
  }
}
