/**
 * Motor de áudio usando Web Audio API
 * Gera sons de bateria usando Tone.js
 */

import * as Tone from 'tone';
import type { MIDINote } from '@/types';

export class AudioEngine {
  private synths: Map<number, Tone.PolySynth> = new Map();
  private isInitialized = false;
  private masterVolume: Tone.Volume;

  constructor() {
    this.masterVolume = new Tone.Volume(-12).toDestination();
  }

  /**
   * Inicializa o contexto de áudio
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    await Tone.start();
    this.isInitialized = true;
    console.log('AudioEngine inicializado');
  }

  /**
   * Toca uma nota MIDI
   */
  playNote(midiNote: MIDINote, time?: number): void {
    if (!this.isInitialized) {
      console.warn('AudioEngine não inicializado');
      return;
    }

    // Obtém ou cria synth para este note
    if (!this.synths.has(midiNote.note)) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'square' },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.1,
          release: 0.1,
        },
      }).connect(this.masterVolume);

      this.synths.set(midiNote.note, synth);
    }

    const synth = this.synths.get(midiNote.note)!;
    const frequency = Tone.Midi(midiNote.note).toFrequency();
    const duration = (midiNote.duration / 1000).toFixed(2);
    const velocity = midiNote.velocity / 127;

    const scheduleTime = time ? Tone.now() + time / 1000 : Tone.now();
    synth.triggerAttackRelease(frequency, duration, scheduleTime, velocity);
  }

  /**
   * Toca uma sequência de notas MIDI
   */
  playSequence(notes: MIDINote[], startTime: number = 0): void {
    if (!this.isInitialized) {
      console.warn('AudioEngine não inicializado');
      return;
    }

    const now = Tone.now();
    notes.forEach((note) => {
      const scheduleTime = (startTime + note.timestamp) / 1000;
      this.playNote(note, scheduleTime * 1000);
    });
  }

  /**
   * Configura o volume mestre
   */
  setVolume(db: number): void {
    this.masterVolume.volume.value = db;
  }

  /**
   * Para todos os sons
   */
  stopAll(): void {
    this.synths.forEach((synth) => {
      synth.triggerRelease();
    });
  }

  /**
   * Libera recursos de áudio
   */
  dispose(): void {
    this.synths.forEach((synth) => synth.dispose());
    this.synths.clear();
    this.masterVolume.dispose();
  }
}
