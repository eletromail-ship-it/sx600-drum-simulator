import React from 'react';
import type { RhythmState, RhythmControl } from '@/types';
import './RhythmControlPanel.css';

interface ControlPanelProps {
  state: RhythmState;
  onControl: (control: RhythmControl) => void;
}

const RhythmControlPanel: React.FC<ControlPanelProps> = ({ state, onControl }) => {
  const handleClick = (control: RhythmControl) => {
    onControl(control);
  };

  const buttonClass = (control: RhythmControl) => {
    if (control === 'START_STOP') {
      return state.isPlaying ? 'btn btn-stop' : 'btn btn-start';
    }
    return 'btn';
  };

  const isVariationActive = (variation: string) => {
    return state.currentVariation.toLowerCase() === variation.toLowerCase();
  };

  return (
    <div className="control-panel">
      <h2>🎛️ Painel de Controle</h2>

      {/* Controles principais */}
      <div className="control-section">
        <div className="section-title">Iniciar / Parar</div>
        <div className="button-group">
          <button
            className={buttonClass('START_STOP')}
            onClick={() => handleClick('START_STOP')}
            title="P"
          >
            {state.isPlaying ? '⏹ STOP' : '▶ START'}
          </button>
          <button
            className="btn"
            onClick={() => handleClick('SYNC_START')}
            title="O"
          >
            🔗 SYNC START
          </button>
        </div>
      </div>

      {/* Variações */}
      <div className="control-section">
        <div className="section-title">Variações Principais</div>
        <div className="button-group variations">
          {['A', 'B', 'C', 'D'].map((variation) => (
            <button
              key={variation}
              className={`btn ${isVariationActive(`main${variation}`) ? 'active' : ''}`}
              onClick={() => handleClick(`MAIN_${variation}` as RhythmControl)}
              title={String.fromCharCode(74 + ['A', 'B', 'C', 'D'].indexOf(variation))}
            >
              {variation}
            </button>
          ))}
        </div>
      </div>

      {/* Intro, Fill, Ending */}
      <div className="control-section">
        <div className="section-title">Padrões Especiais</div>
        <div className="button-group special">
          <button
            className="btn btn-intro"
            onClick={() => handleClick('INTRO')}
            title="U"
          >
            📣 INTRO
          </button>
          <button
            className="btn btn-fill"
            onClick={() => handleClick('FILL')}
            title="M"
          >
            ✨ FILL
          </button>
          <button
            className="btn btn-ending"
            onClick={() => handleClick('ENDING')}
            title="'"
          >
            🏁 ENDING
          </button>
          <button
            className="btn btn-break"
            onClick={() => handleClick('BREAK')}
            title="N"
          >
            ⏸ BREAK
          </button>
        </div>
      </div>

      {/* Acompanhamento */}
      <div className="control-section">
        <div className="section-title">Acompanhamento</div>
        <div className="button-group">
          <button
            className={`btn ${state.acmpEnabled ? 'active' : ''}`}
            onClick={() => handleClick('ACMP_TOGGLE')}
          >
            {state.acmpEnabled ? '✓ ACMP ON' : '✗ ACMP OFF'}
          </button>
        </div>
      </div>

      {/* Info de Teclado */}
      <div className="keyboard-info">
        <p>💡 Dica: Use o teclado do PC para controlar</p>
        <div className="key-list">
          <span>P = START/STOP</span>
          <span>J/K/L/; = Var A/B/C/D</span>
          <span>, / . = Tempo -/+</span>
        </div>
      </div>
    </div>
  );
};

export default RhythmControlPanel;
