import React, { useEffect, useRef } from 'react';
import './HelpModal.css';

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
          <h2>\ud83c\udfb9 Mapa de Teclado</h2>
          <button className="modal-close" onClick={onClose}>
            \u2715
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
              <h3>Varia\u00e7\u00f5es</h3>
              <div className="shortcut-list">
                <div className="shortcut-item">
                  <span className="key">J</span>
                  <span className="desc">Varia\u00e7\u00e3o A</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">K</span>
                  <span className="desc">Varia\u00e7\u00e3o B</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">L</span>
                  <span className="desc">Varia\u00e7\u00e3o C</span>
                </div>
                <div className="shortcut-item">
                  <span className="key">;</span>
                  <span className="desc">Varia\u00e7\u00e3o D</span>
                </div>
              </div>
            </div>

            <div className="shortcut-group">
              <h3>Padr\u00f5es Especiais</h3>
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
