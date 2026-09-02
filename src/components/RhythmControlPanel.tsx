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
      <h2>\ud83c\udf9b\ufe0f Painel de Controle</h2>

      {/* Controles principais */}
      <div className="control-section">
        <div className="section-title">Iniciar / Parar</div>
        <div className="button-group">
          <button
            className={buttonClass('START_STOP')}
            onClick={() => handleClick('START_STOP')}
            title="P"
          >
            {state.isPlaying ? '\u23f9 STOP' : '\u25b6 START'}
          </button>
          <button
            className="btn"
            onClick={() => handleClick('SYNC_START')}
            title="O"
          >
            \ud83d\udd17 SYNC START
          </button>
        </div>
      </div>

      {/* Varia\u00e7\u00f5es */}
      <div className="control-section">
        <div className="section-title">Varia\u00e7\u00f5es Principais</div>
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
        <div className="section-title">Padr\u00f5es Especiais</div>
        <div className="button-group special">
          <button
            className="btn btn-intro"
            onClick={() => handleClick('INTRO')}
            title="U"
          >
            \ud83d\udce3 INTRO
          </button>
          <button
            className="btn btn-fill"
            onClick={() => handleClick('FILL')}
            title="M"
          >
            \u2728 FILL
          </button>
          <button
            className="btn btn-ending"
            onClick={() => handleClick('ENDING')}
            title="'"
          >
            \ud83c\udfc1 ENDING
          </button>
          <button
            className="btn btn-break"
            onClick={() => handleClick('BREAK')}
            title="N"
          >
            \u23f8 BREAK
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
            {state.acmpEnabled ? '\u2713 ACMP ON' : '\u2717 ACMP OFF'}
          </button>
        </div>
      </div>

      {/* Info de Teclado */}
      <div className="keyboard-info">
        <p>\ud83d\udca1 Dica: Use o teclado do PC para controlar</p>
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
