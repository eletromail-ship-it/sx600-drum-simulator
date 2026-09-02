import React, { useEffect } from 'react';
import type { RhythmControl } from '@/types';

interface KeyboardListenerProps {
  onKeyPress: (control: RhythmControl) => void;
}

const KEYBOARD_MAP: Record<string, RhythmControl> = {
  'p': 'START_STOP',
  'o': 'SYNC_START',
  'i': 'SYNC_STOP',
  'u': 'INTRO',
  'j': 'MAIN_A',
  'k': 'MAIN_B',
  'l': 'MAIN_C',
  ';': 'MAIN_D',
  "'": 'ENDING',
  'm': 'FILL',
  'n': 'BREAK',
  ',': 'TEMPO_DOWN',
  '.': 'TEMPO_UP',
  '/': 'TAP_TEMPO',
};

const KeyboardListener: React.FC<KeyboardListenerProps> = ({ onKeyPress }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const control = KEYBOARD_MAP[key];

      if (control) {
        event.preventDefault();
        onKeyPress(control);
        
        // Efeito visual no botão (opcional)
        const button = document.querySelector(`[data-key="${key}"]`);
        if (button) {
          button.classList.add('key-pressed');
          setTimeout(() => button.classList.remove('key-pressed'), 100);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  return null;
};

export default KeyboardListener;
