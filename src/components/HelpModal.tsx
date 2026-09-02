import React, { useEffect, useRef } from 'react';
import './App.css';
import type { RhythmControl } from './types';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🎹 Mapa de Teclado</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-content">
          <div className="keyboard-shortcuts">
            <div className="shortcut-group">
              <h3>Controle Principal</h3>
              <div className="shortcut-list">
                <div className="shortcut-item">
                  <span className="key">P</span>
                  <span className="desc">START/STOP</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">O</span>
                  <span className="desc">SYNC START</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">I</span>
                  <span className="desc">SYNC STOP</span>
                </div>
              </div>
            </div>

            <div className="shortcut-group">
              <h3>Variações</h3>
              <div className="shortcut-list">
                <div className="shortcut-item">
                  <span className="key">J</span>
                  <span className="desc">Variação A</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">K</span>
                  <span className="desc">Variação B</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">L</span>
                  <span className="desc">Variação C</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">;</span>
                  <span className="desc">Variação D</span>
                </div>
              </div>
            </div>

            <div className="shortcut-group">
              <h3>Padrões Especiais</h3>
              <div className="shortcut-list">
                <div className="shortcut-item">
                  <span className="key">U</span>
                  <span className="desc">INTRO</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">M</span>
                  <span className="desc">FILL</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">'</span>
                  <span className="desc">ENDING</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">N</span>
                  <span className="desc">BREAK</span>
                </div>
              </div>
            </div>

            <div className="shortcut-group">
              <h3>Tempo</h3>
              <div className="shortcut-list">
                <div className="shortcut-item">
                  <span className="key">,</span>
                  <span className="desc">Tempo -</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">.</span>
                  <span className="desc">Tempo +</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">/</span>
                  <span className="desc">Tap Tempo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
